import {useMemo} from "react"
import {useNewGameStore} from "./gameStore"
import { Select, SelectItem } from "@heroui/react"

export default function PlayerOfTheGame(){

  const { teamAPlayers, teamBPlayers, playerOfTheGame: selected, setPlayerOfTheGame } = useNewGameStore()

  const selection = useMemo(() => {
    return [...teamAPlayers, ...teamBPlayers];
  }, [teamAPlayers, teamBPlayers])

  const handleOnChange = (player) => {
    setPlayerOfTheGame(player)
  }

  return (
    <div>
      <Select 
        label="Player of the Game"
        selectedKeys={selected}
        onSelectionChange={handleOnChange}
      >
        {
          selection.map( player => (
            <SelectItem key={player.id} >
              <UserDisplay player={player} />
            </SelectItem>
          ))
        }
      </Select>
    </div>
  )
}

function UserDisplay({player}){
  return (
    <div className="flex gap-2" >
      <div className="min-w-[30px]" > 
        {player.number}
      </div>
      <div className="font-semibold" >
        {`${player.lastname}, ${player.firstname}`}
      </div>
    </div>
  )
}
