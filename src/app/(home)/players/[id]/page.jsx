import { notFound } from "next/navigation";
import { firestore } from "@/lib/firebase/firebase";
import Player from "@/pages/players/Player";

async function getData({ id, searchParams }) {
  
  const player = await firestore.collection("players").doc(id).get().then(res => {
    if (res.exists) {
      return JSON.stringify({id: res.id, ...res.data()})
    } else {
      notFound();
    }
  })

  let games = await firestore
    .collection("games")
    .where("players", "array-contains", id)
    .get()
  games = games.docs.map((doc) => ({id:doc.id, ...doc.data()}));
  games = games.map( game => ({
    ...game,
    date: game.date.toDate(),
    time: game.time.toDate()
  }))
  
  const data = {
    player,
    games
  }
  console.log("Data: ", data)
  return data
}

export default async function Page({ params, searchParams }) {
  const { id } = params;

  const data = await getData({ id, searchParams });
  console.log("Data: ", data)

  return (
      <Player data={data} />
  );
}
