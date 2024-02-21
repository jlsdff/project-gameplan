import { firestore } from "@/lib/firebase/firebase";

export async function newPlayer(player) {
  return await firestore.collection("players").add(player);
}
