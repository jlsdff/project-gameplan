"use client";
import React, { useCallback, useContext } from "react";
import PlayersProvider, { PlayersContext } from "./playersProvider";
import AdminPlayerSearchBar from "./playerSearchBar";
import AdminPlayerPagination from "./adminPlayerPagination";
import AdminPlayersTable from "./playerTable";
import { Button } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";

export default function AdminPlayer() {
  const playerContext = useContext(PlayersContext);


  return (
    <PlayersProvider>
      {/* SEARCH BAR */}
      <AdminPlayerSearchBar />
      {/* TABLE */}
      <AdminPlayersTable />
      {/* PAGINATION */}
      {/* <AdminPlayerPagination /> */}
      <LoadMoreButton/>
    </PlayersProvider>
  );
}

function LoadMoreButton() {
  
  const params = useSearchParams()
  const playerContext = useContext(PlayersContext);
  const handleLoadMore = useCallback(() => {
    playerContext.fetchPlayers()
    // console.log(playerContext.players)
  }, [playerContext]);

  if(params.get("name")) return null
  
  return (
    <section className="flex justify-center mt-4">
      <Button onClick={handleLoadMore} isLoading={playerContext.isFetching}>
        {" "}
        Load More{" "}
      </Button>
    </section>
  );
}
