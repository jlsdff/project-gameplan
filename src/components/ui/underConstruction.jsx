import React from "react";
import { Image } from "@heroui/react";
import { josefinSans } from "../fonts";

export default function UnderConstruction() {
  return (
    <section className="h-[90vh] flex flex-col justify-center items-center gap-5">
      <div className="flex justify-center items-center w-[300px] md:w-[600px] object-contain">
        <Image
          className="object-contain"
          src="/underConstruction.svg"
          alt="under construction"
          width={"auto"}
        />
      </div>
      <h1 className={`text-2xl sm:text-4xl font-black ${josefinSans.className}`}>
        Under Construction
      </h1>
      <h2><a href="/">Back to home</a></h2>
    </section>
  );
}
