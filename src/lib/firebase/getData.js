import { firestore } from "./firebase";

async function getPlayers(limit) {
  const count = limit || 10;
  let error;

  const players = await firestore
    .collection("players")
    .get()
    .then((querySnapshot) => {
      let players = [];
      querySnapshot.forEach((doc) => {
        players.push(doc.data());
      });
      return players;
    })
    .catch((err) => {
      console.log("Error getting documents: ", error);
      error = err;
    });
  return error ? error : players;
}

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

async function getPlayersByTeam(team) {
  let error;
  const players = await firestore
    .collection("players")
    .where("team", "==", team)
    .get()
    .then((querySnapshot) => {
      let players = [];
      querySnapshot.forEach((doc) => {
        players.push(doc.data());
      });
      return players;
    })
    .catch((err) => {
      console.log("Error getting documents: ", error);
      error = err;
    });
  return error ? error : players;
}

export { getPlayers, getPlayer };
