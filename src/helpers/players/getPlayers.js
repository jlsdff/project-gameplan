import { firestore } from "@/lib/firebase/firebase";

export async function getPlayersByPage(page, limit, orderBy = "lastname") {
  return await firestore
    .collection("players")
    .orderBy(orderBy, "asc")
    .limit(limit)
    .startAfter(page * limit)
    .get();
}

export async function getAllPlayers() {
  return await firestore.collection("players").get();
}

export async function getPlayerById(id) {
  return await firestore.collection("players").doc(id).get();
}
