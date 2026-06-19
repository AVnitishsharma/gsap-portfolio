"use client";
import InfiniteCarousel from "@/components/InfiniteCarousel";
import {projects} from "@/data/project";

export default function Home() {
  return (
    <main className="h-screen w-full">
      <InfiniteCarousel projects={projects} />
    </main>
  );
}