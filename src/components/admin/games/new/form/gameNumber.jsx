import { useEffect, useState } from "react"
import { Input } from "@heroui/react"
import { useNewGameStore } from "../gameStore"

export default function GameNumber({id, ...props}) {

  const {number, setNumber} = useNewGameStore()
  
  return (
    <Input value={number} onValueChange={value => {
      setNumber(+value)
    }} {...props} />
  )

}