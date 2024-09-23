import React, {useContext} from "react";
import { Checkbox, Input } from "@nextui-org/react";
import { PlayerModalContext } from "./playerModalProvider";

export default function PlayerModalBody({ data, onChange }) {

  const playerContext = useContext(PlayerModalContext)
  const {player, dispatchPlayer} = playerContext
  
  return (
    <>
    
    <div className="flex gap-2">
      <Input
        value={player.lastname}
        onValueChange={value => dispatchPlayer({type: 'lastname', value})}
        type="text"
        label="Lastname"
      />
      <Input
        value={player.firstname}
        onValueChange={value => dispatchPlayer({type: 'firstname', value})}
        type="text"
        label="Firstname"
      />
      <Input
        value={player.number}
        onValueChange={value => dispatchPlayer({type: 'number', value})}
        type="number"
        label="Jersey Number"
      />
    </div>
    <div>
      <Input
        value={player.imageUrl}
        label="Image URL"
        onValueChange={(value) => dispatchPlayer({type: 'imageUrl', value})}
       />
    </div>
    <div>
      <h2 className="font-bold">Profile Settings</h2>
      <Checkbox
        isSelected={player.profileSettings.isFullNameVisible}
        onValueChange={(value) => dispatchPlayer({type: 'isFullNameVisible', value})}
      >
        Display Full Name
      </Checkbox>
    </div>
    </>
  );
}
