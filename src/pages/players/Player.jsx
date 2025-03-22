'use client'
import { useMemo, useState } from "react";
import Averages from "@/components/ui/player/averages";
import { Divider, Select, SelectItem } from "@heroui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import PlayerTable from "@/components/client/player/v2/PlayerTable";


export default function Player({data}){
  
  const {player, games, leagues} = data;
  
  console.log("games", games)
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
  console.log("displayedGames", displayedGames)
  
  return (
    <main className="px-8 py-4 sm:py-8 sm:px-16">
      <section>
      <Averages player={player} games={displayedGames} />
      </section>
      <Divider className="my-4" />
      <section className="flex flex-col sm:flex-row gap-2 justify-between items-center">
        <h2 className="sm:text-xl font-semibold text-lg">Games Played</h2>
        <div className="min-w-[300px]">
          <LeagueFilter leagues={leagueSelection} />
        </div>
      </section>
      <section className="mt-4">
        <PlayerTable games={displayedGames} />
      </section>
    </main>
  )
}

function LeagueFilter({leagues}){

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  const [selected, setSelected] = useState("all");
  
  const handleSelectionChange = (selected) => {
    setSelected(selected)
    
    if(selected.currentKey === searchParams.get("league")) return
    if(selected.currentKey === "all"){
      router.push(pathname)
      return
    }
    
    const url = `${pathname}?league=${selected.currentKey}`
    router.push(url)
  }

  return (
    <>
    <div>
      <Select
        label="Filter by League"
        size="sm"
        selectedKeys={selected}
        onSelectionChange={(selected) => handleSelectionChange(selected)}
      >
        {
          leagues.map(league => (
            <SelectItem key={league.id}>{league.name}</SelectItem>
          ))
        }
      </Select>
    </div>
    </>
  )
  
}