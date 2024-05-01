import React from "react";
import { getPlayerById, getPlayerGamerecords } from "@/utils/playerAPI";
import { firestore, Timestamp } from "@/lib/firebase/firebase";
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
import {
  Divider,
} from "@nextui-org/react";
import { getGamesByDocs } from "@/utils/gamesAPI";
import PlayerTableById from "@/components/client/player/playerTableID";

async function getPlayerData(params) {
  const { id } = params;

  const player = await firestore
    .collection("players")
    .doc(id)
    .get()
    .then((res) => {
      if (res.exists) {
        return {
          id: res.id,
          ...res.data(),
        };
      } else {
        return null;
      }
    });

  const records = await getPlayerGamerecords(id);

  const games = await getGamesByDocs(records.map((record) => record.gameId));
  const gameCompleteData = games.map(async (game) => {
    const teamA = await firestore
      .collection("teams")
      .doc(game.teamA.id)
      .get()
      .then((res) => ({ id: res.id, ...res.data() }));
    const teamB = await firestore
      .collection("teams")
      .doc(game.teamB.id)
      .get()
      .then((res) => ({ id: res.id, ...res.data() }));
    const league = await firestore
      .collection("leagues")
      .doc(game.leagueId)
      .get()
      .then((res) => ({ id: res.id, ...res.data() }));
    const time = game.time.toDate();
    return {
      ...game,
      teamA: {
        data: teamA,
        ...game.teamA,
      },
      teamB: {
        data: teamB,
        ...game.teamB,
      },
      league: league,
      time: time,
    };
  });
  const gamesData = await Promise.all(gameCompleteData);

  return {
    ...player,
    gameRecords: records,
    games: gamesData,
  };
}

export default async function Page({ params }) {
  let player = await getPlayerData(params);

  const name = player.firstname
    ? `${player.lastname}, ${player.firstname}`
    : `${player.lastname}`;

  player = {
    ...player,
    ppg: getPPG(player.gameRecords),
    apg: getAPG(player.gameRecords),
    rpg: getRPG(player.gameRecords),
    bpg: getBPG(player.gameRecords),
    spg: getSPG(player.gameRecords),
    fgp: getFGP(player.gameRecords),
    twoPG: get2PG(player.gameRecords),
    threePG: get3PG(player.gameRecords),
    ftp: getFTP(player.gameRecords),
  };

  return (
    <main className="px-8 py-4 sm:py-8 sm:px-16">
      <section className="flex flex-col items-center justify-between gap-4 md:flex-row">
        {/* INFO */}
        <div className="flex flex-col items-center justify-center gap-2 md:items-start">
          <h1 className="text-2xl font-black sm:text-4xl text-primary">
            {name}
          </h1>
          <p className="font-light text-md sm:text-xl">
            {player.positions.join(" | ")}
          </p>
        </div>
        {/* STATS */}
        <div className="grid w-full grid-cols-3 grid-rows-3 gap-2 md:w-1/2 place-self-center">
          <div className="flex flex-col items-center justify-center md:items-start">
            <h3 className="text-base sm:text-xl font-regular text-neutral-300">
              PPG
            </h3>
            <h2 className="text-xl font-bold sm:text-2xl">{player.ppg}</h2>
          </div>
          <div className="flex flex-col items-center justify-center md:items-start">
            <h3 className="text-base sm:text-xl font-regular text-neutral-300">
              APG
            </h3>
            <h2 className="text-xl font-bold sm:text-2xl">{player.apg}</h2>
          </div>
          <div className="flex flex-col items-center justify-center md:items-start">
            <h3 className="text-base sm:text-xl font-regular text-neutral-300">
              RPG
            </h3>
            <h2 className="text-xl font-bold sm:text-2xl">{player.rpg}</h2>
          </div>
          <div className="flex flex-col items-center justify-center md:items-start">
            <h3 className="text-base sm:text-xl font-regular text-neutral-300">
              BPG
            </h3>
            <h2 className="text-xl font-bold sm:text-2xl">{player.bpg}</h2>
          </div>
          <div className="flex flex-col items-center justify-center md:items-start">
            <h3 className="text-base sm:text-xl font-regular text-neutral-300">
              SPG
            </h3>
            <h2 className="text-xl font-bold sm:text-2xl">{player.spg}</h2>
          </div>
          <div className="flex flex-col items-center justify-center md:items-start">
            <h3 className="text-base sm:text-xl font-regular text-neutral-300">
              FG%
            </h3>
            <h2 className="text-xl font-bold sm:text-2xl">{`${player.fgp}%`}</h2>
          </div>
          <div className="flex flex-col items-center justify-center md:items-start">
            <h3 className="text-base sm:text-xl font-regular text-neutral-300">
              2P%
            </h3>
            <h2 className="text-xl font-bold sm:text-2xl">{`${player.twoPG}%`}</h2>
          </div>
          <div className="flex flex-col items-center justify-center md:items-start">
            <h3 className="text-base sm:text-xl font-regular text-neutral-300">
              3P%
            </h3>
            <h2 className="text-xl font-bold sm:text-2xl">{`${player.threePG}%`}</h2>
          </div>
          <div className="flex flex-col items-center justify-center md:items-start">
            <h3 className="text-base sm:text-xl font-regular text-neutral-300">
              FTP
            </h3>
            <h2 className="text-xl font-bold sm:text-2xl">{`${player.ftp}%`}</h2>
          </div>
        </div>
      </section>
      <Divider className="my-6" />
      <h2 className="text-lg font-bold tracking-wide md:text-xl">
        Games Played
      </h2>
      <section >
        <PlayerTableById games={player.games} playerId={player.id}/>
      </section>
    </main>
  );
}
