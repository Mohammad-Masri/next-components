"use client";
import React, { useEffect, useRef } from "react";
import "./AutoHeightSlider.css";

function smoothScrollTo(targetOffsetTop: number, duration = 800) {
  const startingY = window.pageYOffset;
  const diff = targetOffsetTop - startingY;
  let start: number;

  // Use requestAnimationFrame for smooth animation
  function step(timestamp: number) {
    if (!start) start = timestamp;
    const time = timestamp - start;
    const percent = Math.min(time / duration, 1);

    window.scrollTo(0, startingY + diff * percent);

    if (time < duration) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

export type SlideType = {
  id: string;
  content: React.ReactNode;
};

type Props = {
  slides: SlideType[];
};

export default function AutoHeightSlider({ slides = [] }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleHashChange = () => {
      const { hash } = window.location;
      if (hash) {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
          const targetOffsetTop =
            targetElement.getBoundingClientRect().top + window.scrollY;
          smoothScrollTo(targetOffsetTop);
        }
      }
    };

    let scrolling = false;

    const handleMouseWheel = (e: any) => {
      e.preventDefault();
      if (scrolling) return; // If scrolling is in progress, ignore the new scroll event

      const container = containerRef.current;
      if (!container) return;

      if (e.deltaY > 0) {
        // Scrolling down
        const currentIndex = slides.findIndex(
          (slide) => "#" + slide.id === window.location.hash
        );
        if (currentIndex < slides.length - 1) {
          const nextSlide = slides[currentIndex + 1];
          scrolling = true; // Set scrolling to true to prevent immediate further scrolling
          window.location.hash = nextSlide.id;
          setTimeout(() => {
            scrolling = false; // Reset scrolling after a delay
          }, 2500); // Adjust the delay as needed
        }
      } else if (e.deltaY < 0) {
        // Scrolling up
        const currentIndex = slides.findIndex(
          (slide) => "#" + slide.id === window.location.hash
        );
        if (currentIndex > 0) {
          const prevSlide = slides[currentIndex - 1];
          scrolling = true; // Set scrolling to true to prevent immediate further scrolling
          window.location.hash = prevSlide.id;
          setTimeout(() => {
            scrolling = false; // Reset scrolling after a delay
          }, 2500); // Adjust the delay as needed
        }
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    if (containerRef && containerRef.current) {
      containerRef.current.addEventListener("wheel", handleMouseWheel);
    }

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      if (containerRef && containerRef.current) {
        containerRef.current.removeEventListener("wheel", handleMouseWheel);
      }
    };
  }, [slides]);

  return (
    <div
      className="flex flex-col scroll-smooth"
      style={{ scrollBehavior: "smooth" }}
      ref={containerRef}
    >
      {slides.map((slide, index) => (
        <div key={index} id={slide.id}>
          {slide.content}
        </div>
      ))}
    </div>
  );
}
