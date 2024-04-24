import React from "react";
import { Image } from "@nextui-org/react";

export const metadata = {
  title: "ONETECH vs UNDERRATED",
  description: "Game between ONETECH and UNDERRATED",
};

export default function page() {
  return (
    <div className="px-8 py-4 sm:py-8 sm:px-16 flex justify-center items-center ">
      <Image src={"/game_3.png"} alt="ONETECH vs UNDERRATED" />
    </div>
  );
}
