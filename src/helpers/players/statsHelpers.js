import { isNaN } from "underscore";

const safeDivide = (numerator, denominator) => {
  return denominator === 0 ? 0 : numerator / denominator;
};

export const getPPG = (stats) => {
  if (!stats.length) return 0;
  const ppg = safeDivide(
    stats.reduce((acc, curr) => {
      return (
        acc +
        curr.twoPointsMade * 2 +
        curr.threePointsMade * 3 +
        curr.freeThrowsMade
      );
    }, 0),
    stats.length
  ).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  return isNaN(ppg) ? 0 : ppg;
};

export const getAPG = (stats) => {
  if (!stats.length) return 0;
  const apg = safeDivide(
    stats.reduce((acc, curr) => {
      return acc + curr.assists;
    }, 0),
    stats.length
  ).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  return isNaN(apg) ? 0 : apg;
};

export const getRPG = (stats) => {
  if (!stats.length) return 0;
  const rpg = safeDivide(
    stats.reduce((acc, curr) => {
      return acc + curr.rebounds;
    }, 0),
    stats.length
  ).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  return isNaN(rpg) ? 0 : rpg;
};

export const getBPG = (stats) => {
  if (!stats.length) return 0;
  const bpg = safeDivide(
    stats.reduce((acc, curr) => {
      return acc + curr.blocks;
    }, 0),
    stats.length
  ).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  return isNaN(bpg) ? 0 : bpg;
};

export const getSPG = (stats) => {
  if (!stats.length) return 0;
  const spg = safeDivide(
    stats.reduce((acc, curr) => {
      return acc + curr.steals;
    }, 0),
    stats.length
  ).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  return isNaN(spg) ? 0 : spg;
};

export const getFGP = (stats) => {
  if (!stats.length) return 0;

  const totalAttempts = stats.reduce((acc, curr) => {
    return acc + curr.twoPointsAttempted + curr.threePointsAttempted;
  }, 0);

  const totalMade = stats.reduce((acc, curr) => {
    return acc + curr.twoPointsMade + curr.threePointsMade;
  }, 0);

  const fgp = (safeDivide(totalMade, totalAttempts) * 100).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return isNaN(fgp) ? 0 : fgp;
};

export const get2PG = (stats) => {
  if (!stats.length) return 0;

  const totalAttempts = stats.reduce((acc, curr) => {
    return acc + curr.twoPointsAttempted;
  }, 0);

  const totalMade = stats.reduce((acc, curr) => {
    return acc + curr.twoPointsMade;
  }, 0);
  const _2pg = (safeDivide(totalMade, totalAttempts) * 100).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  return isNaN(_2pg) ? 0 : _2pg;
};

export const getFTP = (stats) => {
  if (!stats.length) return 0;

  const totalAttempts = stats.reduce((acc, curr) => {
    return acc + curr.freeThrowsAttempted;
  }, 0);

  const totalMade = stats.reduce((acc, curr) => {
    return acc + curr.freeThrowsMade;
  }, 0);
  const ftp = (safeDivide(totalMade, totalAttempts) * 100).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  return isNaN(ftp) ? 0 : ftp;
};

export const get3PG = (stats) => {
  if (!stats.length) return 0;

  const totalAttempts = stats.reduce((acc, curr) => {
    return acc + curr.threePointsAttempted;
  }, 0);

  const totalMade = stats.reduce((acc, curr) => {
    return acc + curr.threePointsMade;
  }, 0);
  const _3pg = (safeDivide(totalMade, totalAttempts) * 100).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  return isNaN(_3pg) ? 0 : _3pg;
};

// GET GAME STATS OF A PLAYER FROM A GAME DOCUMENT
export const getStats = (playerId, games) => {
  const stats = [];

  games.forEach((game) => {
    const playersStats = [...game.playerStats.teamA, ...game.playerStats.teamB];
    const playerStats = playersStats.find((player) => player.id === playerId);

    if (playerStats) {
      stats.push(playerStats);
    }
  });

  return {
    ppg: getPPG(stats),
    apg: getAPG(stats),
    rpg: getRPG(stats),
    bpg: getBPG(stats),
    spg: getSPG(stats),
    fgp: getFGP(stats),
    twoPG: get2PG(stats),
    threePG: get3PG(stats),
    ftp: getFTP(stats),
  };
};
