import React, { useCallback, useContext, useState } from "react";
import { PlayersContext } from "./playersProvider";
import { Input, Button, Tooltip, useCalendar } from "@nextui-org/react";
import SearchIcon from "@/assets/searchIcon";
import AddIcon from "@/assets/addIcon";
import { useRouter } from "next/navigation";
import { PlayerModalContext } from "./modal/playerModalProvider";
import WriteFullname from "../../../../../scripts/writefullname";

export default function AdminPlayerSearchBar() {

  const playerContext = useContext(PlayersContext);
  const modalContext = useContext(PlayerModalContext)
  const router = useRouter()

  //playerscripts
  const [loading, setLoading] = useState(false)
  
  const startScript = useCallback( async () => {
    
    try {
      setLoading(true)
      WriteFullname()
    } catch (error) {
      console.error("Error starting script", error)
    } finally {
      setLoading(false)
    }
    
  }, [])

  const onSubmit = (e) => {
    e.preventDefault();
    playerContext.fetchPlayers(playerContext.searchInput)
  };

  const newPlayer = () => {
    modalContext.setType("New Player")
    modalContext.setSize('5xl')
    modalContext.dispatchPlayer({type: "reset"})
    modalContext.onOpen();
  };

  const importPlayers = () => {
    modalContext.setType("Import Players")
    modalContext.dispatchPlayer({type: "reset"})
    modalContext.setSize('full')
    modalContext.onOpen();
  }

  const exportPlayers = () => {
    console.log("Export Player Button")
  }

  return (
    <section className="flex items-center gap-3">
      <form onSubmit={onSubmit} className="flex items-center w-full gap-2">
        <Input
          label="Search Player"
          placeholder="Enter player name"
          value={playerContext.searchInput}
          onValueChange={playerContext.setSearchInput}
        />
        <Button type="submit" color="primary" isIconOnly>
          <SearchIcon />
        </Button>
      </form>
      <Tooltip content="New Player">
        <Button isIconOnly onClick={newPlayer}>
          <AddIcon />
        </Button>
      </Tooltip>
      <Tooltip content="Batch import">
        <Button onPress={importPlayers}>
          Import
        </Button>
      </Tooltip>
      <Tooltip content="Download All Players">
        <Button onPress={exportPlayers}>
          Export
        </Button>
      </Tooltip>
      {/* DEV SCRIPTS */}
      <Tooltip content="Batch import" >
        <Button onPress={startScript} isLoading={loading} isDisabled={true} className="disabled:bg-current/5 disabled:cursor-not-allowed">
          Apply Script
        </Button>
      </Tooltip>
    </section>
  );
}
