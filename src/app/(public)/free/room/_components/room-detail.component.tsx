"use client";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  MessageSquare,
  Mic,
  PersonStanding,
  Table,
  Wifi,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const roomImages = [
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1541746972996-4e0b0f93e586?w=400&h=300&fit=crop",
];

const roomFeatures = [
  { icon: <MessageSquare className="h-4 w-4" />, label: "Video Conference" },
  { icon: <Wifi className="h-4 w-4" />, label: "High-speed WiFi" },
  { icon: <Mic className="h-4 w-4" />, label: "Audio System" },
];

export interface IRoomDetailComponent {}

const RoomDetailComponent = ({}: IRoomDetailComponent) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    
  
    return () => {
      
    }
  }, [])
  

  return (
    <>
      <div className="flex-1 border border-gray-200/50 rounded-md shadow-md mb-2">
        {/* Room Image Carousel */}
        <div className="relative p-3">
          <Image
            src={roomImages[currentImageIndex]}
            className="h-64 w-full rounded-md"
            width={400}
            height={300}
            alt="Room Image"
          />

          {/* Image Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 transform flex flex-row space-x-2">
            {roomImages.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === currentImageIndex ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Room Details */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-6 py-6">
            {/* Room Title and Details */}
            <div className="mb-0 flex flex-row justify-between">
              <p className="mb-2 p-2xl font-bold p-foreground">HSV/GA</p>
              <div className="mb-4 flex-col gap-1 space-x-4">
                <div className="flex flex-row items-center">
                  <PersonStanding className="h-4 w-4" color={"#6b7280"} />
                  <p className="p-base font-medium p-gray-600">20</p>
                </div>
              </div>
            </div>

            <div className="my-2 flex w-full">
              <Button
                className="rounded-full border border-sky-500 p-2 flex-grow-1"
                variant={"ghost"}
                onClick={() => {
                  //   router.navigate("/(public)/timeline-screen");
                }}
              >
                <div className="">
                  <p className="p-sky-500 font-bold p-center">Schedule</p>
                </div>
              </Button>
            </div>

            {/* Room Features Icons */}
            <div className="">
              <p className="mb-2 p-base font-semibold p-foreground">Features</p>
              <div className="mb-6 flex flex-row items-center gap-2">
                {roomFeatures.map((feature, index) => (
                  <div key={index} className="flex-col items-center">
                    <div className="mb-1 rounded-full bg-sky-200 p-2">
                      {feature.icon}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Usability Section */}
            <div className="mb-8">
              <p className="mb-4 p-lg font-semibold p-foreground">Usability</p>

              <div className="space-y-3">
                {/* Time Available */}
                <div className="flex flex-row items-center">
                  <div className="mr-3 h-5 w-5 items-center justify-center">
                    <Calendar className="h-4 w-4 p-muted-foreground" />
                  </div>
                  <p className="p-base p-foreground">08:00 - 18:00</p>
                </div>

                {/* Advance Booking */}
                <div className="flex flex-row items-center">
                  <div className="mr-3 h-5 w-5 items-center justify-center">
                    <Calendar className="h-4 w-4 p-muted-foreground" />
                  </div>
                  <p className="p-base p-foreground">
                    Requires 2 weeks booking in advanced
                  </p>
                </div>

                {/* Quick Booking */}
                <div className="flex flex-row items-center">
                  <div className="mr-3 h-5 w-5 items-center justify-center">
                    <Calendar className="h-4 w-4 p-muted-foreground" />
                  </div>
                  <p className="p-base p-foreground">
                    Can book up to 30 minutes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomDetailComponent;
