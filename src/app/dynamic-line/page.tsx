"use client";
import DynamicLine from "@/components/dynamic-line";
import { DynamicLinePoint } from "@/components/dynamic-line/DynamicLine";
import React, { useState } from "react";

export default function DynamicLinePage() {
  const [points, setPoints] = useState<DynamicLinePoint[]>([
    { x: 10, y: "20%" },
    { x: 60, y: 40 },
    { x: "50%", y: 100 },
    { x: "90%", y: "40%" },
  ]);
  const deletePoint = (index: number) => {
    setPoints((prevState) => {
      const newState = prevState.filter((p, i) => i != index);
      return newState;
    });
  };

  const addNewPoint = (event: any) => {
    event.preventDefault();
    const xValue = event.target.elements.x.value;
    const yValue = event.target.elements.y.value;
    setPoints((prevState) => {
      prevState = [
        ...prevState,
        {
          x: xValue,
          y: yValue,
        },
      ];

      return prevState;
    });
  };

  return (
    <div className="flex flex-col gap-5 h-screen pt-5">
      <div className="flex flex-row gap-3">
        {points.map((p, index) => (
          <button
            key={index}
            className="p-2 bg-slate-400 hover:bg-red-300 rounded-full"
            onClick={() => {
              deletePoint(index);
            }}
          >
            <p>
              {p.x}, {p.y}
            </p>
          </button>
        ))}
        <div className="flex flex-row gap-1 p-2 bg-slate-200">
          <form onSubmit={addNewPoint}>
            <input
              name="x"
              placeholder="x"
              className="border-2 border-gray-500 rounded-lg w-10"
            />
            <input
              name="y"
              placeholder="y"
              className="border-2 border-gray-500 rounded-lg w-10"
            />
            <button type="submit">Add</button>
          </form>
        </div>
      </div>

      <div className="bg-slate-100 h-full relative">
        <div className="absolute h-full w-full">
          <DynamicLine points={points} color="black" strokeWidth={2} />
        </div>
      </div>
    </div>
  );
}
