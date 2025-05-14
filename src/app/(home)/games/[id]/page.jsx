import GamePage from "@/components/client/games/gamePage";
import { firestore } from "@/lib/firebase/firebase";
import { notFound } from "next/navigation";

export async function generateMetadata(props) {
  const params = await props.params;

  const game = await firestore.collection("games").doc(params.id).get();

  if (!game.exists) {
    notFound();
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

  let potg = game.data().playerOfTheGame

  if (potg) {

    const player = await firestore
      .collection("players")
      .doc(potg)
      .get()
      .then(doc => ({ id: doc.id, ...doc.data() }))

    const stats = [...game.data().playerStats.teamA, ...game.data().playerStats.teamB]
    const potgStats = stats.find(player => player.id === potg)

    potg = {
      name: `${player.firstname} ${player.lastname}`.trim(),
      points: (potgStats.twoPointsMade * 2) + (potgStats.threePointsMade * 3) + potgStats.freeThrowsMade,
      assists: potgStats.assists,
      rebounds: potgStats.rebounds,
      steals: potgStats.steals,
      blocks: potgStats.blocks,
      twoPointsMade: potgStats.twoPointsMade,
      twoPointsAttempted: potgStats.twoPointsAttempted,
      threePointsMade: potgStats.threePointsMade,
      threePointsAttempted: potgStats.threePointsAttempted,
      freeThrowsMade: potgStats.freeThrowsMade,
      freeThrowsAttempted: potgStats.freeThrowsAttempted
    }

    let potgParams = []
    Object.entries(potg).forEach(([key, value]) => {
      const partner = `${key}=${value}`
      potgParams.push(partner)
    })
    potgParams = potgParams.join("&")
    potg = potgParams;
    console.log("POTG SEARCH PARAMETERS: ", potgParams)

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

  const base_url = `/api/image/game?teamA=${teamA.teamAbbr ? teamA.teamAbbr : teamA.teamName.substring(0, 2)}&teamB=${teamB.teamAbbr ? teamB.teamAbbr : teamB.teamName.substring(0, 2)}&teamAScore=${data.teamA.stats.points}&teamBScore=${data.teamB.stats.points}`
  const imageUrl = potg ? base_url + "&" + potg : base_url;

  return {
    title: `${teamA.teamName} vs ${teamB.teamName}`,
    description: `Final Score: ${teamA.teamName}-${data.teamA.stats.points} vs ${teamB.teamName}-${data.teamB.stats.points}`,
    openGraph: {
      images: [
        imageUrl
      ]
    },
  };
}

export default async function Page(props) {
  const params = await props.params;
  return <GamePage id={params.id} />;
}
