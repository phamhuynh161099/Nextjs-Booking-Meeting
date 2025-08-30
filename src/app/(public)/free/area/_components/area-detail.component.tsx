'use client'
import { MapPin, MessageSquare, Mic, Table, Wifi } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export interface IRoomDetailComponent {}

const AreaDetailComponent = ({}: IRoomDetailComponent) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  return (
    <>
      <div className="flex-1">
        {/* Room Image Carousel */}
        <div className="relative p-2">
          <Image
            src={roomImages[currentImageIndex]}
            className="h-64 w-full rounded-md"
            width={400}
            height={300}
            alt="Room Image"
          />

          {/* Image Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 transform flex-row space-x-2">
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
        <div className="flex-1">
          <div className="px-6 py-6">
            {/* Room Title and Details */}
            <div className="mb-0">
              <p className="mb-2 text-2xl font-bold text-foreground">HSV/GA</p>
              <div className="mb-4 flex-col gap-1 space-x-4">
                <div className="flex-row items-center">
                  <MapPin className="h-4 w-4" color={"#6b7280"} />
                  <p className="text-base font-medium text-gray-600">
                    Factory 1 /1F
                  </p>
                </div>
                <div className="flex-row items-center">
                  <Table
                    className="h-4 w-4 text-muted-foreground"
                    color={"#6b7280"}
                  />
                  <p className="text-base font-medium text-gray-600">
                    Availiable Meeting Room
                  </p>
                  <p className="ml-2 text-base font-medium text-gray-500">
                    <p className="text-2xl text-green-500">6</p>
                    /6
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-4 h-1 w-full bg-black/20 shadow-md" />

            {/* Description */}
            <div className="mb-6">
              <p className="text-base leading-6 text-muted-foreground">
                A meeting room is a space usually set aside for people to get
                together, often informally to hold meetings, for issues to be
                discussed, priorities set and decisions made. Fit less than 4
                people.
              </p>
            </div>

            <div className="mb-4 h-1 w-full bg-black/20 shadow-md" />
          </div>
        </div>
      </div>
    </>
  );
};

export default AreaDetailComponent;
