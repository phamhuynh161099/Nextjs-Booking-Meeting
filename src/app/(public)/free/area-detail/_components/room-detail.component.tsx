// "use client";
// import { Button } from "@/components/ui/button";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import {
//   Calendar,
//   MapPin,
//   MessageSquare,
//   Mic,
//   PersonStanding,
//   Table,
//   Wifi,
// } from "lucide-react";
// import Image from "next/image";
// import { useEffect, useState } from "react";

// const roomImages = [
//   "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
//   "https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=400&h=300&fit=crop",
//   "https://images.unsplash.com/photo-1541746972996-4e0b0f93e586?w=400&h=300&fit=crop",
// ];

// const roomFeatures = [
//   { icon: <MessageSquare className="h-4 w-4" />, label: "Video Conference" },
//   { icon: <Wifi className="h-4 w-4" />, label: "High-speed WiFi" },
//   { icon: <Mic className="h-4 w-4" />, label: "Audio System" },
// ];

// export interface IRoomDetailComponent {}

// const RoomDetailComponent = ({}: IRoomDetailComponent) => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   useEffect(() => {
//     return () => {};
//   }, []);

//   return (
//     <>
//       <div className="h-full flex-1 border border-gray-200/50 rounded-md shadow-md mb-2">
//         {/* Room Image Carousel */}
//         <div className="relative p-3">
//           {/* <Image
//             src={roomImages[currentImageIndex]}
//             className="h-64 w-full rounded-md"
//             width={400}
//             height={300}
//             alt="Room Image"
//           /> */}

//           <Carousel className="h-[100%] [&>div]:h-[100%]">
//             <CarouselContent className="h-[100%] -ml-4">
//               <CarouselItem className="h-[100%]  pl-4">
//                 <Image
//                   src={roomImages[currentImageIndex]}
//                   className="h-64 w-full rounded-md"
//                   width={400}
//                   height={300}
//                   alt="Room Image"
//                 />
//               </CarouselItem>

//               <CarouselItem className="h-[100%]  pl-4">
//                 <Image
//                   src={roomImages[currentImageIndex]}
//                   className="h-64 w-full rounded-md"
//                   width={400}
//                   height={300}
//                   alt="Room Image"
//                 />
//               </CarouselItem>

//               <CarouselItem className="h-[100%]  pl-4">
//                 <Image
//                   src={roomImages[currentImageIndex]}
//                   className="h-64 w-full rounded-md"
//                   width={400}
//                   height={300}
//                   alt="Room Image"
//                 />
//               </CarouselItem>
//             </CarouselContent>

//             <CarouselPrevious className="!left-2"/>
//             <CarouselNext className="!right-2"/>
//           </Carousel>
//         </div>

//         {/* Room Details */}
//         <div className="flex-1 overflow-y-auto">
//           <div className="px-6 py-6">
//             {/* Room Title and Details */}
//             <div className="mb-0 flex flex-row justify-between">
//               <p className="mb-2 p-2xl font-bold p-foreground">HSV/GA</p>
//               <div className="mb-4 flex-col gap-1 space-x-4">
//                 <div className="flex flex-row items-center">
//                   <PersonStanding className="h-4 w-4" color={"#6b7280"} />
//                   <p className="p-base font-medium p-gray-600">20</p>
//                 </div>
//               </div>
//             </div>

//             <div className="my-2 flex w-full">
//               <Button
//                 className="rounded-full border border-sky-500 p-2 flex-grow-1"
//                 variant={"ghost"}
//                 onClick={() => {
//                   //   router.navigate("/(public)/timeline-screen");
//                 }}
//               >
//                 <div className="">
//                   <p className="p-sky-500 font-bold p-center">Schedule</p>
//                 </div>
//               </Button>
//             </div>

//             {/* Room Features Icons */}
//             <div className="">
//               <p className="mb-2 p-base font-semibold p-foreground">Features</p>
//               <div className="mb-6 flex flex-row items-center gap-2">
//                 {roomFeatures.map((feature, index) => (
//                   <div key={index} className="flex-col items-center">
//                     <div className="mb-1 rounded-full bg-sky-200 p-2">
//                       {feature.icon}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Usability Section */}
//             <div className="mb-8">
//               <p className="mb-4 p-lg font-semibold p-foreground">Usability</p>

