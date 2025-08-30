"use client";
import React from "react";
import AreaDetailComponent from "./_components/area-detail.component";
import { useRouter } from "next/navigation";

const AreaScreen = () => {
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col h-full">
        <section className="pt-2 ">
          <div className="h-[60px] px-2">
            <div className="h-full w-full items-center justify-center rounded-md bg-white shadow-md">
              <p className="text-black">This is fiiter block</p>
            </div>
          </div>
        </section>

        <section className="h-full mt-2 p-2">
          <div className="h-full flex flex-row gap-2 overflow-x-auto">
            <div
              className={`border-1 w-[400px] flex-shrink-0 rounded-md bg-[#fffffe]/90 shadow-md`}
            >
              <AreaDetailComponent />
            </div>

            <div
              className={`border-1 w-[400px] flex-shrink-0 rounded-md bg-[#fffffe]/90 shadow-md`}
            >
              <AreaDetailComponent />
            </div>

            <div
              className={`border-1 w-[400px] flex-shrink-0 rounded-md bg-[#fffffe]/90 shadow-md`}
            >
              <AreaDetailComponent />
            </div>

            <div
              className={`border-1 w-[400px] flex-shrink-0 rounded-md bg-[#fffffe]/90 shadow-md`}
            >
              <AreaDetailComponent />
            </div>

            <div
              className={`border-1 w-[400px] flex-shrink-0 rounded-md bg-[#fffffe]/90 shadow-md`}
            >
              <AreaDetailComponent />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AreaScreen;
