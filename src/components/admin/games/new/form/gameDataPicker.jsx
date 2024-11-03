import React, { useState } from "react"
import { DatePicker } from "@nextui-org/date-picker"
import { parseDate, getLocalTimeZone } from "@internationalized/date"
import { useDateFormatter } from "@react-aria/i18n"
import { useNewGameStore } from "../gameStore"

export default function GameDatePicker({id, ...props}) {

  const { date, setDate } = useNewGameStore()
  
  return (
    <DatePicker value={date} onChange={setDate} {...props}  />
  )
}