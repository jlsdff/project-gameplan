"use client";
import React, { useCallback, useReducer, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Autocomplete,
  AutocompleteSection,
  AutocompleteItem,
  Input,
  TimeInput,
  Button,
} from "@nextui-org/react";
import useFetchLeague from "./fetchLeague";
import useTeamByName from "@/hooks/useTeamByName";
import { getPlayerById } from "@/utils/playerAPI";
import GameStats from "./gameStats";
import { getTeamTotalStats } from "@/helpers/getTotalPoints";
import { createGame } from "@/utils/gamesAPI";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_MAIN_DATA":
      return {
        ...state,
        mainData: action.payload,
      };
    case "PLAYERS":
      const { teamSide, players } = action.payload;

      if (teamSide === "teamA") {
        return {
          ...state,
          players: {
            ...state.players,
            teamA: players,
          },
          stats: {
            teamB: [...state.stats.teamB],
            teamA: players.map((player, index) => ({
              id: player.id,
              rebounds: 0,
              assists: 0,
              steals: 0,
              blocks: 0,
              turnovers: 0,
              fouls: 0,
              twoPointsMade: 0,
              twoPointsAttempted: 0,
              threePointsMade: 0,
              threePointsAttempted: 0,
              freeThrowsMade: 0,
              freeThrowsAttempted: 0,
            })),
          },
        };
      } else if (teamSide === "teamB") {
        return {
          ...state,
          players: {
            ...state.players,
            teamB: players,
          },
          stats: {
            teamA: [...state.stats.teamA],
            teamB: players.map((player, index) => ({
              id: player.id,
              rebounds: 0,
              assists: 0,
              steals: 0,
              blocks: 0,
              turnovers: 0,
              fouls: 0,
              twoPointsMade: 0,
              twoPointsAttempted: 0,
              threePointsMade: 0,
              threePointsAttempted: 0,
              freeThrowsMade: 0,
              freeThrowsAttempted: 0,
            })),
          },
        };
      } else {
        return state;
      }

    case "STATS":
      const { playerId, stats, teamSide: side } = action.payload;
      console.log(action.payload);

      if (side === "teamA") {
        return {
          ...state,
          stats: {
            teamB: [...state.stats.teamB],
            teamA: state.stats.teamA.map((player) => {
              if (player.id === playerId) {
                return {
                  ...player,
                  ...stats,
                };
              }
              return player;
            }),
          },
        };
      } else if (side === "teamB") {
        return {
          ...state,
          stats: {
            teamA: [...state.stats.teamA],
            teamB: state.stats.teamB.map((player) => {
              if (player.id === playerId) {
                return {
                  ...player,
                  ...stats,
                };
              }
              return player;
            }),
          },
        };
      } else {
        return state;
      }

    case 'REMOVE_PLAYER':

      const { teamSide: teamside, id } = action.payload;

      if (teamside === 'teamA') {
        return {
          ...state,
          players: {
            ...state.players,
            teamA: state.players.teamA.filter(player => player.id !== id),
          },
          stats: {
            ...state.stats,
            teamA: state.stats.teamA.filter(player => player.id !== id)
          }
        }
      } else if (teamside === 'teamB'){
        return {
          ...state,
          players: {
            ...state.players,
            teamB: state.players.teamB.filter(player => player.id !== id),
          },
          stats: {
            ...state.stats,
            teamB: state.stats.teamB.filter(player => player.id !== id)
          }
        }
      }else {
        return state
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
  const router = useRouter();

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

  const handlePlayerSelection = useCallback(async (teamSide, team) => {
    const players = await team.players.map(async (player) => {
      const playerData = await getPlayerById(player).then((res) => {
        return {
          id: res.id,
          ...res.data(),
        };
      });
      return playerData;
    });

    Promise.all(players).then((res) => {
      setMainData({
        type: "PLAYERS",
        payload: {
          teamSide: teamSide,
          players: res,
        },
      });
    });
  }, []);

  const handleSaveButton = useCallback(() => {
    const data = {
      doc: `${leagueField.selectedObj.title
        .toLowerCase()
        .split(" ")
        .join("-")}-${gameNumber}`,
      league: leagueField.selectedObj,
      teamA: teamA.selectedObj,
      teamB: teamB.selectedObj,
      gameTime,
      gameNumber,
      stats: mainData.stats,
    };

    const totalStats = {
      teamAStats: getTeamTotalStats(mainData.stats.teamA),
      teamBStats: getTeamTotalStats(mainData.stats.teamB),
    };

    console.log({ ...data, ...totalStats });
    createGame({ ...data, ...totalStats })
      .then((res) => {
        console.log(res)
        alert("Game Saved");
        router.push("/admin/dashboard/games");
      })
      .catch((err) => {
        alert("Error saving game");
        console.error(err);
      });
  }, [
    gameNumber,
    gameTime,
    leagueField.selectedObj,
    mainData.stats,
    router,
    teamA.selectedObj,
    teamB.selectedObj,
  ]);

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

              if (team.id) {
                handlePlayerSelection("teamA", team);
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
            <AutocompleteItem key={team.id}>{team.teamName}</AutocompleteItem>
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

              if (team.id) {
                handlePlayerSelection("teamB", team);
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

      <h2 className="my-4 text-lg font-bold md:text-xl">Stats</h2>
      <div>
        <GameStats
          mainData={mainData}
          teamA={{
            teamData: teamA.selectedObj,
            players: mainData.players.teamA,
          }}
          teamB={{
            teamData: teamB.selectedObj,
            players: mainData.players.teamB,
          }}
          setData={setMainData}
        />
      </div>
      <div className="flex items-center justify-center">
        <Button
          color="primary"
          variant="solid"
          size="md"
          className="mt-4"
          onClick={handleSaveButton}
        >
          Save Game
        </Button>
        <Button color="primary" variant="light" size="md" className="mt-4 ml-2">
          Cancel
        </Button>
      </div>
    </>
  );
}
