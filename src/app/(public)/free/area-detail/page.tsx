"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { parseSearchParams } from "@/lib/utils";
import { CornerDownLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import RoomDetailComponent from "./_components/room-detail.component";

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

//   useEffect(() => {
//     setfilterParameter({ areaId: queryObject.areaId as string });
//   }, [searchParams]);

//   useEffect(() => {
//     if (!filterParameter.areaId) {
//       router.push("/free/area");
//     }
//   }, [filterParameter]);

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex flex-row flex-1 p-4 gap-4">
          <div
            style={{ width: 400 }}
            className={`border-1 rounded-md bg-[#fffffe]/90 shadow-md`}
          >
            <RoomDetailComponent />
          </div>

          <div className="flex flex-grow border-1 rounded-md bg-[#fffffe]/90 shadow-md"></div>
        </div>
      </div>
    </>
  );
};

export default Page;