//               <div className="space-y-3">
//                 {/* Time Available */}
//                 <div className="flex flex-row items-center">
//                   <div className="mr-3 h-5 w-5 items-center justify-center">
//                     <Calendar className="h-4 w-4 p-muted-foreground" />
//                   </div>
//                   <p className="p-base p-foreground">08:00 - 18:00</p>
//                 </div>

//                 {/* Advance Booking */}
//                 <div className="flex flex-row items-center">
//                   <div className="mr-3 h-5 w-5 items-center justify-center">
//                     <Calendar className="h-4 w-4 p-muted-foreground" />
//                   </div>
//                   <p className="p-base p-foreground">
//                     Requires 2 weeks booking in advanced
//                   </p>
//                 </div>

//                 {/* Quick Booking */}
//                 <div className="flex flex-row items-center">
//                   <div className="mr-3 h-5 w-5 items-center justify-center">
//                     <Calendar className="h-4 w-4 p-muted-foreground" />
//                   </div>
//                   <p className="p-base p-foreground">
//                     Can book up to 30 minutes
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default RoomDetailComponent;

"use client";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Calendar,
  MessageSquare,
  Mic,
  PersonStanding,
  Wifi,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const roomImages = [
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=400&h=300&fit=crop",
];

const roomFeatures = [
  { icon: <MessageSquare className="h-4 w-4" />, label: "Video Conference" },
  { icon: <Wifi className="h-4 w-4" />, label: "High-speed WiFi" },
  { icon: <Mic className="h-4 w-4" />, label: "Audio System" },
];

export interface IRoomDetailComponent {}

const RoomDetailComponent = ({}: IRoomDetailComponent) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setModalImageIndex(index);
    setIsModalOpen(true);
  };

  const handleModalPrevious = () => {
    setModalImageIndex((prev) =>
      prev === 0 ? roomImages.length - 1 : prev - 1
    );
  };

  const handleModalNext = () => {
    setModalImageIndex((prev) =>
      prev === roomImages.length - 1 ? 0 : prev + 1
    );
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Handle keyboard navigation for modal
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isModalOpen) return;

      if (e.key === "Escape") {
        handleCloseModal();
      } else if (e.key === "ArrowLeft") {
        handleModalPrevious();
      } else if (e.key === "ArrowRight") {
        handleModalNext();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [isModalOpen]);

  return (
    <>
      <div className="h-full flex-1 border border-gray-200/50 rounded-md shadow-md mb-2">
        {/* Room Image Carousel */}
        <div className="relative p-3">
          <Carousel className="h-[100%] [&>div]:h-[100%]">
            <CarouselContent className="h-[100%] -ml-4">
              {roomImages.map((image, index) => (
                <CarouselItem key={index} className="h-[100%] pl-4">
                  <Image
                    src={image}
                    className="h-64 w-full rounded-md cursor-pointer hover:opacity-90 transition-opacity"
                    width={400}
                    height={300}
                    alt="Room Image"
                    onClick={() => handleImageClick(index)}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="!left-2" />
            <CarouselNext className="!right-2" />
          </Carousel>
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

      {/* Image Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full w-full">
            {/* Close button */}
            <button
              onClick={handleCloseModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
            >
              <X className="h-8 w-8" />
            </button>

            {/* Image container */}
            <div className="relative">
              <Image
                src={roomImages[modalImageIndex]}
                width={800}
                height={600}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                alt="Room Image"
              />

              {/* Navigation arrows */}
              {roomImages.length > 1 && (
                <>
                  <button
                    onClick={handleModalPrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={handleModalNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}

              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full">
                {modalImageIndex + 1} / {roomImages.length}
              </div>
            </div>

            {/* Thumbnail strip */}
            <div className="flex justify-center mt-4 space-x-2 overflow-x-auto pb-2">
              {roomImages.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  width={80}
                  height={60}
                  className={`h-16 w-20 object-cover rounded cursor-pointer transition-all ${
                    index === modalImageIndex
                      ? "ring-2 ring-blue-500 opacity-100"
                      : "opacity-60 hover:opacity-80"
                  }`}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => setModalImageIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RoomDetailComponent;
