"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Avatar, Link, Spinner } from "@nextui-org/react";
import { firestore } from "@/lib/firebase/firebase";
import { getGamesByPage } from "@/utils/gamesAPI";
import GamesTable from "@/components/client/games/gamesTable";
import GamePagination from "@/components/client/games/gamePagination";

export default function GamesDisplay({ page, name }) {
  const [games, setGames] = useState([]);
  const [count, setCount] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (name) {
      // Implement search by game name
    }

    let games = await getGamesByPage(page - 1, 10).then((snapshot) =>
      snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        time: doc.data().time.toDate(),
      }))
    );
    let teams = games.map(async (game) => {
      const teamA = await firestore
        .collection("teams")
        .doc(game.teamA.id)
        .get()
        .then((doc) => ({ id: doc.id, ...doc.data() }));

      const teamB = await firestore
        .collection("teams")
        .doc(game.teamB.id)
        .get()
        .then((doc) => ({ id: doc.id, ...doc.data() }));

      return {
        ...game,
        teamA: { ...game.teamA, data: teamA },
        teamB: { ...game.teamB, data: teamB },
      };
    });
    games = await Promise.all(teams);

    const leagues = games.map(async (game) => {
      return await firestore
        .collection("leagues")
        .doc(game.leagueId)
        .get()
        .then((doc) => ({ ...game, league: doc.data() }));
    });

    games = await Promise.all(leagues);
    const count = await firestore
      .collection("counters")
      .doc("games")
      .get()
      .then((doc) => doc.data().size);

    return [[...games], count];
  }, [name, page]);

  useEffect(() => {
    try {
      fetchData()
        .then((res) => {
          const [games, counts] = res;
          setGames(games);
          setCount(counts);
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

  return (
    <>
      {!games ? (
        <main className="flex items-center justify-center w-screen h-screen">
          <Spinner label="Loading..." color="primary" />
        </main>
      ) : (
        <main>
          <div className="px-8 mt-4 mb-2 sm:px-16 sm:mt-8">
            <h1 className="text-xl font-bold sm:text-2xl">Games</h1>
          </div>

          <section>
            {/* Search bar */}
            <div></div>
            {/* Data Display for games */}
            <div className="px-8 sm:px-16">
              <GamesTable games={games} loading={loading}  />
            </div>
            <div className="flex items-center justify-center my-2">
              <GamePagination
                total={Math.ceil(count / 5)}
                initialPage={page || 1}
              />
            </div>
          </section>
        </main>
      )}
    </>
  );
}
