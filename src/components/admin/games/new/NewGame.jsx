"use client";
import { useCallback, useState } from "react";
import { useNewGameStore } from "./gameStore";
import LeagueAutoComplete from "./form/LeagueAutoComplete";
import { Button, ButtonGroup, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import TeamAutoComplete from "./form/teamAutoComplete";
import GameDatePicker from "./form/gameDataPicker";
import GameNumber from "./form/gameNumber";
import StatTable from "./table/statTable";
import ChevronIcon from "@/assets/chevronIcon";
import ImportIcon from "@/assets/importIcon";

export default function NewGame({ id }) {
  const { league, teamA, teamB, teamAPlayers, teamBPlayers, gameNumber, date,  setTeamA, setTeamB } = useNewGameStore();

  const handleSave = useCallback(() => {
    console.log("Save: ", league);
    console.log("Team A: ", teamA);
    console.log("Team B: ", teamB);
    console.log("Team A Players: ", teamAPlayers);
    console.log("Team B Players: ", teamBPlayers);
    console.log("Date: ", date);
    console.log("Game Number: ", gameNumber);
  }, [league, teamA, teamB, teamAPlayers, teamBPlayers, date, gameNumber]);

  return (
    <main>

      <section className="flex items-center justify-between w-full mb-4 ">
        <h1 className="text-xl font-semibold sm:text-2xl">New Game</h1>

        <div>
          <Dropdown>
            <DropdownTrigger>
              <Button>
                <ChevronIcon size={14} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="extra options" >
              <DropdownItem startContent={<ImportIcon size={14}/>}>Import</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-2 mb-2.5 sm:grid-cols-2 md:grid-cols-3">
        <LeagueAutoComplete />
        <TeamAutoComplete label="Team A" setTeam={setTeamA} />
        <TeamAutoComplete label="Team B" setTeam={setTeamB} />
        <GameDatePicker label="Date" />
        <GameNumber label="Game Number" />
      </section>

      <form>
      {
        teamAPlayers && 
        <StatTable id={id} players={teamAPlayers} />
      }
      {
        teamBPlayers && 
        <StatTable id={id} players={teamBPlayers} />
      }
      </form>
      <section>
        <Button onClick={handleSave}>Save</Button>
      </section>
    </main>
  );
}
