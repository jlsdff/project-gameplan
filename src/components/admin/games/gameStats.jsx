import { Tab, Tabs } from '@nextui-org/react';
import React from 'react'
import StatsTable from './statsTable';

export default function GameStats({teamA, teamB, setData}) {

  const { teamData: teamAData, players: teamAPlayers } = teamA;
  const { teamData: teamBData, players: teamBPlayers } = teamB;


  if ( !teamAData || !teamBData ) {
    return <></>;
  }
  
  return (
    <>
    <Tabs>

      <Tab key="teamA" title={teamAData.teamName || "Team A"}>
        <StatsTable teamData={{...teamAData, teamSide: "teamA"}} players={teamAPlayers} setData={setData} />
      </Tab>
      <Tab key="teamB" title={teamBData.teamName || "Team B"}>
        <StatsTable teamData={{...teamBData, teamSide: "teamB"}} players={teamBPlayers} setData={setData} />
      </Tab>

    </Tabs>
    </>

  )
}
