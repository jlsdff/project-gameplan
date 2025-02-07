import { Tab, Tabs } from "@heroui/react";
import React from 'react'
import StatsTable from './statsTable';

export default function GameStats({teamA, teamB, setData, mainData}) {

  const { teamData: teamAData, players: teamAPlayers } = teamA;
  const { teamData: teamBData, players: teamBPlayers } = teamB;


  if ( !teamAData || !teamBData ) {
    return <></>;
  }
  
  return (
    <>
        <h2 className='my-4 text-lg font-medium'>{teamAData.teamName || "Team A"}</h2>
        <StatsTable mainData={mainData} teamData={{...teamAData, teamSide: "teamA"}} players={teamAPlayers} setData={setData} />
        <h2 className='my-4 text-lg font-medium'>{teamBData.teamName || "Team B"}</h2>
        <StatsTable mainData={mainData} teamData={{...teamBData, teamSide: "teamB"}} players={teamBPlayers} setData={setData} />

    </>

  )
}
