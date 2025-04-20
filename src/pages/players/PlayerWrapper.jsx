"use client";
import { useCallback, useContext, useState } from "react"
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { create } from "zustand";
import { useParams } from "next/navigation";
import { firestore } from "@/lib/firebase/firebase";
import { PlayerContext } from "@/context/playerContext";

const queryClient = new QueryClient();

export default function PlayerWrapper({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

export function FetchLayer({ children }) {

  const params = useParams()

  const playerCtx = useContext(PlayerContext);

  const fetchPlayer = async () => {
    const id = params.id;
    let player = await firestore.collection("players").doc(id).get();
    if (!player.exists) {
      throw new Error("Player not found");
    }

    // GET GAMES
    let games = firestore
      .collection("games")
      .where("players", "array-contains", id);
    games = await games
      .get()
      .then((snapshot) => snapshot.docs.map((doc) => doc.data()));

    // GET LEAGUES
    let leagues = [];
    games.forEach((game) => {
      if (!leagues.includes(game.leagueId)) {
        leagues.push(game.leagueId);
      }
    });
    if (leagues.length > -1) {
      leagues = await Promise.all(
        leagues.map(async (leagueId) => {
          const league = await firestore
            .collection("leagues")
            .doc(leagueId)
            .get();
          return { id: leagueId, ...league.data() };
        })
      );
    }

    player = {
      id: player.id,
      ...player.data()
    } 

    playerCtx.updateAll(player, games, leagues);

    return {
      player: player,
      games: JSON.stringify(games),
      leagues: JSON.stringify(leagues),
    };
  }
  
  const {
    data, 
    isPending,
    isError,
    error
  } = useQuery({
    queryKey: ['player'],
    queryFn: fetchPlayer,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  }); 

  if (isPending) return <div>...Loading</div>;
  if (isError) {
    console.log(error)
  }
  if (isError) return <div>Something went wrong...</div>;

  return <>{children}</>;
}


