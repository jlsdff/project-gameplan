'use client'
import { useState } from "react";
import {
  get2PP,
  getAPG,
  getBPG,
  getFGP,
  getPPG,
  getRPG,
  getSPG,
  get2PG,
  get3PG,
  getFTP,
} from "@/helpers/players/statsHelpers";
import Averages from "@/components/ui/player/averages";


export default function Player({data}){
  
  const {player, games} = data;
  
  const [displayedGames, setDisplayedGames] = useState(games);
  
  return (
    <main className="px-8 py-4 sm:py-8 sm:px-16">
      <Averages player={player} games={displayedGames} />
    </main>
  )
}

function Player__({data}) {

  const {player, games, id} = data
  console.log("Player: ", player)
  console.log("Games: ", games )
  return (
    <main >
      <section className="flex flex-col items-center justify-between gap-4 md:flex-row">
            {/* INFO */}
            <div className="flex flex-col items-center justify-center gap-2 md:items-start">
              <h1 className="text-2xl font-black sm:text-4xl text-primary">
                {player.firstname
                  ? `${player.lastname}, ${player.firstname}`
                  : `${player.lastname}`}
              </h1>
              <p className="font-light text-md sm:text-xl">
                {player.positions?.join(" | ") || ""}
              </p>
            </div>
            {/* STATS */}
            <div className="grid w-full grid-cols-3 grid-rows-3 gap-2 md:w-1/2 place-self-center">
              <div className="flex flex-col items-center justify-center md:items-start">
                <h3 className="text-base sm:text-xl font-regular text-neutral-300">
                  PPG
                </h3>
                <h2 className="text-xl font-bold sm:text-2xl">
                  {player.ppg || 0}
                </h2>
              </div>
              <div className="flex flex-col items-center justify-center md:items-start">
                <h3 className="text-base sm:text-xl font-regular text-neutral-300">
                  APG
                </h3>
                <h2 className="text-xl font-bold sm:text-2xl">
                  {player.apg || 0}
                </h2>
              </div>
              <div className="flex flex-col items-center justify-center md:items-start">
                <h3 className="text-base sm:text-xl font-regular text-neutral-300">
                  RPG
                </h3>
                <h2 className="text-xl font-bold sm:text-2xl">
                  {player.rpg || 0}
                </h2>
              </div>
              <div className="flex flex-col items-center justify-center md:items-start">
                <h3 className="text-base sm:text-xl font-regular text-neutral-300">
                  BPG
                </h3>
                <h2 className="text-xl font-bold sm:text-2xl">
                  {player.bpg || 0}
                </h2>
              </div>
              <div className="flex flex-col items-center justify-center md:items-start">
                <h3 className="text-base sm:text-xl font-regular text-neutral-300">
                  SPG
                </h3>
                <h2 className="text-xl font-bold sm:text-2xl">
                  {player.spg || 0}
                </h2>
              </div>
              <div className="flex flex-col items-center justify-center md:items-start">
                <h3 className="text-base sm:text-xl font-regular text-neutral-300">
                  FG%
                </h3>
                <h2 className="text-xl font-bold sm:text-2xl">{`${
                  player.fgp || 0
                }%`}</h2>
              </div>
              <div className="flex flex-col items-center justify-center md:items-start">
                <h3 className="text-base sm:text-xl font-regular text-neutral-300">
                  2P%
                </h3>
                <h2 className="text-xl font-bold sm:text-2xl">{`${
                  player.twoPG || 0
                }%`}</h2>
              </div>
              <div className="flex flex-col items-center justify-center md:items-start">
                <h3 className="text-base sm:text-xl font-regular text-neutral-300">
                  3P%
                </h3>
                <h2 className="text-xl font-bold sm:text-2xl">{`${
                  player.threePG || 0
                }%`}</h2>
              </div>
              <div className="flex flex-col items-center justify-center md:items-start">
                <h3 className="text-base sm:text-xl font-regular text-neutral-300">
                  FTP
                </h3>
                <h2 className="text-xl font-bold sm:text-2xl">{`${
                  player.ftp || 0
                }%`}</h2>
              </div>
            </div>
          </section>
    </main>
  )
}