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
            <SelectItem key={player.id} >{`${player.lastname}, ${player.firstname}`}</SelectItem>
          ))
        }
      </Select>
    </div>
  )
}
