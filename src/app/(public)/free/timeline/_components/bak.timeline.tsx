"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Lock,
  LockOpen,
  MailOpen,
  Pencil,
  Trash2,
  X,
  Move,
} from "lucide-react";

interface Event {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  date: string;
  color?: string;
}

interface TimeSlot {
  hour: number;
  display: string;
  military: string;
}

interface WeekDay {
  date: Date;
  dayName: string;
  dayNumber: number;
  isToday: boolean;
  isWeekend: boolean;
}

interface DragState {
  isDragging: boolean;
  draggedEvent: Event | null;
  dragOffset: { x: number; y: number };
  initialPosition: { x: number; y: number };
}

interface ModalPosition {
  x: number;
  y: number;
}

const TIME_REFRESH = 60 * 1000; // Update every 1 minute
const HOUR_HEIGHT = 120;

const TimelineScreen = () => {
  const scrollViewRef = useRef<any>(null);
  const timeScrollRef = useRef<any>(null);
  const dragPreviewRef = useRef<HTMLDivElement>(null);
  
  const [currentTime, setCurrentTime] = useState(new Date());
  const [viewDate, setViewDate] = useState(new Date());
  const [autoScroll, setAutoScroll] = useState(true);
  const [isInitialScroll, setIsInitialScroll] = useState(true);
  const [isModalBookingVisible, setIsModalBookingVisible] = useState(false);
  const [isModalTLDetailVisible, setIsModalTLDetailVisible] = useState(false);
  
  // Drag & Drop state
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    draggedEvent: null,
    dragOffset: { x: 0, y: 0 },
    initialPosition: { x: 0, y: 0 }
  });
  
  // Modal positions
  const [bookingModalPos, setBookingModalPos] = useState<ModalPosition>({ x: 0, y: 0 });
  const [detailModalPos, setDetailModalPos] = useState<ModalPosition>({ x: 0, y: 0 });
  const [isDraggingModal, setIsDraggingModal] = useState<string | null>(null);

  // Calculate day width based on screen
  const dayWidth = "calc((100vw - 100px) / 7)";

  // Generate time slots (6 AM to 11 PM)
  const timeSlots: any[] = [];
  for (let hour = 6; hour <= 23; hour++) {
    timeSlots.push({
      hour,
      display:
        hour === 12 ? "12 pm" : hour > 12 ? `${hour - 12} pm` : `${hour} am`,
      military: `${hour.toString().padStart(2, "0")}:00`,
    });
  }

  // Generate week days
  const getWeekDays = (date: any) => {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day;
    startOfWeek.setDate(diff);

    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(startOfWeek);
      currentDay.setDate(startOfWeek.getDate() + i);

      const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const isToday = currentDay.toDateString() === new Date().toDateString();

      weekDays.push({
        date: currentDay,
        dayName: dayNames[currentDay.getDay()],
        dayNumber: currentDay.getDate(),
        isToday,
        isWeekend: currentDay.getDay() === 0 || currentDay.getDay() === 6,
      });
    }
    return weekDays;
  };

  const weekDays = getWeekDays(viewDate);

  // Sample events data
  const [events, setEvents] = useState([
    {
      id: "0",
      title: "Team Meeting ::1",
      startTime: "12:19",
      endTime: "13:20",
      date: new Date().toDateString(),
      color: "bg-sky-500/80",
    },
    {
      id: "1",
      title: "Team Meeting",
      startTime: "13:19",
      endTime: "14:30",
      date: new Date().toDateString(),
      color: "bg-blue-500/80",
    },
    {
      id: "2",
      title: "Project Review",
      startTime: "15:00",
      endTime: "16:30",
      date: new Date().toDateString(),
      color: "bg-green-500/80",
    },
  ]);

  const arrayDuration = [
    { label: "30mins", val: "30" },
    { label: "1hour", val: "60" },
    { label: "2hour", val: "120" },
    { label: "30mins", val: "30" },
    { label: "1hour", val: "60" },
    { label: "2hour", val: "120" },
  ];

  // Drag & Drop handlers
  const handleEventMouseDown = (e: React.MouseEvent, event: Event) => {
    e.preventDefault();
    e.stopPropagation();
    
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const scrollContainer = scrollViewRef.current;
    const scrollTop = scrollContainer ? scrollContainer.scrollTop : 0;
    
    setDragState({
      isDragging: true,
      draggedEvent: event,
      dragOffset: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      },
      initialPosition: {
        x: e.clientX,
        y: e.clientY + scrollTop
      }
    });
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!dragState.isDragging || !dragState.draggedEvent) return;

    if (dragPreviewRef.current) {
      dragPreviewRef.current.style.left = `${e.clientX - dragState.dragOffset.x}px`;
      dragPreviewRef.current.style.top = `${e.clientY - dragState.dragOffset.y}px`;
    }
  }, [dragState]);

  const handleMouseUp = useCallback((e: MouseEvent) => {
    if (!dragState.isDragging || !dragState.draggedEvent) return;

    // Calculate drop position
    const scrollContainer = scrollViewRef.current;
    if (!scrollContainer) return;

    const containerRect = scrollContainer.getBoundingClientRect();
    const scrollTop = scrollContainer.scrollTop;
    
    // Calculate which day column
    const dayWidth = (containerRect.width - 0) / 7;
    const relativeX = e.clientX - containerRect.left;
    const dayIndex = Math.floor(relativeX / dayWidth);
    
    // Calculate which time slot
    const relativeY = e.clientY - containerRect.top + scrollTop;
    const hourIndex = Math.floor(relativeY / HOUR_HEIGHT);
    const newHour = 6 + hourIndex;
    const minuteOffset = Math.floor(((relativeY % HOUR_HEIGHT) / HOUR_HEIGHT) * 60);
    
    if (dayIndex >= 0 && dayIndex < weekDays.length && newHour >= 6 && newHour <= 23) {
      const newDate = weekDays[dayIndex].date.toDateString();
      const newStartTime = `${newHour.toString().padStart(2, '0')}:${minuteOffset.toString().padStart(2, '0')}`;
      
      // Calculate duration
      const [oldStartHour, oldStartMinute] = dragState.draggedEvent.startTime.split(':').map(Number);
      const [oldEndHour, oldEndMinute] = dragState.draggedEvent.endTime.split(':').map(Number);
      const durationMinutes = (oldEndHour * 60 + oldEndMinute) - (oldStartHour * 60 + oldStartMinute);
      
      const newEndTotalMinutes = (newHour * 60 + minuteOffset) + durationMinutes;
      const newEndHour = Math.floor(newEndTotalMinutes / 60);
      const newEndMinute = newEndTotalMinutes % 60;
      const newEndTime = `${newEndHour.toString().padStart(2, '0')}:${newEndMinute.toString().padStart(2, '0')}`;

      // Update event
      setEvents(prevEvents => 
        prevEvents.map(event => 
          event.id === dragState.draggedEvent!.id 
            ? { ...event, date: newDate, startTime: newStartTime, endTime: newEndTime }
            : event
        )
      );
    }

    setDragState({
      isDragging: false,
      draggedEvent: null,
      dragOffset: { x: 0, y: 0 },
      initialPosition: { x: 0, y: 0 }
    });
  }, [dragState, weekDays]);

  // Modal drag handlers
  const handleModalMouseDown = (e: React.MouseEvent, modalType: string) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingModal(modalType);
    
    const handleModalMouseMove = (e: MouseEvent) => {
      if (modalType === 'booking') {
        setBookingModalPos({ x: e.clientX - 200, y: e.clientY - 50 });
      } else if (modalType === 'detail') {
        setDetailModalPos({ x: e.clientX - 200, y: e.clientY - 50 });
      }
    };
    
    const handleModalMouseUp = () => {
      setIsDraggingModal(null);
      document.removeEventListener('mousemove', handleModalMouseMove);
      document.removeEventListener('mouseup', handleModalMouseUp);
    };
    
    document.addEventListener('mousemove', handleModalMouseMove);
    document.addEventListener('mouseup', handleModalMouseUp);
  };

  // Mouse event listeners
  useEffect(() => {
    if (dragState.isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragState.isDragging, handleMouseMove, handleMouseUp]);

  // Auto scroll to current time
  const scrollToCurrentTime = useCallback(
    (force = false) => {
      if (!autoScroll && !isInitialScroll && !force) return;

      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();

      let scrollPosition = 0;

      if (currentHour >= 6) {
        const hoursSince6AM = currentHour - 6;
        scrollPosition =
          hoursSince6AM * HOUR_HEIGHT + (currentMinute * HOUR_HEIGHT) / 60;
      }

      const contextHeight = HOUR_HEIGHT;
      scrollPosition = Math.max(0, scrollPosition - contextHeight);

      if (timeScrollRef.current) {
        timeScrollRef.current.scrollTo({
          top: scrollPosition,
          behavior: isInitialScroll ? "auto" : "smooth",
        });
      }

      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          top: scrollPosition,
          behavior: isInitialScroll ? "auto" : "smooth",
        });
      }

      if (isInitialScroll) {
        setIsInitialScroll(false);
      }
    },
    [autoScroll, isInitialScroll]
  );

  // Update current time and scroll
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      scrollToCurrentTime();
    }, TIME_REFRESH);

    return () => clearInterval(timer);
  }, [scrollToCurrentTime]);

  // Initial scroll when component mounts
  useEffect(() => {
    const initialScrollTimer = setTimeout(() => {
      scrollToCurrentTime(true);
    }, 1000);

    return () => clearTimeout(initialScrollTimer);
  }, [scrollToCurrentTime]);

  // Get current time position for red line indicator
  const getCurrentTimePosition = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    if (currentHour < 6 || currentHour > 23) return 0;

    const hoursSince6AM = currentHour - 6;
    return hoursSince6AM * HOUR_HEIGHT + (currentMinute * HOUR_HEIGHT) / 60;
  };

  // Render event blocks
  const renderEvents = (dayDate: any) => {
    const dayEvents = events.filter(
      (event) => event.date === dayDate.toDateString()
    );

    return dayEvents.map((event) => {
      // Don't render the event being dragged in its original position
      if (dragState.isDragging && dragState.draggedEvent?.id === event.id) {
        return null;
      }

      const [startHour, startMinute] = event.startTime.split(":").map(Number);
      const [endHour, endMinute] = event.endTime.split(":").map(Number);

      if (startHour < 6 || startHour > 23) return null;

      const startHoursSince6AM = startHour - 6;
      const endHoursSince6AM = endHour - 6;

      const top =
        startHoursSince6AM * HOUR_HEIGHT + (startMinute * HOUR_HEIGHT) / 60;
      const bottom =
        endHoursSince6AM * HOUR_HEIGHT + (endMinute * HOUR_HEIGHT) / 60;
      const height = bottom - top;

      return (
        <div
          key={event.id}
          className={`absolute ${
            event.color || "bg-sky-500"
          } mx-1 rounded-md p-2 opacity-90 cursor-move hover:opacity-100 transition-opacity select-none`}
          style={{
            top: top,
            height: Math.max(height, 30),
            left: 4,
            right: 4,
          }}
          onMouseDown={(e) => handleEventMouseDown(e, event)}
          onClick={(e) => {
            if (!dragState.isDragging) {
              e.stopPropagation();
              console.log("Event clicked:", event.title);
              setIsModalTLDetailVisible(true);
            }
          }}
        >
          <div className="text-sm font-semibold text-black truncate">
            {event.title}
          </div>
          <div className="text-xs text-white opacity-90">{event.startTime}</div>
        </div>
      );
    });
  };

  // Navigation functions
  const goToPreviousWeek = () => {
    const newDate = new Date(viewDate);
    newDate.setDate(newDate.getDate() - 7);
    setViewDate(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(viewDate);
    newDate.setDate(newDate.getDate() + 7);
    setViewDate(newDate);
  };

  const goToToday = () => {
    setViewDate(new Date());
    setIsInitialScroll(true);
    setTimeout(() => {
      scrollToCurrentTime(true);
    }, 300);
  };

  const toggleAutoScroll = () => {
    const newAutoScroll = !autoScroll;
    setAutoScroll(newAutoScroll);

    if (newAutoScroll) {
      setTimeout(() => {
        scrollToCurrentTime(true);
      }, 100);
    }
  };

  const handleScroll = (event: any) => {
    const scrollTop = event.target.scrollTop;
    if (timeScrollRef.current) {
      timeScrollRef.current.scrollTop = scrollTop;
    }
  };

  return (
    <div className={`flex flex-col h-[calc(100vh-64px)] bg-gray-50 relative`}>
      {/* Drag Preview */}
      {dragState.isDragging && dragState.draggedEvent && (
        <div
          ref={dragPreviewRef}
          className={`fixed z-50 ${dragState.draggedEvent.color || "bg-sky-500"} rounded-md p-2 opacity-80 pointer-events-none shadow-lg`}
          style={{
            width: 150,
            height: 60,
          }}
        >
          <div className="text-sm font-semibold text-black truncate">
            {dragState.draggedEvent.title}
          </div>
          <div className="text-xs text-white opacity-90">
            {dragState.draggedEvent.startTime}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="border-b border-gray-200 bg-white px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold text-gray-900">
            HSV LOTUS / FACTORY 1 / 1F
          </h1>
          <div className="flex items-center gap-2 space-x-2">
            <button
              className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-md text-sm hover:bg-blue-700"
              onClick={toggleAutoScroll}
            >
              {autoScroll ? (
                <Lock className="w-4 h-4" />
              ) : (
                <LockOpen className="w-4 h-4" />
              )}
              Auto Scroll
            </button>
            <button
              className="p-2 border-2 border-gray-300 rounded-full hover:bg-gray-100"
              onClick={goToPreviousWeek}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={goToToday}
            >
              Today
            </button>
            <button
              className="p-2 border-2 border-gray-300 rounded-full hover:bg-gray-100"
              onClick={goToNextWeek}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Week Header */}
      <div className="flex border-b border-gray-200 bg-white">
        <div className="w-24 flex justify-center items-center border-r border-gray-200 p-2">
          <span className="text-xs font-medium text-gray-500">Time</span>
        </div>

        {weekDays.map((day, index) => (
          <div
            key={index}
            className={`flex-1 flex flex-col items-center justify-center border-r border-gray-200 p-3 ${
              day.isToday ? "bg-blue-50" : ""
            }`}
          >
            <span
              className={`text-lg font-bold ${
                day.isToday
                  ? "text-blue-600"
                  : day.isWeekend
                  ? "text-red-500"
                  : "text-gray-900"
              }`}
            >
              {day.dayNumber}
            </span>
            <span
              className={`text-xs font-medium ${
                day.isToday ? "text-blue-600" : "text-gray-500"
              }`}
            >
              {day.dayName}
            </span>
          </div>
        ))}
      </div>

      {/* Timeline Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Time Column */}
        <div className="w-24 border-r border-gray-200 bg-white">
          <div
            ref={timeScrollRef}
            className="overflow-y-scroll scrollbar-hide"
            style={{ height: "100%" }}
          >
            <div style={{ height: timeSlots.length * HOUR_HEIGHT }}>
              {timeSlots.map((time) => (
                <div
                  key={time.hour}
                  style={{ height: HOUR_HEIGHT }}
                  className="flex flex-col justify-center border-b border-gray-100 px-3"
                >
                  <span className="text-xs font-medium text-gray-500">
                    {time.display}
                  </span>
                  <span className="text-xs text-gray-400">{time.military}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Days Grid */}
        <div
          ref={scrollViewRef}
          className="flex-1 overflow-y-scroll scrollbar-hide"
          onScroll={handleScroll}
        >
          <div
            className="relative flex"
            style={{ height: timeSlots.length * HOUR_HEIGHT }}
          >
            {/* Current Time Indicator Line */}
            {(() => {
              const now = new Date();
              const todayColumn = weekDays.find((day) => day.isToday);
              if (todayColumn && now.getHours() >= 6 && now.getHours() <= 23) {
                const timePosition = getCurrentTimePosition();

                return (
                  <div
                    className="absolute z-20 bg-red-500"
                    style={{
                      top: timePosition,
                      left: 0,
                      right: 0,
                      height: 2,
                      boxShadow: "0 1px 2px rgba(239, 68, 68, 0.5)",
                    }}
                  >
                    <div className="absolute -left-1.5 -top-1.5 w-3 h-3 rounded-full border-2 border-white bg-red-500 shadow-lg" />
                    <div className="absolute -top-6 left-2 rounded-md bg-red-500 px-2 py-1">
                      <span className="text-xs font-medium text-white">
                        {now.toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })}
                      </span>
                    </div>
                  </div>
                );
              }
              return null;
            })()}

            {/* Drop zones for dragging */}
            {dragState.isDragging && (
              <div className="absolute inset-0 z-10">
                {weekDays.map((day, dayIndex) => (
                  <div
                    key={`drop-${dayIndex}`}
                    className="flex-1 relative border-r border-gray-200"
                  >
                    {timeSlots.map((time, timeIndex) => (
                      <div
                        key={`drop-${dayIndex}-${timeIndex}`}
                        style={{ height: HOUR_HEIGHT }}
                        className="border-b border-gray-100 bg-blue-50/30 hover:bg-blue-100/50"
                      />
                    ))}
                  </div>
                ))}
              </div>
            )}

            {/* Day Columns */}
            {weekDays.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className="flex-1 relative border-r border-gray-200"
              >
                {/* Hour grid lines */}
                {timeSlots.map((time, timeIndex) => (
                  <div
                    key={`${dayIndex}-${timeIndex}`}
                    style={{ height: HOUR_HEIGHT }}
                    className="border-b border-gray-100 cursor-pointer hover:bg-gray-50"
                    onClick={() => {
                      if (!dragState.isDragging) {
                        console.log("Empty cell clicked");
                        setIsModalBookingVisible(true);
                      }
                    }}
                  />
                ))}

                {/* Events for this day */}
                {renderEvents(day.date)}

                {/* Today column highlight */}
                {day.isToday && (
                  <div className="pointer-events-none absolute inset-0 bg-blue-500/5" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-2">
        <span className="text-xs text-gray-500">
          Current Time: {currentTime.toLocaleTimeString()}
        </span>
        <div className="flex items-center space-x-4">
          <button
            className={`px-3 py-1 text-xs rounded ${
              autoScroll
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={toggleAutoScroll}
          >
            Auto Scroll: {autoScroll ? "ON" : "OFF"}
          </button>
          <span className="text-xs text-gray-500">
            Week of {weekDays[0].date.toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Booking Modal */}
      {isModalBookingVisible && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div 
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            style={{
              transform: `translate(${bookingModalPos.x}px, ${bookingModalPos.y}px)`
            }}
          >
            <div className="p-8 space-y-6">
              {/* Header with drag handle */}
              <div className="relative">
                <div 
                  className="absolute left-0 top-0 cursor-move p-2"
                  onMouseDown={(e) => handleModalMouseDown(e, 'booking')}
                >
                  <Move className="w-5 h-5 text-gray-400" />
                </div>
                <button
                  className="absolute right-0 top-0 text-sky-400 hover:text-sky-600"
                  onClick={() => {
                    setIsModalBookingVisible(false);
                    setBookingModalPos({ x: 0, y: 0 });
                  }}
                >
                  <X className="w-6 h-6" />
                </button>
                <input
                  type="text"
                  placeholder="Add Title"
                  className="w-full text-center text-4xl font-semibold border-b-2 border-gray-300 pb-4 outline-none focus:border-blue-500 pl-10"
                />
              </div>

              {/* Content */}
              <div className="space-y-6">
                <div>
                  <label className="text-xl font-semibold text-gray-600">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full mt-2 px-4 py-3 text-lg border-b-2 border-gray-300 bg-gray-100 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-6 h-6" />
                    <label className="text-xl font-semibold text-gray-600">
                      Date
                    </label>
                  </div>
                  <input
                    type="date"
                    className="w-full px-4 py-3 text-lg border-b-2 border-gray-300 bg-gray-100 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-6 h-6" />
                    <label className="text-xl font-semibold text-gray-600">
                      Time Start ~ End
                    </label>
                  </div>
                  <div className="flex gap-4">
                    <input
                      type="time"
                      defaultValue="18:00"
                      className="flex-1 px-4 py-4 text-3xl font-semibold border-b-2 border-gray-300 bg-gray-100 outline-none focus:border-blue-500"
                    />
                    <input
                      type="time"
                      defaultValue="19:00"
                      className="flex-1 px-4 py-4 text-3xl font-semibold border-b-2 border-gray-300 bg-gray-100 outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {arrayDuration.map((item, index) => (
                      <button
                        key={index}
                        className="flex-shrink-0 px-4 py-2 rounded-full border-2 border-green-500 bg-green-100 text-lg text-gray-700 hover:bg-green-200"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button className="w-full py-4 bg-blue-600 text-white text-2xl font-bold rounded-lg hover:bg-blue-700">
                  Book now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {isModalTLDetailVisible && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div 
            className="bg-white rounded-lg max-w-2xl w-full"
            style={{
              transform: `translate(${detailModalPos.x}px, ${detailModalPos.y}px)`
            }}
          >
            <div className="p-8 space-y-6">
              {/* Header with drag handle */}
              <div className="relative">
                <div 
                  className="absolute left-0 top-0 cursor-move p-2"
                  onMouseDown={(e) => handleModalMouseDown(e, 'detail')}
                >
                  <Move className="w-5 h-5 text-gray-400" />
                </div>
                <button
                  className="absolute right-0 top-0 text-sky-400 hover:text-sky-600"
                  onClick={() => {
                    setIsModalTLDetailVisible(false);
                    setDetailModalPos({ x: 0, y: 0 });
                  }}
                >
                  <X className="w-6 h-6" />
                </button>
                <h2 className="text-center text-3xl font-semibold pr-8 pl-10">
                  [SS26] Discuss about new project
                </h2>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <MailOpen className="w-6 h-6" />
                  <span className="text-lg font-semibold">
                    pham.huynh@hsvina.com
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <Calendar className="w-6 h-6" />
                  <span className="text-lg font-semibold">2025-08-25</span>
                </div>

                <div className="flex items-center gap-4">
                  <Clock className="w-6 h-6" />
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">19:30</span>
                    <span className="text-2xl font-bold">-</span>
                    <span className="text-2xl font-bold">20:30</span>
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <button className="flex items-center gap-2 px-6 py-3 border border-green-500 bg-green-50 rounded-lg hover:bg-green-100">
                    <Pencil className="w-6 h-6 text-green-600" />
                  </button>
                  <button className="flex items-center gap-2 px-6 py-3 border border-red-500 bg-red-50 rounded-lg hover:bg-red-100">
                    <Trash2 className="w-6 h-6 text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .cursor-move {
          cursor: move;
        }
      `}</style>
    </div>
  );
};

export default TimelineScreen;