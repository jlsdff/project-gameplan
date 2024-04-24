import React from "react";
import { Image } from "@nextui-org/react";

export const metadata = {
  title: "Sweesh vs Mamba",
  description: "Game between Sweesh and Mamba",
};

export default function page() {
  return (
    <div className="px-8 py-4 sm:py-8 sm:px-16 flex justify-center items-center ">
      <Image src={"/game_1.png"} alt="Sweesh vs Mamba" />
    </div>
  );
}
