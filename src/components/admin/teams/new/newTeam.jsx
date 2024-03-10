"use client";
import React, { useReducer } from "react";
import { Input } from "@nextui-org/react";

const teamInitialValue = {
  teamTag: "",
  teamName: "",
  players: [],
};

const teamReducer = (state, action) => {
  switch (action.type) {
    case "teamTag":
      return { ...state, teamTag: action.value };
    case "teamName":
      return { ...state, teamName: action.value };
    case "players":
      if (state.players.include(action.value)) {
        return {
          ...state,
          players: state.players.filter((player) => player !== action.value),
        };
      } else {
        return { ...state, players: [...state.players, action.value] };
      }
    case "reset":
      return teamInitialValue;
    default:
      return state;
  }
};

export default function NewTeam() {
  const [team, setTeam] = useReducer(teamReducer, teamInitialValue);

  return (
    <section className="mx-8 my-4 ">
      <h1>New Team</h1>
      <section className="flex flex-col sm:flex-row">
        <div>
          <Input
            label="Team Tag"
            onValueChange={(value) => setTeam({ type: "teamTag", value })}
            value={team.teamTag}
          />
          <Input
            label="Team Name"
            onValueChange={(value) => setTeam({ type: "teamName", value })}
            value={team.teamName}
          />
        </div>
        <div></div>
      </section>
    </section>
  );
}
