import { firestore } from "@/lib/firebase/firebase";

// CREATE PLAYERS
export async function createPlayer(player) {
  return await firestore.collection("players").add(player);
}

// READ PLAYERS
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

export async function getPlayerByLikeName(name) {
  return await firestore
    .collection("players")
    .orderBy("lastname")
    .startAt(name)
    .endAt(name + "\uf8ff")
    .get();
}

// UPDATE PLAYERS
export async function updatePlayer(id, data){
  return await firestore.collection("players").doc(id).update(data);
}

// DELETE PLAYERS
export async function deletePlayer(id){
  return await firestore.collection("players").doc(id).delete();
}
