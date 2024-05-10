'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation';
import TeamsTable from './teamsTable';
import TeamPage from './teamPage';



export default function TeamsPage() {

  const params = useSearchParams();

  const id = params.get("id")
  const name = params.get("name")
  const page = params.get("page")

  if( id ){
    return <TeamPage id={id}/>
  }
  
  return (
    <>
    <TeamsTable name={name} page={page} />
    </>
  )
}
