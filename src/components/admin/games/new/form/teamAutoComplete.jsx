import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useNewGameStore } from "../gameStore";
import { useState } from "react";

export default function TeamAutoComplete({id, setTeam, ...props}) {

  const [fieldState, setFieldState] = useState({
    selectedkey: "",
    inputValue: "",
  });

  const { teamParticipants } = useNewGameStore()

  const onSelectionChange = (key) => {
    const selectedItem = teamParticipants?.find((item) => item.id === key);
    if(selectedItem) {
      setTeam(selectedItem)
      setFieldState((prev) => ({
        inputValue: selectedItem.teamName,
        selectedkey: key,
      }));
    }
  }

  return (
    <Autocomplete
      inputValue={fieldState.inputValue}
      defaultItems={teamParticipants || []}
      onInputChange={(value) => setFieldState({ ...fieldState, inputValue: value })}
      onSelectionChange={onSelectionChange}
      selectedKey={fieldState.selectedkey}
      isDisabled={teamParticipants?.length === 0}
      className="disabled:opacity-50 "
      {...props}
    > 
      {
        item => <AutocompleteItem key={item.id}>{item.teamName}</AutocompleteItem>
      }
    </Autocomplete>
  )
}