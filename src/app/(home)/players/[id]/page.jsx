import { notFound } from "next/navigation";
import { firestore } from "@/lib/firebase/firebase";
import Player from "@/pages/players/Player";
import { getStats } from "@/helpers/players/statsHelpers";
import PlayerWrapper, { FetchLayer } from "@/pages/players/PlayerWrapper";
import PlayerProvider from "@/providers/playerProvider"

export async function generateMetadata(props) {
  const searchParams = await props.searchParams;
  const params = await props.params;
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
    games = games.where("leagueId", "==", league);
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

 
export default async function Page() {
  
  return (
    <>
      <PlayerWrapper>
        <PlayerProvider>
          <FetchLayer>
            <Player />
          </FetchLayer>
        </PlayerProvider>
      </PlayerWrapper>
    </>
  );
}
