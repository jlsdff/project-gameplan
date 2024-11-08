import { firestore, Timestamp, firebase } from "@/lib/firebase/firebase"

export async function getByPath(path) {

  return await firestore.doc(path).get()
  
}

export async function createPlayerToTeam(player, team) {

  return await firestore.runTransaction( async (transaction) => {

    const playerRef = firestore.collection("players").doc()
    transaction.set(playerRef, {
      ...player,
      createdAt: Timestamp.now(),
      updateAt: Timestamp.now()
    })
    
    transaction.update(team.ref.ref, {
      players: firebase.firestore.FieldValue.arrayUnion(playerRef.id)
    })

    return playerRef

  })
  
  
}