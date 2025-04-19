"use client"
import { useState } from "react"
import { PlayerContext } from "@/context/playerContext"

export default function PlayerProvider({children}){

  const [player, setPlayer] = useState(null);
  const [games, setGames] = useState(null);
  const [leagues, setLeagues] = useState(null);
  
  const updateAll = (player, games, leagues) => {
    setPlayer(player)
    setGames(games)
    setLeagues(leagues)
  }

  const value = {
    player, games, leagues, updateAll
  }

  return (
      <PlayerContext.Provider value={value}>
        {children}
      </PlayerContext.Provider>
  )  

}
