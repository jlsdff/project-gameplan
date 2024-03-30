"use client";
import React, { useRef, useReducer, useCallback } from "react";
import { Input, Button, Link } from "@nextui-org/react";
import SearchIcon from "@/assets/searchIcon";
import AddIcon from "@/assets/addIcon";

const reducer = (state, action) => {
  switch (action.type) {
    case "searchInput":
      return { ...state, searchInput: action.value };
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

  const handleSearch = useCallback((e) => {
    e.preventDefault();
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
    </section>
  );
}
