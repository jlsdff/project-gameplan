"use client";
import React, { useReducer } from "react";
import { DataDisplayTeamsContext } from "@/context/dataDisplayTeamsContext";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_TEAMS":
      return { ...state, teams: action.payload };
    default:
      return state;
  }
};

const initialState = {
  
};

export default function DataDisplayProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {};

  return (
    <DataDisplayTeamsContext.Provider value={value}>
      {children}
    </DataDisplayTeamsContext.Provider>
  );
}
