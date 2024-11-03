"use client";
import React, { useEffect, useMemo } from "react";
import NewGame from "@/components/admin/games/new/NewGame";
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";
import { useNewGameStore } from "./gameStore";

const client = new QueryClient();

export default function NewGamePage({id}) {
  
  const { league } = useNewGameStore()

  useEffect(() => {
    console.log("Effect: ", league)
  },[league])
  
  return (
    <main className="min-h-screen p-8 sm:p-16">
      {/* <NewGame /> */}
      <QueryClientProvider client={client}>
        <NewGame id={id} />
      </QueryClientProvider>
    </main>
  );
}
