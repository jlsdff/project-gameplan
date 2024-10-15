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
  return await firestore
    .collection("players")
    .doc(id)
    .collection("gameRecords")
    .get()
    .then((snap) =>
      snap.docs.map((doc) => ({ ...doc.data(), gameId: doc.id }))
    );
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

  return await firestore
    .collection("players")
    .doc(id)
    .update(data, { merge: true });
}

// DELETE PLAYERS
export async function deletePlayer(id) {
  return await firestore.collection("players").doc(id).delete();
}

export async function getLastPlayedTeam(playerId) {
  const lastGame = await firestore
    .collection("games")
    .where("players", "array-contains", playerId)
    .orderBy("date", "desc")
    .limit(1)
    .get()
    .then((snap) => snap.docs[0]);
  
  if (!lastGame) {
    return null;
  }
  console.log(lastGame)
  const teamId = findCurrentTeam(playerId, lastGame.data());

  const team = await firestore
    .collection("teams")
    .doc(teamId)
    .get()
    .then((doc) => ({ id: doc.id, ...doc.data() }));

  return team;
}

function findCurrentTeam(playerId, game) {
  const teamA = game.playerStats.teamA;

  return teamA.some((player) => player.id === playerId)
    ? game.teamA.id
    : game.teamB.id;
}
