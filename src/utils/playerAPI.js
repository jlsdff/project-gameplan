import { firestore } from "@/lib/firebase/firebase";

// CREATE PLAYERS
export async function createPlayer(player) {
  player.createdAt = new Date().toISOString();
  player.updatedAt = new Date().toISOString();

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
    .where("firstname", ">=", name)
    .where("firstname", "<=", name + "\uf8ff")
    .get();

  const lastNameQuery = await firestore
    .collection("players")
    .orderBy("lastname")
    .where("lastname", ">=", name)
    .where("lastname", "<=", name + "\uf8ff")
    .get();

  const results = []

  firstNameQuery.forEach(doc => {
    results.push(doc);
  })

  lastNameQuery.forEach( doc => {
    if(!results.some( result => result.id === doc.id)) {
      results.push(doc);
    }
  })

  return results;

}

// UPDATE PLAYERS
export async function updatePlayer(id, data) {
  data.updatedAt = new Date().toISOString();

  return await firestore
    .collection("players")
    .doc(id)
    .update(data, { merge: true });
}

// DELETE PLAYERS
export async function deletePlayer(id) {
  return await firestore.collection("players").doc(id).delete();
}
