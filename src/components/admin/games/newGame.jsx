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
import { getPlayerById } from "@/utils/playerAPI";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_MAIN_DATA":
      return {
        ...state,
        mainData: action.payload,
      };
    case "PLAYERS":

      const { teamSide, players } = action.payload;

      if(teamSide === "teamA") {
        return {
          ...state,
          players: {
            ...state.players,
            teamA: players,
          }
        }
      }else if( teamSide === "teamB") {
        return {
          ...state,
          players: {
            ...state.players,
            teamB: players,
          }
        }
      } else {
        return state;
      }
      

    default:
      return state;
  }
};

const initialState = {
  mainData: {},
  players: {
    teamA: [],
    teamB: [],
  },
  stats: {
    teamA: [],
    teamB: [],
  },
};

export default function NewGame() {
  const params = useSearchParams();
  const id = params.get("id");

  const [mainData, setMainData] = useReducer(reducer, initialState);

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

  const handlePlayerSelection = useCallback( async (teamSide, team)=> {
    
    const players = await team.players.map( async (player) => {
      const playerData = await getPlayerById(player).then( res => {
        return {
          id: res.id,
          ...res.data()
        }
      })
      return playerData;
    })

    Promise.all(players).then( res => {
      setMainData({
        type: "PLAYERS",
        payload: {
          teamSide: teamSide,
          players: res,
        },
      });
    })
  },[])

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

              if(team.id){
                handlePlayerSelection("teamA", team)
              }
              
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

              if(team.id) {
                handlePlayerSelection("teamB", team)
              }
              
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
      <div></div>
    </>
  );
}
