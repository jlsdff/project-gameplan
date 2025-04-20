import { firestore, Timestamp, FieldValue } from "@/lib/firebase/firebase";
import { getTeamById } from "./teamAPI";
import { getLocalTimeZone } from "@internationalized/date";

class CustomError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

// HELPER FUNCTIONS
export const testGame = async (gameData) => {
  g;
};

export const loadTeam = async (teams) => {
  const snap = await Promise.all(
    teams.map(async (id) => {
      return await firestore.collection("teams").doc(id).get();
    })
  );

  return snap;
};

export const loadPlayers = async (players) => {
  const snap = await Promise.all(
    players.map(async (id) => {
      return await firestore.collection("players").doc(id).get();
    })
  );

  return snap;
};

export const loadLeague = async (id) => {
  return await firestore.collection("leagues").doc(id).get();
};

export const createGame = async (gameData) => {
  const { month, day, year } = gameData.gameTime;
  const date = new Date(year, month + 1, day);
  gameData.gameTime = Timestamp.fromDate(date);

  const winloss =
    gameData.teamAStats.points > gameData.teamBStats.points
      ? { winner: gameData.teamA.id, loser: gameData.teamB.id }
      : { winner: gameData.teamB.id, loser: gameData.teamA.id };
  firestore
    .collection("teams")
    .doc(winloss.winner)
    .update({ wins: FieldValue.increment(1) }, { merge: true });
  firestore
    .collection("teams")
    .doc(winloss.loser)
    .update({ losses: FieldValue.increment(1) }, { merge: true });
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

    const players = [
      ...gameData.stats.teamA.map((player) => player.id),
      ...gameData.stats.teamB.map((player) => player.id),
    ];
    const teams = [gameData.teamA.id, gameData.teamB.id];
    
    let potg = gameData.playerOfTheGame
    const persisGame = firestore
      .collection("games")
      .doc(gameData.doc)
      .set({
        doc: gameData.doc,
        number: +gameData.gameNumber,
        time: gameData.gameTime,
        date: gameData.gameTime,
        leagueId: gameData.league.id,
        playerStats: gameData.stats,
        players,
        playerOfTheGame: gameData.playerOfTheGame,
        teams,
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

export const createGamev2 = async (gameData) => {
  // check if gameData is valid
  if (!gameData) {
    const error = new CustomError("Data is required", 400);
    throw error;
  }
  const isValid = Object.values(gameData).every(
    (value) => value !== undefined && value !== null && value !== "" && value !== 0
  );
  if (!isValid) {
    const error = new CustomError("Data is invalid", 400);
    throw error;
  }

  const doc = `${gameData.league.title.toLowerCase().replace(/\s/g, "-")}-${
    gameData.number
  }`;
  const isExist = await firestore
    .collection("games")
    .doc(doc)
    .get()
    .then((doc) => doc.exists);
  if (isExist) {
    throw new CustomError("Game number already exists", 400);
  }

  return firestore.runTransaction(async (transaction) => {

    const gameRef = firestore.collection("games").doc(doc);
    const winloss = gameData.stats.teamA.points > gameData.stats.teamB.points
      ? { winner: gameData.teamA.id, loser: gameData.teamB.id }
      : { winner: gameData.teamB.id, loser: gameData.teamA.id };

    transaction.update( firestore.collection('teams').doc(winloss.winner), {
      wins: FieldValue.increment(1)
    });

    transaction.update( firestore.collection('teams').doc(winloss.loser), {
      losses: FieldValue.increment(1)
    });

    gameData.playerStats.teamA.map( player => {
      transaction.set(
        firestore.collection('players').doc(player.id).collection('gameRecords').doc(gameRef.id),
        player
      )
    })
    gameData.playerStats.teamB.map( player => {
      transaction.set(
        firestore.collection('players').doc(player.id).collection('gameRecords').doc(gameRef.id),
        player
      )
    })

    transaction.set(
      firestore.collection('teams').doc(gameData.teamA.id).collection('gameRecords').doc(gameRef.id),
      gameData.stats.teamA
    )
    transaction.set(
      firestore.collection('teams').doc(gameData.teamB.id).collection('gameRecords').doc(gameRef.id),
      gameData.stats.teamB
    )

    const players = [
      ...gameData.playerStats.teamA.map( player => player.id),
      ...gameData.playerStats.teamB.map( player => player.id)
    ]
    const teams = [gameData.teamA.id, gameData.teamB.id]

    transaction.set(gameRef, {
      date: Timestamp.fromDate(gameData.date),
      doc: gameRef.id,
      leagueId: gameData.league.id,
      number: gameData.number,
      playerStats: gameData.playerStats,
      players,
      teamA: {
        id: gameData.teamA.id,
        stats: gameData.stats.teamA
      },
      teamB: {
        id: gameData.teamB.id,
        stats: gameData.stats.teamB
      },
      teams,
      time: Timestamp.fromDate(gameData.date),
      playerOfTheGame: gameData.playerOfTheGame
    })

  })
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

export const getGamesByLastRef = async (
  lastRef = null,
  limit = 10,
  orderBy = "date"
) => {
  const query = firestore
    .collection("games")
    .orderBy(orderBy, "desc")
    .limit(limit);
  if (lastRef) {
    return await query.startAfter(lastRef).get();
  }
  return await query.get();
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

  let query = firestore
    .collection("games")
    .orderBy(orderBy, "desc")
    .limit(limit);

  if (lastDoc) {
    query = query.startAfter(lastDoc);
  }

  return await query.get();
};

// TODO: update wins and loss of teams
export const deleteGameById = async (id) => {
  return firestore.runTransaction(async (transaction) => {
    return transaction.get(firestore.collection("games").doc(id)).then((doc) => {
      const game = doc.data();
      const { teamA, teamB, players } = game;

      const teamARef = firestore.collection("teams").doc(teamA.id);
      const teamBRef = firestore.collection("teams").doc(teamB.id);

      const teamAStatsRef = teamARef.collection("gameRecords").doc(id);
      const teamBStatsRef = teamBRef.collection("gameRecords").doc(id);

      const playerStats = players.map((player) =>
        firestore
          .collection("players")
          .doc(player)
          .collection("gameRecords")
          .doc(id)
      );

      transaction.delete(teamAStatsRef);
      transaction.delete(teamBStatsRef);
      playerStats.forEach((player) => transaction.delete(player));

      transaction.delete(firestore.collection("games").doc(id));
      transaction.update(firestore.collection("counters").doc("games"), {
        size: FieldValue.increment(-1),
      });
    });
  });
};
