import React, { useCallback, useState, useEffect } from "react";

import { firestore } from "@/lib/firebase/firebase";
import {
  Image,
  User,
  ScrollShadow,
  Divider,
  Link,
  Spinner,
} from "@heroui/react";
import RecentGameTable from "@/components/client/teams/recentGameTable";
import { Helmet } from "react-helmet";

export default function TeamPage({ id }) {
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
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

    let games = await firestore
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

    games = games.map(async (game) => {
      const data = await firestore
        .collection("games")
        .doc(game.id)
        .get()
        .then((res) => ({ id: res.id, ...res.data() }));
      const teamA = await firestore
        .collection("teams")
        .doc(data.teamA.id)
        .get()
        .then((res) => ({ id: res.id, ...res.data() }));
      const teamB = await firestore
        .collection("teams")
        .doc(data.teamB.id)
        .get()
        .then((res) => ({ id: res.id, ...res.data() }));

      return {
        ...game,
        data: {
          ...data,
          teamA: { ...data.teamA, data: teamA },
          teamB: { ...data.teamB, data: teamB },
          time: data.time.toDate(),
        },
      };
    });

    games = await Promise.all(games).then((res) => res.flat());

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
    // console.log(team);
    return team;
  }, [id]);

  useEffect(() => {
    try {
      fetchData()
        .then((res) => {
          setTeam(res);
        })
        .catch((error) => {
          throw new Error(error);
        });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [fetchData]);

  let stats = team && team.games.reduce(
    (acc, curr) => ({
      points: acc.points + curr.points,
      assists: acc.assists + curr.assists,
      rebounds: acc.rebounds + curr.rebounds,
      blocks: acc.blocks + curr.blocks,
      steals: acc.steals + curr.steals,
    }),
    { points: 0, assists: 0, rebounds: 0, blocks: 0, steals: 0 }
  );

  const totalGames = team && team.games.length;
  let fgp = team && team.games.reduce(
    (acc, curr) => {
      return {
        made: acc.made + curr.threePoints.made + curr.twoPoints.made,
        attempt:
          acc.attempt + curr.twoPoints.attempt + curr.threePoints.attempt,
      };
    },
    { made: 0, attempt: 0 }
  );
  fgp = team &&
    ((fgp.made / fgp.attempt) * 100).toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }) + "%";

  let threep = team && team.games.reduce(
    (acc, curr) => {
      return {
        made: acc.made + curr.threePoints.made,
        attempt: acc.attempt + curr.threePoints.attempt,
      };
    },
    { made: 0, attempt: 0 }
  );

  threep = team &&
    ((threep.made / threep.attempt) * 100).toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }) + "%";

  let twop = team && team.games.reduce(
    (acc, curr) => {
      return {
        made: acc.made + curr.twoPoints.made,
        attempt: acc.attempt + curr.twoPoints.attempt,
      };
    },
    { made: 0, attempt: 0 }
  );

  twop = team &&
    ((twop.made / twop.attempt) * 100).toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }) + "%";

  let ftp = team && team.games.reduce(
    (acc, curr) => {
      return {
        made: acc.made + curr.freeThrows.made,
        attempt: acc.attempt + curr.freeThrows.attempt,
      };
    },
    { made: 0, attempt: 0 }
  );

  ftp = team &&
    ((ftp.made / ftp.attempt) * 100).toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }) + "%";

  stats = team && {
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

  return (
    <>
      <Helmet>
        <title>{team ? team.teamName : "Team"} | Team</title>
        <meta name="description" content={team ? `Stats and Recent Games for ${team?.teamName}` : "Stats and Recent Games"} />
        <meta name="keywords" content={team ? `${team?.teamName}, ${team?.teamAbbr}, ${team?.teamName} stats, ${team?.teamName} recent games` : "team, stats, recent games"} />
      </Helmet>
      {!team ? (
        <main className="flex items-center justify-center w-screen h-screen">
          <Spinner label="Loading..." />
        </main>
      ) : (
        <main className="px-8 py-4 sm:py-8 sm:px-16">
          {/* TEAM NAME AND AVERAGE STATS */}
          <section className="relative flex flex-col items-center justify-between gap-4 md:flex-row">
            {/* Team Name */}
            <div className="flex flex-col items-center justify-center gap-2 md:items-start">
              <h1 className="text-2xl font-black sm:text-4xl text-primary">
                {team.teamName}
              </h1>
              <p className="font-light text-md sm:text-xl">{team.teamAbbr}</p>
              <h2 className="text-lg font-semibold">
                <span className="text-success">W {team.wins || 0}</span>&nbsp; -
                &nbsp;
                <span className="text-danger">L {team.losses || 0}</span>
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
                <h2 className="text-xl font-bold sm:text-2xl">
                  {stats.threep}
                </h2>
              </div>
              <div className="flex flex-col items-center justify-center md:items-start">
                <h3 className="text-base sm:text-xl font-regular text-neutral-300">
                  FTP
                </h3>
                <h2 className="text-xl font-bold sm:text-2xl">{stats.ftp}</h2>
              </div>
            </div>
          </section>
          {/*  */}
          <section className="flex flex-col items-start justify-start gap-2 md:flex-row">
            <div className="w-full mt-4 md:max-w-60 md:h-96 ">
              <h2 className="text-xl font-bold">Players</h2>
              <ScrollShadow hideScrollBar className="flex-col gap-2 mt-2 h-96 ">
                {team.players.map((player) => (
                  <Link
                    className="w-full hover:underline"
                    key={player.id}
                    href={`/players/${player.id}`}
                  >
                    <User
                      className="justify-start cursor-pointer text-foreground "
                      name={player.lastname}
                      description={player.positions?.join(" | ") || ""}
                    />
                  </Link>
                ))}
              </ScrollShadow>
            </div>
            {/* RECENT GAMES */}
            <ScrollShadow
              id="recent-games"
              className="w-full mt-4 overflow-x-scroll h-96"
            >
              <h2 className="text-xl font-bold">Recent Games</h2>
              <RecentGameTable games={team.games} teamId={id} loading={loading} />
            </ScrollShadow>
          </section>
        </main>
      )}
    </>
  );
}
