"use client";
import React, { useEffect, useRef, useState } from "react";

export interface DynamicLinePoint {
  x: number | string;
  y: number | string;
}

type Props = {
  points: DynamicLinePoint[];
  color?: string;
  strokeWidth?: number;
};

export default function DynamicLine({
  points,
  color = "black",
  strokeWidth = 2,
}: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      if (svgRef.current) {
        const { width, height } = svgRef.current.getBoundingClientRect();
        setSvgSize({ width, height });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  const convertToPixel = (percentage: string, totalSize: number) => {
    const value = parseFloat(percentage);
    return (value / 100) * totalSize;
  };

  const svgPath = points
    .map(({ x, y }) => {
      const xPos = typeof x == "string" ? convertToPixel(x, svgSize.width) : x;
      const yPos = typeof y == "string" ? convertToPixel(y, svgSize.height) : y;
      return `${xPos},${yPos}`;
    })
    .join(" ");

  return (
    <svg ref={svgRef} height="100%" width="100%">
      <polyline
        points={svgPath}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}
