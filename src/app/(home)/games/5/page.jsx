import React from "react";
import { Image } from "@nextui-org/react";

export const metadata = {
  title: "MAMBA VS UNDERATED",
  description: "Game between MAMBA VS UNDERATED",
};

export default function page() {
  return (
    <div className="flex items-center justify-center px-8 py-4 sm:py-8 sm:px-16 ">
      <Image src={"/game_5.png"} alt="MAMBA VS UNDERATED" />
    </div>
  );
}
