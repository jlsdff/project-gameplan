import Players from "@/app/(home)/players/page"
import { firestore } from "@/lib/firebase/firebase"

export const reformatGamesDocument = async () => {

  // GET ALL GAMES
  const games = await firestore.collection("games").get()
  const gamesData = games.docs.map(doc => ({id: doc.id, ...doc.data()}))

  // LOOP TO GAMES AND REFORMAT
  const reformattedGames = gamesData.map( game => {

    const teamA = game.teamA.id
    const teamB = game.teamB.id
    const teamAPlayers = game.playerStats.teamA.map( player => player.id)
    const teamBPlayers = game.playerStats.teamB.map( player => player.id)

    return {
      teams: [teamA, teamB],
      players: [...teamAPlayers, ...teamBPlayers],
      ...game
    }

  })
  console.log(reformattedGames)

  // UPDATE GAMES
  reformattedGames.forEach( async game => {
    await firestore.collection("games")
      .doc(game.id)
      .update({
        teams: game.teams,
        players: game.players
      }, {
        merge: true
      })
    console.log(`Game ${game.id} updated`)
  })

}