"use client";
import React, { useState } from "react";
import { Tabs, Tab, Card } from "@nextui-org/react";
import GameStats from "./gameStats";
import PlayerTable from "./playerTable";

export default function GameTabs({ game }) {
  const { teamA, teamB, playerStats } = game;
  const [selectedTab, setSelectedTab] = useState("teamA");
  console.log(playerStats);
  return (
    <>
      <Tabs
        aria-label="Stats for the game"
        selectedKey={selectedTab}
        onSelectionChange={setSelectedTab}
      >
        <Tab key="teamA" title={`${teamA.data.teamName}`}>
          <PlayerTable stats={game.playerStats.teamA} />
        </Tab>
        <Tab key="teamB" title={`${teamB.data.teamName}`}>
          <PlayerTable stats={game.playerStats.teamB} />
        </Tab>
      </Tabs>
    </>
  );
}
