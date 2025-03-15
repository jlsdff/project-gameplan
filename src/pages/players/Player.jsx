'use client'
import { useMemo, useState } from "react";
import Averages from "@/components/ui/player/averages";
import { Select } from "@heroui/react";


export default function Player({data}){
  
  const {player, games, leagues} = data;
  
  console.log("games: ", games)
  const [displayedGames, setDisplayedGames] = useState(games);
  const leagueSelection = useMemo(() => {
    const selection = [{name: "All", id: "all"}]
    leagues.forEach(league => {
      selection.push({
        name: league.title,
        id: league.id
      })
    })
    return selection
  }, [leagues])
  console.log("LeagueSelection", leagueSelection)
  
  return (
    <main className="px-8 py-4 sm:py-8 sm:px-16">
      <section>
      <Averages player={player} games={displayedGames} />
      </section>
      <section>
        <h2 className="text-xl font-bold">Games Played</h2>
        <div >

        </div>
      </section>
    </main>
  )
}

function leagueFilter({leagues}){

  return (
    <>
    <div>
      <Select>

      </Select>
    </div>
    </>
  )
  
}
