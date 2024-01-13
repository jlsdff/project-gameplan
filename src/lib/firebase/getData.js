import { firestore } from "./firebase";

// GET ALL PLAYERS
async function getPlayers(limit, startAfter) {
  const count = limit || 10;
  let error;

  const players = await firestore
    .collection("players")
    .orderBy("firstname")
    .limit(count)
    .startAfter(startAfter ? startAfter : 0)
    .get()
    .then((querySnapshot) => {
      let players = [];
      querySnapshot.forEach((doc) => {
        players.push({ id: doc.id, ...doc.data() });
      });
      return players;
    })
    .catch((err) => {
      console.log("Error getting documents: ", error);
      error = err;
    });
  return error ? error : players;
}

// GET PLAYER BY ID
async function getPlayer(id) {
  let error;

  const player = await firestore
    .collection("players")
    .doc(id)
    .get()
    .then((doc) => {
      return doc.data();
    })
    .catch((err) => {
      console.log("Error getting document:", error);
      error = err;
    });
  return error ? error : player;
}

// GET PLAYER BY LIKE NAME
async function getPlayerByLikeName(name, startAfter) {
  let error;

  const player = await firestore
    .collection("players")
    .where("firstname", ">=", name)
    .where("firstname", "<=", name + "\uf8ff")
    .where("lastname", ">=", name)
    .where("lastname", "<=", name + "\uf8ff")
    .startAfter(startAfter ? startAfter : 0)
    .get()
    .then((querySnapshot) => {
      let players = [];
      querySnapshot.forEach((doc) => {
        players.push(doc.data());
      });
      return players;
    })
    .catch((err) => {
      console.log("Error getting document:", error);
      error = err;
    });

  return error ? error : player;
}

export { getPlayers, getPlayer, getPlayerByLikeName };
