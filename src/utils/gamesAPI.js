import { firestore, Timestamp, FieldValue } from "@/lib/firebase/firebase";

export const createGame = async (gameData) => {

  const { month , day, year } = gameData.gameTime;
  const date = new Date(year, month, day);
  gameData.gameTime = Timestamp.fromDate(date);

  const winloss =
    gameData.teamAStats.points > gameData.teamBStats.points
      ? {winner: gameData.teamA.id, loser: gameData.teamB.id}
      : {winner: gameData.teamB.id, loser: gameData.teamA.id};
  firestore
    .collection("teams")
    .doc(winloss.winner)
    .update({ wins: FieldValue.increment(1) }, {merge: true});
  firestore
    .collection("teams")
    .doc(winloss.loser)
    .update({ losses: FieldValue.increment(1) }, {merge: true});
  try {
    const playerStats = [...gameData.stats.teamA, ...gameData.stats.teamB];

    const persistPlayerStats = playerStats.map((player) => {
      return firestore
        .collection("players")
        .doc(player.id)
        .collection("gameRecords")
        .doc(gameData.doc)
        .set(player, { merge: true });
    });

    const persistTeamAStats = firestore
      .collection("teams")
      .doc(gameData.teamA.id)
      .collection("gameRecords")
      .doc(gameData.doc)
      .set(gameData.teamAStats, { merge: true });

    const persistTeamBStats = firestore
      .collection("teams")
      .doc(gameData.teamB.id)
      .collection("gameRecords")
      .doc(gameData.doc)
      .set(gameData.teamBStats, { merge: true });

    const persisGame = firestore
      .collection("games")
      .doc(gameData.doc)
      .set({
        doc: gameData.doc,
        number: +gameData.gameNumber,
        time: null,
        date: gameData.gameTime,
        leagueId: gameData.league.id,
        playerStats: gameData.stats,
        teamA: {
          id: gameData.teamA.id,
          stats: gameData.teamAStats,
        },
        teamB: {
          id: gameData.teamB.id,
          stats: gameData.teamBStats,
        },
      });
    firestore
      .collection("counters")
      .doc("games")
      .update({ size: FieldValue.increment(1) });
    return await Promise.all([
      ...persistPlayerStats,
      persistTeamAStats,
      persistTeamBStats,
      persisGame,
    ]);
  } catch (error) {
    console.error(error);
  }
};

export const getGameByDoc = async (doc) => {
  return await firestore
    .collection("games")
    .doc(doc)
    .get()
    .then((res) => {
      return {
        id: res.id,
        ...res.data(),
      };
    });
};

export const getGamesByDocs = async (docs) => {
  const games = docs.map(async (doc) => {
    return await getGameByDoc(doc);
  });

  return await Promise.all(games);
};

export const getGamesByPage = async (page, limit, orderBy = "date") => {
  let lastDoc = null;

  if (page > 0) {
    const games = await firestore
      .collection("games")
      .orderBy(orderBy, "desc")
      .limit(page * limit)
      .get();

    lastDoc = games.docs[games.docs.length - 1];
  }

  let query = firestore.collection("games").orderBy(orderBy, "desc").limit(limit);

  if (lastDoc) {
    query = query.startAfter(lastDoc);
  }

  return await query.get();
};
