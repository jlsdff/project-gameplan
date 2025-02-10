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
    .then((snapshot) => snapshot.docs.map((doc) => doc.data()))
    .then( games => JSON.stringify(games));

  player = JSON.stringify({id: player.id, ...player.data()});

  return { player: player, games: games };
}

export default async function Page({ params, searchParams }) {
  const { id } = params;

  const data = await getData({ id, searchParams });

  return (
    <Player
      data={{
        player: JSON.parse(data.player),
        games: JSON.parse(data.games),
      }}
    />
  );
}
