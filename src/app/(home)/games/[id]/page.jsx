import GamePage from "@/components/client/games/gamePage";
import { firestore } from "@/lib/firebase/firebase";
import { notFound } from "next/navigation";

export async function generateMetadata({ params, searchParams }) {
  const game = await firestore.collection("games").doc(params.id).get();

  if (!game.exists) {
    notFound();
    return;
  }

  let teamA = (await game.data().teamA.id) ?? null;
  let teamB = (await game.data().teamB.id) ?? null;

  if (teamA && teamB) {
    teamA = await firestore
      .collection("teams")
      .doc(teamA)
      .get()
      .then((res) => res.data());
    teamB = await firestore
      .collection("teams")
      .doc(teamB)
      .get()
      .then((res) => res.data());
  }

  const data = {
    teamA: {
      teamName: teamA.teamName,
      stats: game.data().teamA.stats
    },
    teamB: {
      teamName: teamB.teamName,
      stats: game.data().teamB.stats
    },
  }


  return {
    title: `${teamA.teamName} vs ${teamB.teamName}`,
    description: `${teamA.teamName} vs ${teamB.teamName}`,
    openGraph: {
      images: [
        "/api/image/game?id=1"
      ]
    },
  };
}

export default function Page({ params }) {
  return <GamePage id={params.id} />;
}
