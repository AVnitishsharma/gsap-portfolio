"use client";
import TextReveal from "@/components/TextReveal";
import { useRef } from "react";

export default function Home() {
  const targetRef = useRef(null);

  return (
    <main className="h-[300vh]">
      <TextReveal ref={targetRef} trigger="manual" className="text-4xl bg-green-600">
        hello everyone
      </TextReveal>
      <div 
        onMouseEnter={() => targetRef.current?.play()}
        onMouseLeave={() => targetRef.current?.reverse()}
        className="h-8 w-20 bg-red-600 m-2"
      >Hover</div>
    </main>
  );
}