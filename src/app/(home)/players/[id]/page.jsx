import { notFound } from "next/navigation";
import { firestore } from "@/lib/firebase/firebase";
import Player from "@/pages/players/Player";

async function getData({ id, searchParams }) {
  const { league } = searchParams;
  let player = await firestore.collection("players").doc(id).get();
  if (!player.exists) {
    notFound();
  }

  // GET GAMES
  let games = firestore
    .collection("games")
    .where("players", "array-contains", id);
  if (league) {
    games = games.where("league", "==", league);
  }
  games = await games
    .get()
    .then((snapshot) => snapshot.docs.map((doc) => doc.data()));

  // GET LEAGUES
  let leagues = [];
  games.forEach((game) => {
    if (!leagues.includes(game.leagueId)) {
      leagues.push(game.leagueId);
    }
  });
  if (leagues.length > 0) {
    leagues = await Promise.all(
      leagues.map(async (leagueId) => {
        const league = await firestore
          .collection("leagues")
          .doc(leagueId)
          .get();
        return { id: leagueId, ...league.data() };
      })
    );
  }

  player = JSON.stringify({ id: player.id, ...player.data() });

  return { player: player, games: JSON.stringify(games), leagues: JSON.stringify(leagues) };
}

export default async function Page({ params, searchParams }) {
  const { id } = params;

  const data = await getData({ id, searchParams });

  return (
    <>
      <Player
        data={{
          player: JSON.parse(data.player),
          games: JSON.parse(data.games),
          leagues: JSON.parse(data.leagues)
        }}
      />
    </>
  );
}
