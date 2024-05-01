import React from "react";
import { firestore } from "@/lib/firebase/firebase";
import { Image } from "@nextui-org/react";

async function getTeamData(params) {
  const { id } = params;

  let team = await firestore
    .collection("teams")
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

  const games = await firestore
    .collection("teams")
    .doc(id)
    .collection("gameRecords")
    .get()
    .then((snapshot) =>
      snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      })
    );

  let players = team.players.map(async (id) => {
    const player = await firestore
      .collection("players")
      .doc(id)
      .get()
      .then((snapshot) => ({ ...snapshot.data(), id: snapshot.id }));
    return player;
  });

  players = await Promise.all(players).then((res) => res.flat());

  team = {
    ...team,
    players,
    games,
  };
  console.log(team);
  return team;
}
export default async function Page({ params }) {
  const { id } = params;
  const team = await getTeamData(params);

  let stats = team.games.reduce(
    (acc, curr) => ({
      points: acc.points + curr.points,
      assists: acc.assists + curr.assists,
      rebounds: acc.rebounds + curr.rebounds,
      blocks: acc.blocks + curr.blocks,
      steals: acc.steals + curr.steals,
    }),
    { points: 0, assists: 0, rebounds: 0, blocks: 0, steals: 0 }
  );

  const totalGames = team.games.length;
  let fgp = team.games.reduce(
    (acc, curr) => {
      return {
        made: acc.made + curr.threePoints.made + curr.twoPoints.made,
        attempt:
          acc.attempt + curr.twoPoints.attempt + curr.threePoints.attempt,
      };
    },
    { made: 0, attempt: 0 }
  );
  fgp =
    ((fgp.made / fgp.attempt) * 100).toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }) + "%";

  let threep = team.games.reduce(
    (acc, curr) => {
      return {
        made: acc.made + curr.threePoints.made,
        attempt: acc.attempt + curr.threePoints.attempt,
      };
    },
    { made: 0, attempt: 0 }
  );

  threep =
    ((threep.made / threep.attempt) * 100).toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }) + "%";

  let twop = team.games.reduce(
    (acc, curr) => {
      return {
        made: acc.made + curr.twoPoints.made,
        attempt: acc.attempt + curr.twoPoints.attempt,
      };
    },
    { made: 0, attempt: 0 }
  );

  twop =
    ((twop.made / twop.attempt) * 100).toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }) + "%";

  let ftp = team.games.reduce(
    (acc, curr) => {
      return {
        made: acc.made + curr.freeThrows.made,
        attempt: acc.attempt + curr.freeThrows.attempt,
      };
    },
    { made: 0, attempt: 0 }
  );

  ftp =
    ((ftp.made / ftp.attempt) * 100).toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }) + "%";

  stats = {
    ppg: (stats.points / totalGames).toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }),
    apg: (stats.assists / totalGames).toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }),
    rpg: (stats.rebounds / totalGames).toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }),
    bpg: (stats.blocks / totalGames).toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }),
    spg: (stats.steals / totalGames).toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }),
    fgp,
    twop,
    threep,
    ftp,
  };

  console.log(stats);
  return (
    <main className="px-8 py-4 sm:py-8 sm:px-16">
      <section className="relative flex flex-col items-center justify-between gap-4 md:flex-row">
        {/* Team Name */}
        <div className="flex flex-col items-center justify-center gap-2 md:items-start">
          <h1 className="text-2xl font-black sm:text-4xl text-primary">
            {team.teamName}
          </h1>
          <p className="font-light text-md sm:text-xl">{team.teamAbbr}</p>
          <h2 className="text-lg font-semibold">
            <span className="text-success">W {team.wins}</span>&nbsp; - &nbsp;
            <span className="text-danger">L {team.losses}</span>
          </h2>
        </div>
        {/* Stats */}
        <div className="grid w-full grid-cols-3 grid-rows-3 gap-2 md:w-1/2 place-self-center">
          <div className="flex flex-col items-center justify-center md:items-start">
            <h3 className="text-base sm:text-xl font-regular text-neutral-300">
              PPG
            </h3>
            <h2 className="text-xl font-bold sm:text-2xl">{stats.ppg}</h2>
          </div>
          <div className="flex flex-col items-center justify-center md:items-start">
            <h3 className="text-base sm:text-xl font-regular text-neutral-300">
              APG
            </h3>
            <h2 className="text-xl font-bold sm:text-2xl">{stats.apg}</h2>
          </div>
          <div className="flex flex-col items-center justify-center md:items-start">
            <h3 className="text-base sm:text-xl font-regular text-neutral-300">
              RPG
            </h3>
            <h2 className="text-xl font-bold sm:text-2xl">{stats.rpg}</h2>
          </div>
          <div className="flex flex-col items-center justify-center md:items-start">
            <h3 className="text-base sm:text-xl font-regular text-neutral-300">
              BPG
            </h3>
            <h2 className="text-xl font-bold sm:text-2xl">{stats.bpg}</h2>
          </div>
          <div className="flex flex-col items-center justify-center md:items-start">
            <h3 className="text-base sm:text-xl font-regular text-neutral-300">
              SPG
            </h3>
            <h2 className="text-xl font-bold sm:text-2xl">{stats.spg}</h2>
          </div>
          <div className="flex flex-col items-center justify-center md:items-start">
            <h3 className="text-base sm:text-xl font-regular text-neutral-300">
              FG%
            </h3>
            <h2 className="text-xl font-bold sm:text-2xl">{stats.fgp}</h2>
          </div>
          <div className="flex flex-col items-center justify-center md:items-start">
            <h3 className="text-base sm:text-xl font-regular text-neutral-300">
              2P%
            </h3>
            <h2 className="text-xl font-bold sm:text-2xl">{stats.twop}</h2>
          </div>
          <div className="flex flex-col items-center justify-center md:items-start">
            <h3 className="text-base sm:text-xl font-regular text-neutral-300">
              3P%
            </h3>
            <h2 className="text-xl font-bold sm:text-2xl">{stats.threep}</h2>
          </div>
          <div className="flex flex-col items-center justify-center md:items-start">
            <h3 className="text-base sm:text-xl font-regular text-neutral-300">
              FTP
            </h3>
            <h2 className="text-xl font-bold sm:text-2xl">{stats.ftp}</h2>
          </div>
        </div>
      </section>
    </main>
  );
}
