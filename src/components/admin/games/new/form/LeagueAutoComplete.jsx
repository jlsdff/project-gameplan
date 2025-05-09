import React, { useCallback, useEffect, useState } from "react";
import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { getLeaguesByLikeTitle } from "@/utils/leagueAPI";
import { useNewGameStore } from "../gameStore";


const searchLeagues = async (input) => {
  
  if(!input) return []
  
  const results = await getLeaguesByLikeTitle(input).then((snap) =>
    snap.docs.map((doc) => ({ id: doc.id, ref: doc.ref, ...doc.data() }))
  );
  console.log(results)

  return results

};

export default function LeagueAutoComplete({id, ...props}) {

  const { league, setLeague } = useNewGameStore()

  const [fieldState, setFieldState] = useState({
    selectedkey: "",
    inputValue: "",
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["leagues", fieldState.inputValue],
    queryFn: async () => {
      return await searchLeagues(fieldState.inputValue)
    },
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
  });
  
  const onInputChange = (value) => {
    setFieldState({
      ...fieldState,
      inputValue: value,
    });
  };

  const onSelectionChange = (key) => {
    const selectedItem = data?.find((item) => item.id === key);
    
    if (selectedItem) {
      setLeague(selectedItem)
      setFieldState((prev) => ({
        inputValue: selectedItem.title,
        selectedkey: key,
      }));
    }

  };

  return (
    <Autocomplete
      inputValue={fieldState.inputValue}
      isLoading={isLoading}
      defaultItems={data || []}
      label="Search for a league"
      onInputChange={onInputChange}
      onSelectionChange={onSelectionChange}
      selectedKey={fieldState.selectedkey}
      {...props}
    >
      {(item) => <AutocompleteItem key={item.id}>{item.title}</AutocompleteItem>}
    </Autocomplete>
  );
}
