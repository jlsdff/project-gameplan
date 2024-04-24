import React from "react";
import { josefinSans } from "@/components/fonts";
import { Image } from "@nextui-org/react";
import { Link } from "@nextui-org/react";

export default function OngoingLeague() {
  return (
    <div className="p-8 sm:px-16 bg-gradient-to-r from-primary-900 to-primary-700">
      <h2
        className={`text-center md:text-left text-3xl font-black ${josefinSans.className}`}
      >
        ONGOING LEAGUE
      </h2>
      <div className="flex items-center justify-center w-full">
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/the-project-gameplan.appspot.com/o/images%2Fskirmish.jpg?alt=media&token=e30e79d1-ee9a-40e0-b603-68e21ab09087"
          alt=" "
          className="mx-auto sm:w-1/2 object-fit"
        />
      </div>
    </div>
  );
}
