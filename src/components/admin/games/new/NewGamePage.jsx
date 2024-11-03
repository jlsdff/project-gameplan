"use client";
import React from "react";
import NewGame from "@/components/admin/games/new/NewGame";
import { create } from "zustand";
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";

const client = new QueryClient();

export const useNewGameStore = create((set) => ({
  league: null,
  setLeague: (league) => set({ league })
}));

export default function NewGamePage({id}) {
  return (
    <main className="min-h-screen p-8 sm:p-16">
      {/* <NewGame /> */}
      <QueryClientProvider client={client}>
        <NewGame id={id} />
      </QueryClientProvider>
    </main>
  );
}
