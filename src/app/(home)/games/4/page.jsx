import React from "react";
import { Image } from "@nextui-org/react";

export const metadata = {
  title: "ONETECH vs HOOPLIFE",
  description: "Game between ONETECH vs HOOPLIFE",
};

export default function page() {
  return (
    <div className="flex items-center justify-center px-8 py-4 sm:py-8 sm:px-16 ">
      <Image src={"/game_4.png"} alt="ONETECH vs HOOPLIFE" />
    </div>
  );
}
