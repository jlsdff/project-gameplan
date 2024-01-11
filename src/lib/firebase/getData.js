import { auth, firestore } from "./firebase";

async function getPlayers(){
  const players = await firestore.collection("players").get()
    .then(
      (querySnapshot) => {
        let players = []
        querySnapshot.forEach((doc) => {
          players.push(doc.data())
        })
        return players
      }
    )
    .catch(
      (error) => {
        console.log("Error getting documents: ", error);
      }
    )
  return players
}

export { getPlayers }