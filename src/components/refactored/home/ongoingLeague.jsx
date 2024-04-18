import React from "react";
import { josefinSans } from "@/components/fonts";
import { Image } from "@nextui-org/react";
import { Link } from "@nextui-org/react";

export default function OngoingLeague() {
  return (
    <div className="p-8 sm:px-16 bg-gradient-to-r from-primary-900 to-primary-700">
      <h2 className={`text-center md:text-left text-3xl font-black ${josefinSans.className}`}>ONGOING LEAGUE</h2>
      <div className="w-full flex justify-center items-center">
        <Image
          src="/revolution_league_hero.jpg"
          alt=" "
          className="sm:w-1/2 object-fit mx-auto"
        />
      </div>
    </div>
  );
}
