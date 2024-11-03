"use client";
import { useState } from "react";
import { useNewGameStore } from "@/components/admin/games/new/NewGamePage";
import LeagueAutoComplete from "./LeagueAutoComplete";

export default function NewGame({ id }) {
  const { league } = useNewGameStore();

  if (id) {
    return (
      <main>
        <section>
          <h1>{league && league.title}</h1>
        </section>
        <section>
          <LeagueAutoComplete />
        </section>
      </main>
    );
  }
}
