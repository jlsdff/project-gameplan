import React from "react";
import { Image } from "@nextui-org/react";

export const metadata = {
  title: "SWEESH vs RC3 x MIDNIGHT HOOPS",
  description: "Game between SWEESH and RC3 x MIDNIGHT HOOPS",
};

export default function page() {
  return (
    <div className="flex items-center justify-center px-8 py-4 sm:py-8 sm:px-16 ">
      <Image src={"/game_6.png"} alt="SWEESH vs RC3 x MIDNIGHT HOOPS" />
    </div>
  );
}
