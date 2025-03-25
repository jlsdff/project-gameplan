import { notFound } from "next/navigation";
import { firestore } from "@/lib/firebase/firebase";
import Player from "@/pages/players/Player";
import { getStats } from "@/helpers/players/statsHelpers";

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
  // if (league) {
  //   games = games.where("league", "==", league);
  // }
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

  return {
    player: player,
    games: JSON.stringify(games),
    leagues: JSON.stringify(leagues),
  };
}

export async function generateMetadata({ params, searchParams }) {
  const { league } = searchParams;
  const { id } = params;

  const player = await firestore.collection("players").doc(id).get();
  if (!player.exists) {
    notFound();
  }
  const name = player.data().firstname
    ? `${player.data().lastname}, ${player.data().firstname}`
    : `${player.data().lastname}`;

  let games = firestore
    .collection("games")
    .where("players", "array-contains", id);
  if (league) {
    games.where("leagueId", "==", league);
  }
  games = await games
    .get()
    .then((snapshot) =>
      snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );

  if (games.length === 0) {
    return {
      title: name,
    };
  }
  const { ppg, apg, rpg, bpg, spg, fgp, twoPG, threePG, ftp } = getStats(
    id,
    games
  );

  return {
    title: name,
    openGraph: {
      images: [
        `/api/image/player?name=${name}&ppg=${ppg}&apg=${apg}&rpg=${rpg}&bpg=${bpg}&spg=${spg}&fgp=${fgp}&twoPG=${twoPG}&threePG=${threePG}&ftp=${ftp}`,
      ],
    },
  };
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
          leagues: JSON.parse(data.leagues),
        }}
      />
    </>
  );
}
