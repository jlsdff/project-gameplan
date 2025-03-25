"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Divider, Spinner } from "@heroui/react";
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
import { getGamesByDocs } from "@/utils/gamesAPI";
import PlayerTableById from "@/components/client/player/playerTableID";
import { timestampToDate } from "@/helpers/timestampToDate";
import { Helmet } from "react-helmet";
import { heroui } from "@heroui/theme";

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
    games: gamesData.sort((a, b) => {
      const aDate = a.date.toDate();
      const bDate = b.date.toDate();
      return bDate.getTime() - aDate.getTime();
    }),
  };
}

export default function PlayerPage({ id }) {
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    const data = await getPlayerData({ id });
    return data;
  }, [id]);

  useEffect(() => {
    try {
      fetchData()
        .then((res) => {
          setPlayer({
            ...res,
            ppg: getPPG(res.gameRecords),
            apg: getAPG(res.gameRecords),
            rpg: getRPG(res.gameRecords),
            bpg: getBPG(res.gameRecords),
            spg: getSPG(res.gameRecords),
            fgp: getFGP(res.gameRecords),
            twoPG: get2PG(res.gameRecords),
            threePG: get3PG(res.gameRecords),
            ftp: getFTP(res.gameRecords),
          });
        })
        .catch((error) => {
          throw new Error(error);
        });
    } catch (error) {
      console.error(error);
      alert("Error Fetching Player Data, Please Try Again Later");
    } finally {
      setLoading(false);
    }
  }, [fetchData]);

  const name = player
    ? `${player.lastname}, ${player.firstname}`
    : "Loading...";
  return (
    <>
      <Helmet>
        <title>{name}</title>
        <meta name="description" content={`Player Page for ${name}`} />
        <meta name="keywords" content={`Player, ${name}`} />
      </Helmet>
      {!player ? (
        <main className="flex items-center justify-center w-full h-screen">
          <Spinner label="Loading..." />
        </main>
      ) : (
        <main className="px-8 py-4 sm:py-8 sm:px-16">
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
          <Divider className="my-6" />
          <section>
            <PlayerTableById
              games={player.games || []}
              playerId={player.id || ""}
            />
          </section>
        </main>
      )}
    </>
  );
}
