import React, { useCallback, useEffect, useState } from "react";
import { firestore } from "@/lib/firebase/firebase";
import { Image, Card, Spinner } from "@nextui-org/react";
import GameTabs from "@/components/client/games/gameTabs";
import GameStats from "@/components/client/games/gameStats";
import { Helmet } from "react-helmet";

export default function GamePage({ id }) {
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    let game = await firestore
      .collection("games")
      .doc(id)
      .get()
      .then((doc) => ({
        id: doc.id,
        ...doc.data(),
        time: doc.data().time.toDate(),
      }));

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

    game = {
      ...game,
      teamA: { ...game.teamA, data: teamA },
      teamB: { ...game.teamB, data: teamB },
    };

    const teamAPlayers = game.playerStats.teamA.map(async (player) => {
      return await firestore
        .collection("players")
        .doc(player.id)
        .get()
        .then((doc) => ({ ...player, data: doc.data() }));
    });

    game = {
      ...game,
      playerStats: {
        teamA: await Promise.all(teamAPlayers),
        teamB: game.playerStats.teamB,
      },
    };

    const teamBPlayers = game.playerStats.teamB.map(async (player) => {
      return await firestore
        .collection("players")
        .doc(player.id)
        .get()
        .then((doc) => ({ ...player, data: doc.data() }));
    });

    game = {
      ...game,
      playerStats: {
        teamA: game.playerStats.teamA,
        teamB: await Promise.all(teamBPlayers),
      },
    };

    return game;
  }, [id]);

  useEffect(() => {
    try {
      fetchData()
        .then((res) => setGame(res))
        .catch((error) => {
          throw new Error(error);
        });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [fetchData]);
  
  const renderScore = (curr, oppo) => {
    if (curr.stats.points > oppo.stats.points) {
      return <span className="text-success">{curr.stats.points}</span>;
    } else {
      return <span className="text-danger">{curr.stats.points}</span>;
    }
  };

  return (
    <>
      <Helmet>
        <title>{game ? `${game.teamA.data.teamName} vs ${game.teamB.data.teamName}` : "Game"}</title>
        <meta
          name="description"
          content={game ? `Game between ${game.teamA.data.teamName} and ${game.teamB.data.teamName}` : "Game"}
        />
        <meta 
          name="keywords"
          content={game ? `${game.teamA.data.teamName}, ${game.teamB.data.teamName}, game, project:gameplan` : "game"}
        />
      </Helmet>
      {!game ? (
        <main className="flex items-center justify-center w-screen h-screen">
          <Spinner label="Loading..." color="primary" />
        </main>
      ) : (
        <main>
          <section className="px-8 sm:px-16">
            <div className="flex items-center justify-center gap-2 sm:gap-4">
              <div className="flex flex-col items-center justify-center ">
                <div className="flex flex-col items-center justify-center gap-3">
                  <div className="max-w-sm ">
                    <Image
                      className="object-contain aspect-square"
                      src={game.teamA.data.teamLogo}
                      alt={game.teamA.data.teamName}
                    />
                  </div>
                  <h2 className="mt-2 text-lg font-semibold sm:text-xl">
                    {game.teamA.data.teamName}
                  </h2>
                </div>
                <h2 className="text-2xl font-black sm:text-3xl">
                  {renderScore(game.teamA, game.teamB)}
                </h2>
              </div>
              <h3 className="text-lg font-medium">VS</h3>
              <div className="flex flex-col items-center justify-start">
                <div className="flex flex-col items-center justify-center">
                  <div className="max-w-sm ">
                    <Image
                      className="object-contain aspect-square"
                      src={game.teamB.data.teamLogo}
                      alt={game.teamB.data.teamName}
                    />
                  </div>
                  <h2 className="mt-2 text-lg font-semibold sm:text-xl">
                    {game.teamB.data.teamName}
                  </h2>
                </div>
                <h2 className="text-2xl font-black sm:text-3xl">
                  {renderScore(game.teamB, game.teamA)}
                </h2>
              </div>
            </div>
          </section>
          <section className="flex flex-col items-start justify-start gap-3 px-8 my-4 sm:flex-row sm:px-16">
            <Card className="w-full sm:max-w-[250px] shrink-0">
              <GameStats teamA={game.teamA} teamB={game.teamB} />
            </Card>
            <div className="w-full grow-1">
              <GameTabs game={game} />
            </div>
          </section>
        </main>
      )}
    </>
  );
}
