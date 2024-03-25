"use client";
import React, { useCallback, useMemo, useReducer } from "react";
import { Input, Button } from "@nextui-org/react";
import SearchIcon from "@/assets/searchIcon";
import SearchBar from "@/components/ui/searchBar/searchBar";
import NewTeamSearchDisplay from "./newTeamSearchDisplay";
import { getPlayerByLikeName } from "@/utils/playerAPI";

const reducer = (state, action) => {
  switch (action.type) {
    case "teamName":
      return { ...state, teamName: action.value };
    case "teamAbbr":
      return { ...state, teamAbbr: action.value };
    case "teamLogo":
      return { ...state, teamLogo: action.value };
    case "searchValue":
      return { ...state, searchValue: action.value };
    case "searchedPlayers":
      return { ...state, searchedPlayers: action.value };

    default:
      return state;
  }
};

export default function NewTeam() {
  const [team, teamReducer] = useReducer(reducer, {
    teamName: "",
    teamAbbr: "",
    teamLogo: "",
    searchValue: "",
    searchedPlayers: {
      data: [],
      loading: false,
      hasSearch: false,
    },
  });

  if (team.searchValue) {
  }

  const onSearchPlayers = useCallback(async () => {
    teamReducer({
      type: "searchedPlayers",
      value: { loading: true, hasSearch: true },
    });
    const playersRes = await getPlayerByLikeName(team.searchValue)
      .then((res) => {
        console.log(res);
        const data = res.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        teamReducer({
          type: "searchedPlayers",
          value: { data, loading: false, hasSearch: true },
        });
        return data;
      })
      .catch((err) => {
        teamReducer({
          type: "searchedPlayers",
          value: { data: [], loading: false, hasSearch: true },
        });
        console.error(err);
      });
    return playersRes;
  }, [team.searchValue]);

  return (
    <section className="mx-8 my-4 ">
      <h1 className="mb-4 text-xl md:text-3xl">New Team</h1>
      <section className="container gap-4">
        <div className="mb-4 ">
          <h2 className="my-2 font-bold">Team Details</h2>
          <div className="gap-2 columns-1 md:columns-3">
            <Input
              label="Team Name"
              value={team.teamName}
              onValueChange={(value) =>
                teamReducer({ type: "teamName", value })
              }
              className="my-2 md:my-0"
            />
            <Input
              label="Team ABBR"
              value={team.teamAbbr}
              onValueChange={(value) =>
                teamReducer({ type: "teamAbbr", value })
              }
              className="my-2 md:my-0"
            />
            <Input
              type="file"
              value={team.teamLogo}
              onValueChange={(value) =>
                teamReducer({ type: "teamLogo", value })
              }
              className="my-2 md:my-0"
            />
          </div>
        </div>
        <div className="gap-4 columns-1 md:columns-2 ">
          <div className="md:break-after-column">
            <h2 className="my-2 font-bold">Search Players</h2>
            <div className="flex items-center justify-center gap-2">
              <Input
                label="Search Players"
                onValueChange={(value) => {
                  teamReducer({ type: "searchValue", value });
                }}
                value={team.searchValue}
              />
              <Button
                isIconOnly
                isDisabled={!team.searchValue}
                size="lg"
                onClick={() => onSearchPlayers()}
              >
                <SearchIcon />
              </Button>
            </div>
            <div id="search-results">
              <h3 className="my-2 text-sm">Search Results</h3>
              <div id="search-resuts-container" className=" min-h-4">
                <NewTeamSearchDisplay
                  data={team.searchedPlayers.data}
                  loading={team.searchedPlayers.loading}
                  hasSearch={team.searchedPlayers.hasSearch}
                />
              </div>
            </div>
          </div>
          <div id="player-container" className="min-h-[300px]">
            <h2 className="my-2 font-bold">Players</h2>
            <div></div>
          </div>
        </div>
      </section>
    </section>
  );
}
