"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import RoomDetailComponent from "./_components/room-detail.component";
import { parseSearchParams } from "@/lib/utils";
import { CornerDownLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface IFilterParameter {
  areaId: string;
}

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const queryObject = parseSearchParams(searchParams);
  const [filterParameter, setfilterParameter] = useState<IFilterParameter>({
    areaId: queryObject.areaId as string,
  });

  useEffect(() => {
    setfilterParameter({ areaId: queryObject.areaId as string });
  }, [searchParams]);

  useEffect(() => {
    if (!filterParameter.areaId) {
      router.push("/free/area");
    }
  }, [filterParameter]);

  return (
    <>
      <div className="flex flex-col h-full">
        <section className="pt-2">
          <div className="h-[60px] px-2">
            <div className="h-full w-full items-center justify-center rounded-md bg-white shadow-md p-2">
              <Button onClick={() => router.back()}>
                <CornerDownLeft/>
              </Button>
            </div>
          </div>
        </section>

        <section className="h-full mt-2 p-2">
          <div className="h-full flex flex-row gap-2 overflow-x-auto">
            <Carousel className="h-[100%] [&>div]:h-[100%]">
              <CarouselContent className="h-[100%] -ml-4">
                <CarouselItem className="h-[100%] basis-[calc(25%+25px)] pl-4">
                  <RoomDetailComponent />
                </CarouselItem>
                <CarouselItem className="h-[100%] basis-[calc(25%+25px)] pl-4">
                  <RoomDetailComponent />
                </CarouselItem>
                <CarouselItem className="h-[100%] basis-[calc(25%+25px)] pl-4">
                  <RoomDetailComponent />
                </CarouselItem>

                <CarouselItem className="h-[100%] basis-[calc(25%+25px)] pl-4">
                  <RoomDetailComponent />
                </CarouselItem>

                <CarouselItem className="h-[100%] basis-[calc(25%+25px)] pl-4">
                  <RoomDetailComponent />
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </div>
        </section>
      </div>
    </>
  );
};

export default Page;
