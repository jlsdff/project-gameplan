"use client";
import React, { useReducer, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Autocomplete,
  AutocompleteSection,
  AutocompleteItem,
  Input,
} from "@nextui-org/react";
import useFetchLeague from "./fetchLeague";


export default function NewGame() {
  const params = useSearchParams();
  const id = params.get("id");


  const [leagueField, setLeagueField] = useState({
    selectedKey: null,
    selectedValue: "",
    inputValue: "",
    results: []
  })

  const { isLoading } = useFetchLeague( leagueField.inputValue, setLeagueField);

  const handleLeagueInput = value => {
    setLeagueField( prev => {
      return {
        ...prev,
        inputValue: value
      }
    })
  }

  return (
    <>
      <h1 className="text-xl font-bold md:text-2xl">
        {id ? `Editing Game ${id}` : "New Game"}
      </h1>
      <div>
        <Autocomplete
          items={leagueField.results}
          loading={isLoading}
          label="League"
          placeholder="Game under which league?"
          size="sm"
          className="max-w-sm"
          selectedKey={leagueField.selectedKey}
          inputValue={leagueField.inputValue}
          onInputChange={(value) => {handleLeagueInput(value)}}
          onSelectionChange={(key) => {
            setLeagueField( prev => {
              const league = leagueField.results.find( league => league.id === key) || {}
              return {
                ...prev,
                selectedValue: league.title || "",
                inputValue: league.title || "",
                selectedKey: key || null,
              }
            })
          }}

        >
          {
            league => (
              <AutocompleteItem key={league.id}> {league.title}</AutocompleteItem>
            )
          }
        </Autocomplete>
      </div>
    </>
  );
}
