import React from "react";
import { Image } from "@nextui-org/react";

export const metadata = {
  title: "HOOPLIFE VS RC3 x MIDNIGHT HOOPS",
  description: "Game between HOOPLIFE VS RC3 x MIDNIGHT HOOPS",
};

export default function page() {
  return (
    <div className="px-8 py-4 sm:py-8 sm:px-16 flex justify-center items-center ">
      <Image src={"/game_2.png"} alt="HOOPLIFE VS RC3 x MIDNIGHT HOOPS" />
    </div>
  );
}
