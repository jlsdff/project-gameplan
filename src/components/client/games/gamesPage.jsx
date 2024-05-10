'use client'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import GamesDisplay from './gamesDisplay'
import GamePage from './gamePage'
export default function GamesPage() {

  const params = useSearchParams()
  const name = params.get("name")
  const page = params.get("page") || 1
  const id = params.get("id")

  if(id) {
    return <GamePage id={id} />
  }
  
  return (
    <GamesDisplay name={name} page={page} />
  )
}
