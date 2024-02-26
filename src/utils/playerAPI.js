import { firestore } from "@/lib/firebase/firebase";

// CREATE PLAYERS
export async function createPlayer(player) {
  return await firestore.collection("players").add(player);
}

// READ PLAYERS
export async function getPlayersByPage(page, limit, orderBy = "lastname") {
  let lastDoc = null;

  if (page > 0) {
    const snapshot = await firestore
      .collection("players")
      .orderBy(orderBy, "asc")
      .limit(page * limit)
      .get();

    lastDoc = snapshot.docs[snapshot.docs.length - 1];
  }

  let query = firestore
    .collection("players")
    .orderBy(orderBy, "asc")
    .limit(limit);

  if (lastDoc) {
    query = query.startAfter(lastDoc);
  }

  return await query.get();
}

export async function getAllPlayers() {
  return await firestore.collection("players").get();
}

export async function getPlayerById(id) {
  return await firestore.collection("players").doc(id).get();
}

export async function getPlayerByLikeName(name) {
  const firstNameQuery = await firestore
    .collection("players")
    .orderBy("firstname")
    .startAt(name)
    .endAt(name + "\uf8ff")
    .get()

  const lastNameQuery = await firestore
    .collection("players")
    .orderBy("lastname")
    .startAt(name)
    .endAt(name + "\uf8ff")
    .get()

    
  return [...firstNameQuery.docs, ...lastNameQuery.docs];
}

// UPDATE PLAYERS
export async function updatePlayer(id, data) {
  return await firestore.collection("players").doc(id).update(data);
}

// DELETE PLAYERS
export async function deletePlayer(id) {
  return await firestore.collection("players").doc(id).delete();
}
