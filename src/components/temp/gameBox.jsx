import React from 'react'
import { Link, Avatar } from "@heroui/react"

export default function GameBox({
  url,
  teamA,
  teamB
}) {

  const { name: nameA, score: scoreA } = teamA
  const { name: nameB, score: scoreB } = teamB

  return (
    <Link href={url} className='flex justify-evenly items-center p-4 gap-2 border border-neutral-700 rounded-lg min-w-full sm:min-w-fit '>
        <div className='flex flex-col justify-center items-center '>
          <Avatar src="" className="h-20 w-20 mb-2" name={nameA} size="xl" />
          <h2 className='font-bold'>{nameA}</h2>
          <h3>{scoreA}</h3>
        </div>
        <div>
          V.S
        </div>
        <div className='flex flex-col justify-center items-center'>
          <Avatar src="" className="h-20 w-20 mb-2" name={nameB} size="xl" />
          <h2 className='font-bold'>{nameB}</h2>
          <h3>{scoreB}</h3>
        </div>
      </Link>
  )
}
