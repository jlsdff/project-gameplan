"use client";
import React, { useRef, useReducer, useCallback } from "react";
import { Input, Button, Link } from "@nextui-org/react";
import SearchIcon from "@/assets/searchIcon";
import AddIcon from "@/assets/addIcon";
import LeagueDataDisplay from "./leagueDataDisplay";
import { getLeaguesByLikeTitle } from "@/utils/leagueAPI";

const reducer = (state, action) => {
  switch (action.type) {
    case "searchInput":
      return { ...state, searchInput: action.value };
    case "isLoading":
      return {
        ...state,
        leagues: {
          ...state.leagues,
          loading: true,
        },
      };
    case "searchLeagues":
      return {
        searchInput: "",
        leagues: {
          ...state.leagues,
          loading: false,
          data: action.value,
        },
      };

    default:
      return state;
  }
};

export default function LeaguePageAdmin() {
  const [leagueState, dispatch] = useReducer(reducer, {
    leagues: {
      data: [],
      loading: false,
      error: null,
    },
    searchInput: "",
  });

  const handleSearch = useCallback(async (e) => {
    e.preventDefault();

    dispatch({ type: "isLoading" });
    const data = await getLeaguesByLikeTitle(leagueState.searchInput)
      .then((res) => {
        return res.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
      })
      .catch((error) => console.error(error));
    dispatch( {type: "searchLeagues", value: data} )
    
    if (!data) {
      alert("No leagues found")
    }

  });

  return (
    <section>
      <div className="flex items-center justify-center gap-3">
        <form className="flex items-center justify-center w-full gap-2">
          <Input
            label="Search League"
            onValueChange={(val) =>
              dispatch({ type: "searchInput", value: val })
            }
            value={leagueState.searchInput}
          />
          <Button
            size="sm"
            variant="solid"
            color="primary"
            type="submit"
            isDisabled={!leagueState.searchInput}
            isLoading={leagueState.leagues.loading}
            onClick={handleSearch}
            isIconOnly
          >
            <SearchIcon />
          </Button>
        </form>
        <Link href="/admin/dashboard/leagues/new">
          <Button isIconOnly size="sm" color="light">
            <AddIcon />
          </Button>
        </Link>
      </div>
      <section className="mt-4">
        <LeagueDataDisplay searchedLeagues={leagueState.leagues.data} />
      </section>
    </section>
  );
}
