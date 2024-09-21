import { firestore } from "@/lib/firebase/firebase";
import {
  collection,
  setDoc,
  Timestamp,
  doc,
  query,
  startAfter,
  getDoc,
  limit,
  orderBy as sort,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
const db = firestore;

// CREATE PLAYERS
export async function createPlayer(player) {
  player.createdAt = new Date().toISOString();
  player.updatedAt = new Date().toISOString();

  const playerCollection = collection(db, "players");

  await setDoc(doc(playerCollection), player);
}

// READ PLAYERS
// limit = 10
// page = 1
export async function getPlayersByPage(
  page,
  limitPerPage,
  sortBy = "lastname"
) {

  const playersCollection = collection(db, "players");
  const res = await getDocs(query(
    playersCollection,
    sort(sortBy),
    limit(limitPerPage),
    startAfter(page * limitPerPage)
  ))
  console.log(page+2, res)
  return res
}

export async function getAllPlayers() {
  return await collection(db, "players").get();
}

export async function getPlayerById(id) {
  return await getDoc(doc(collection(db, "players"), id));
}

export async function getPlayerByLikeName(name) {
  // Capitalize first letter of name for search
  name = name.replace(/\b\w/g, (l) => l.toUpperCase());

  const firstNameQuery = await firestore
    .collection("players")
    .orderBy("firstname")
    .where("firstname", ">=", name)
    .where("firstname", "<=", name + "\uf8ff")
    .limit(10)
    .get();

  const lastNameQuery = await firestore
    .collection("players")
    .orderBy("lastname")
    .where("lastname", ">=", name)
    .where("lastname", "<=", name + "\uf8ff")
    .limit(10)
    .get();

  const results = [];

  firstNameQuery.forEach((doc) => {
    results.push(doc);
  });

  lastNameQuery.forEach((doc) => {
    if (!results.some((result) => result.id === doc.id)) {
      results.push(doc);
    }
  });

  return results;
}

export async function getPlayerGamerecords(id) {
  const playersCollection = collection(db, "players");
  const playerDoc = doc(playersCollection, id);
  const playerRecords = await getDocs(collection(playerDoc, "gameRecords")).then((snap) => snap.docs.map(doc => ({...doc.data, gameId: doc.id})));
  return playerRecords
}

export async function getPlayersGameRecords(players) {
  const promises = players.map(async (player) => {
    return {
      ...player,
      gameRecords: await getPlayerGamerecords(player.id),
    };
  });
  return await Promise.all(promises);
}

// UPDATE PLAYERS
export async function updatePlayer(id, data) {
  data.updatedAt = new Date().toISOString();

  return await updateDoc(doc(collection(db, "players"), id), data);
}

// DELETE PLAYERS
export async function deletePlayer(id) {
  // return await firestore.collection("players").doc(id).delete();
  return await deleteDoc(doc(collection(db, "players"), id))
}
