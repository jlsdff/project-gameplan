'use client'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import LeaguesDisplay from './leaguesDisplay'
import LeaguePage from './leaguePage'

export default function LeaguesPage() {

  const params = useSearchParams()
  const page = params.get('page') || 1
  const id = params.get('id')

  if(id){
    return <LeaguePage id={id} />
  }
  
  return (
    <LeaguesDisplay page={page} />
  )
}
