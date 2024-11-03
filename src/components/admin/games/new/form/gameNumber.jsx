import { useState } from "react"
import { Input } from "@nextui-org/react"
import { useNewGameStore } from "../gameStore"

export default function GameNumber({id, ...props}) {

  const {gameNumber, setGameNumber} = useNewGameStore()
  
  return (
    <Input value={gameNumber} onValueChange={setGameNumber} {...props} />
  )

}