
const _getPercentageOfMadeAttempt = (array, madeAccessor, attemptAccessor) => {

  const made = array.reduce((acc, curr) => acc + +curr[madeAccessor], 0);
  const attempt = array.reduce((acc, curr) => acc + +curr[attemptAccessor], 0);
  const percentage = ((made / attempt) * 100).toFixed(2); 

  return {made, attempt, percentage};
  
}

export const getTeamTotalStats = (array) => {
  const data = {
    points: array.reduce((acc, curr) => {
      return acc + (+curr.twoPointsMade * 2) + (+curr.threePointsMade * 3) + +curr.freeThrowsMade
    }, 0 ),
    rebounds: array.reduce((acc, curr) => {
      return acc + +curr.rebounds
    }, 0),
    assists: array.reduce((acc, curr) => acc + +curr.assists, 0),
    steals: array.reduce((acc, curr) => acc + +curr.steals, 0),
    blocks: array.reduce((acc, curr) => acc + +curr.blocks, 0),
    turnovers: array.reduce((acc, curr) => acc + +curr.turnovers, 0),
    fouls: array.reduce((acc, curr) => acc + +curr.fouls, 0),
    twoPoints: _getPercentageOfMadeAttempt(array, 'twoPointsMade', 'twoPointsAttempted'),
    threePoints: _getPercentageOfMadeAttempt(array, 'threePointsMade', 'threePointsAttempted'),
    freeThrows: _getPercentageOfMadeAttempt(array, 'freeThrowsMade', 'freeThrowsAttempted'),
    fieldGoals: {
      made: array.reduce((acc, curr) => acc + +curr.twoPointsMade + +curr.threePointsMade, 0),
      attempt: array.reduce((acc, curr) => acc + +curr.twoPointsAttempted + +curr.threePointsAttempted, 0),
      percentage: ((array.reduce((acc, curr) => acc + +curr.twoPointsMade + +curr.threePointsMade, 0) / array.reduce((acc, curr) => acc + +curr.twoPointsAttempted + +curr.threePointsAttempted, 0)) * 100).toFixed(2)
    }
  }
  return data
}
