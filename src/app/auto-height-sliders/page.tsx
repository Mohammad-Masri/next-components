import AutoHeightSlider, { SlideType } from "@/components/auto-height-slider";
import React from "react";

export default function AutoHeightSlidersExample() {
  const slides: SlideType[] = [
    {
      id: "page-1",
      content: (
        <div
          key={1}
          className="bg-red-500 h-52 text-6xl flex flex-row items-center justify-center"
        >
          Slide 1
        </div>
      ),
    },
    {
      id: "page-2",
      content: (
        <div
          key={2}
          className="bg-green-500 h-screen text-6xl mx-20 flex flex-row items-center justify-center"
        >
          Slide 2
        </div>
      ),
    },
    {
      id: "page-3",
      content: (
        <div
          key={3}
          className="bg-orange-300 h-80 text-6xl flex flex-row items-center justify-center"
        >
          Slide 3
        </div>
      ),
    },
    {
      id: "page-4",
      content: (
        <div
          key={4}
          className="bg-blue-500 h-screen text-6xl my-10 flex flex-row items-center justify-center"
        >
          Slide 4
        </div>
      ),
    },
    {
      id: "page-5",
      content: (
        <div
          key={5}
          className="bg-sky-500 h-screen text-6xl flex flex-row items-center justify-center"
        >
          Slide 5
        </div>
      ),
    },
  ];
  return <AutoHeightSlider slides={slides} />;
}
