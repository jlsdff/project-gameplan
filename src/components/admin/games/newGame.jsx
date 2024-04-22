"use client";
import React, { useCallback, useReducer, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Autocomplete,
  AutocompleteSection,
  AutocompleteItem,
  Input,
  TimeInput,
} from "@nextui-org/react";
import useFetchLeague from "./fetchLeague";
import useTeamByName from "@/hooks/useTeamByName";

export default function NewGame() {
  const params = useSearchParams();
  const id = params.get("id");

  const [leagueField, setLeagueField] = useState({
    selectedKey: null,
    selectedValue: "",
    inputValue: "",
    selectedObj: {},
    results: [],
  });

  const [teamA, setTeamA] = useState({
    selectedKey: null,
    selectedValue: "",
    inputValue: "",
    selectedObj: {},
    results: [],
  });

  const [teamB, setTeamB] = useState({
    selectedKey: null,
    selectedValue: "",
    inputValue: "",
    selectedObj: {},
    results: [],
  });

  const [gameTime, setGameTime] = useState({
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
  });

  const [gameNumber, setGameNumber] = useState(0);

  const { isLoading } = useFetchLeague(leagueField.inputValue, setLeagueField);
  const { isLoading: isLoadingTeamA } = useTeamByName(
    teamA.inputValue,
    setTeamA
  );
  const { isLoading: isLoadingTeamB } = useTeamByName(
    teamB.inputValue,
    setTeamB
  );

  const handleLeagueInput = useCallback(
    (value) => {
      setLeagueField((prev) => {
        return {
          ...prev,
          inputValue: value,
        };
      });
    },
    [setLeagueField]
  );

  return (
    <>
      <h1 className="text-xl font-bold md:text-2xl">
        {id ? `Editing Game ${id}` : "New Game"}
      </h1>

      <div className="flex flex-col gap-2 mt-4 sm:flex-row">
        <Autocomplete
          items={leagueField.results}
          loading={isLoading}
          label="League"
          placeholder="Game under which league?"
          size="sm"
          className="w-full md:max-w-sm"
          selectedKey={leagueField.selectedKey}
          inputValue={leagueField.inputValue}
          onInputChange={(value) => {
            handleLeagueInput(value);
          }}
          onSelectionChange={(key) => {
            setLeagueField((prev) => {
              const league =
                leagueField.results.find((league) => league.id === key) || {};
              return {
                ...prev,
                selectedValue: league.title || "",
                inputValue: league.title || "",
                selectedKey: key || null,
                selectedObj: league || {},
              };
            });
          }}
        >
          {(league) => (
            <AutocompleteItem key={league.id}> {league.title}</AutocompleteItem>
          )}
        </Autocomplete>

        <Autocomplete
          items={teamA.results}
          loading={isLoadingTeamA}
          label="Team A"
          size="sm"
          className="w-full md:max-w-sm"
          selectedKey={teamA.selectedKey}
          inputValue={teamA.inputValue}
          onInputChange={(value) => {
            setTeamA((prev) => {
              return {
                ...prev,
                inputValue: value,
              };
            });
          }}
          onSelectionChange={(key) => {
            setTeamA((prev) => {
              const team = teamA.results.find((team) => team.id === key) || {};
              return {
                ...prev,
                selectedValue: team.teamName || "",
                inputValue: team.teamName || "",
                selectedKey: key || null,
                selectedObj: team || {},
              };
            });
          }}
        >
          {(team) => (
            <AutocompleteItem key={team.id}> {team.teamName}</AutocompleteItem>
          )}
        </Autocomplete>

        <Autocomplete
          items={teamB.results}
          loading={isLoadingTeamB}
          label="Team B"
          size="sm"
          className="w-full md:max-w-sm"
          selectedKey={teamB.selectedKey}
          inputValue={teamB.inputValue}
          onInputChange={(value) => {
            setTeamB((prev) => {
              return {
                ...prev,
                inputValue: value,
              };
            });
          }}
          onSelectionChange={(key) => {
            setTeamB((prev) => {
              const team = teamB.results.find((team) => team.id === key) || {};
              return {
                ...prev,
                selectedValue: team.teamName || "",
                inputValue: team.teamName || "",
                selectedKey: key || null,
                selectedObj: team || {},
              };
            });
          }}
        >
          {(team) => (
            <AutocompleteItem key={team.id}> {team.teamName}</AutocompleteItem>
          )}
        </Autocomplete>
      </div>

      <div className="flex flex-col gap-2 mt-4 md:flex-row">
        <TimeInput
          label="Game Time"
          size="sm"
          value={gameTime}
          onChange={setGameTime}
        />
        <Input
          size="sm"
          label="Game Number"
          type="number"
          value={gameNumber}
          onValueChange={setGameNumber}
        />
      </div>
        
      <h2>Stats</h2>
      <div>

      </div>
    </>
  );
}
