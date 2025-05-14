'use client'
import React from "react";
import { Image } from "@heroui/react";

export default function UnderMaintainance() {
  return (
    <main className="flex items-center justify-center w-full min-h-screen">
      <section className="flex flex-col items-center gap-4">
        <div className="w-full sm:w-1/2">
          <Image className="object-fit" src="/underMaintainance.svg" alt="" />
        </div>
        <div className="space-y-2 text-center">
          <h1 className="text-4xl font-bold">Under Maintainance</h1>
          <p className="text-2xl font-semibold tracking-wide"> We&apos;ll be right back as soon as we can. </p>
        </div>
      </section>
    </main>
  );
}
