export const getPPG = (stats) => {
  if (!stats.length) return 0;

  return (
    stats.reduce((acc, curr) => {
      return (
        acc +
        curr.twoPointsMade * 2 +
        curr.threePointsMade * 3 +
        curr.freeThrowsMade
      );
    }, 0) / stats.length
  ).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
};

export const getAPG = (stats) => {
  if (!stats.length) return 0;

  return (
    (stats.reduce((acc, curr) => {
      return acc + curr.assists;
    }, 0) /
    stats.length).toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })
  );
};

export const getRPG = (stats) => {
  if (!stats.length) return 0;

  return (stats
    .reduce((acc, curr) => {
      return acc + curr.rebounds;
    }, 0) / stats.length).toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
    
};

export const getBPG = (stats) => {
  if (!stats.length) return 0;

  return (stats
    .reduce((acc, curr) => {
      return acc + curr.blocks;
    }, 0) / stats.length)
    .toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })
};

export const getSPG = (stats) => {
  if (!stats.length) return 0;

  return (stats
    .reduce((acc, curr) => {
      return acc + curr.steals;
    }, 0) / stats.length)
    .toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
};

export const getFGP = (stats) => {
  if (!stats.length) return 0;

  const totalAttempts = stats.reduce((acc, curr) => {
    return acc + curr.twoPointsAttempted + curr.threePointsAttempted;
  }, 0);

  const totalMade = stats.reduce((acc, curr) => {
    return acc + curr.twoPointsMade + curr.threePointsMade;
  }, 0);

  return ((totalMade / totalAttempts) * 100).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
};

export const get2PG = (stats) => {
  if (!stats.length) return 0;

  const totalAttempts = stats.reduce((acc, curr) => {
    return acc + curr.twoPointsAttempted;
  }, 0);

  const totalMade = stats.reduce((acc, curr) => {
    return acc + curr.twoPointsMade;
  }, 0);

  return ((totalMade / totalAttempts) * 100).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
};

export const getFTP = (stats) => {
  if (!stats.length) return 0;

  const totalAttempts = stats.reduce((acc, curr) => {
    return acc + curr.freeThrowsAttempted;
  }, 0);

  const totalMade = stats.reduce((acc, curr) => {
    return acc + curr.freeThrowsMade;
  }, 0);

  return ((totalMade / totalAttempts) * 100).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
};

export const get3PG = (stats) => {
  if (!stats.length) return 0;

  const totalAttempts = stats.reduce((acc, curr) => {
    return acc + curr.threePointsAttempted;
  }, 0);

  const totalMade = stats.reduce((acc, curr) => {
    return acc + curr.threePointsMade;
  }, 0);

  return ((totalMade / totalAttempts) * 100).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
};
