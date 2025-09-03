"use client";
import React from "react";
import AreaDetailComponent from "./_components/area-detail.component";
import { useRouter } from "next/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ArrowLeft, ArrowLeftCircle } from "lucide-react";

const AreaScreen = () => {
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col h-full">
        <section className="pt-2 ">
          <div className="h-[60px] px-2">
            <div className="h-full w-full items-center justify-center rounded-md bg-white shadow-md">
              <p className="text-black"></p>
            </div>
          </div>
        </section>

        <section className="h-full mt-2 p-2">
          <div className="h-full flex flex-row gap-2 overflow-x-auto">
            <Carousel className="h-[100%] [&>div]:h-[100%]">
              <CarouselContent className="h-[100%] -ml-4">
                <CarouselItem className="h-[100%] basis-1/4 pl-4" onClick={()=>{
                   router.push(`/free/room?areaId=${1}`);
                }}>
                  <AreaDetailComponent />
                </CarouselItem>
                <CarouselItem className="h-[100%] basis-1/4 pl-4">
                  <AreaDetailComponent />
                </CarouselItem>
                <CarouselItem className="h-[100%] basis-1/4 pl-4">
                  <AreaDetailComponent />
                </CarouselItem>

                <CarouselItem className="h-[100%] basis-1/4 pl-4">
                  <AreaDetailComponent />
                </CarouselItem>

                <CarouselItem className="h-[100%] basis-1/4 pl-4">
                  <AreaDetailComponent />
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </div>
        </section>
      </div>
    </>
  );
};

export default AreaScreen;
