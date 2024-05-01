import { Avatar, Link } from "@nextui-org/react";
import React from "react";
import GameBox from "@/components/temp/gameBox";

export const metadata = {
  title: "Games",
  description: "Recent games played by teams",
};

export default function Page() {
  
  const games = [
    {
      teamA: {
        name: "SWEESH",
        score: 109,
      },
      teamB: {
        name: "MAMBA",
        score: 85,
      },
      url: "/games/1",
    },
    {
      teamA: {
        name: "HOOPLIFE",
        score: 75,
      },
      teamB: {
        name: "RC3 x MIDNIGHT HOOPS",
        score: 61,
      },
      url: "/games/2",
    },
    {
      teamA: {
        name: "ONETECH",
        score: 89,
      },
      teamB: {
        name: "UNDERRATED",
        score: 63,
      },
      url: "/games/3",
    },
    {
      teamA: {
        name: "ONETECH",
        score: 71,
      },
      teamB: {
        name: "HOOPLIFE",
        score: 61,
      },
      url: "/games/4",
    },
    {
      teamA: {
        name: "MAMBA",
        score: 90,
      },
      teamB: {
        name: "UNDERRATED",
        score: 48,
      },
      url: "/games/5",
    },
    
    {
      teamA: {
        name: "SWEESH",
        score: 86,
      },
      teamB: {
        name: "RC3 x MIDNIGHT HOOPS",
        score: 72,
      },
      url: "/games/3",
    },
  ];

  return (
    <>
      <section className="px-8 py-4 sm:py-8 sm:px-16 ">
        <h1 className="mb-4 text-xl font-bold sm:text-2xl">Recent Games</h1>
        <div className="flex flex-wrap gap-4 ">
          {games.map((game, index) => (
            <GameBox key={index} {...game} />
          ))}
        </div>
      </section>
    </>
  );
}
