"use client";
import React, { useState, useEffect } from "react";
import { FullPageSliderDirection } from "./constants";

type Props = {
  direction?: FullPageSliderDirection;
  transitionDuration?: number;
  slides: React.ReactNode[];
};

const FullPageSlider: React.FC<Props> = ({
  direction = FullPageSliderDirection.VERTICAL,
  transitionDuration = 1000,
  slides,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lastScrollTime, setLastScrollTime] = useState(0);

  useEffect(() => {
    const handleScroll = (e: any) => {
      const now = Date.now();
      const timeSinceLastScroll = now - lastScrollTime;

      // Adjust this threshold as needed for your desired sensitivity
      const scrollThreshold = 1500; // Milliseconds

      if (timeSinceLastScroll < scrollThreshold) {
        return; // Ignore the scroll event if it's too soon after the last one
      }

      setLastScrollTime(now);
      if (direction === FullPageSliderDirection.VERTICAL) {
        if (e.deltaY > 0 && currentSlide < slides.length - 1) {
          setCurrentSlide(currentSlide + 1);
        } else if (e.deltaY < 0 && currentSlide > 0) {
          setCurrentSlide(currentSlide - 1);
        }
      } else if (direction === FullPageSliderDirection.HORIZONTAL) {
        if (e.deltaX > 0 && currentSlide < slides.length - 1) {
          setCurrentSlide(currentSlide + 1);
        } else if (e.deltaX < 0 && currentSlide > 0) {
          setCurrentSlide(currentSlide - 1);
        }
      }
    };

    window.addEventListener("wheel", handleScroll);

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [currentSlide, direction, slides]);

  return (
    <div
      className={`h-screen w-screen overflow-hidden relative ${
        direction === "horizontal" ? "flex" : ""
      }`}
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`h-full w-full absolute top-0 left-0 transition-transform transform ${
            currentSlide === index
              ? "translate-x-0"
              : direction === "vertical"
              ? "translate-y-full"
              : "translate-x-full"
          }`}
          style={{
            transitionDuration: `${transitionDuration}ms`,
            transform:
              currentSlide === index
                ? "translate(0, 0)"
                : direction === "vertical"
                ? currentSlide < index
                  ? "translateY(100%)"
                  : "translateY(-100%)"
                : currentSlide < index
                ? "translateX(100%)"
                : "translateX(-100%)",
          }}
        >
          {slide}
        </div>
      ))}
    </div>
  );
};

export default FullPageSlider;
