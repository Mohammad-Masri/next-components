import FullPageSlider from "@/components/full-page-slider";
import { FullPageSliderDirection } from "@/components/full-page-slider/constants";
import React from "react";

export default function FullPageSlidersExample() {
  const slides: React.ReactNode[] = [
    <div
      key={1}
      className="bg-red-500 h-screen text-6xl flex flex-row items-center justify-center"
    >
      Slide 1
    </div>,
    <div
      key={2}
      className="bg-green-500 h-screen text-6xl flex flex-row items-center justify-center"
    >
      Slide 2
    </div>,
    <div
      key={3}
      className="bg-orange-300 h-screen text-6xl flex flex-row items-center justify-center"
    >
      Slide 3
    </div>,
    <div
      key={4}
      className="bg-blue-500  h-screen text-6xl flex flex-row items-center justify-center"
    >
      Slide 4
    </div>,
    <div
      key={5}
      className="bg-sky-500  h-screen text-6xl flex flex-row items-center justify-center"
    >
      Slide 5
    </div>,
  ];
  return (
    <FullPageSlider
      slides={slides}
      direction={FullPageSliderDirection.VERTICAL}
      key="v-full-page-slider"
    />
  );
}
