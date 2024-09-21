import React, { useContext } from "react";
import { PlayersContext } from "./playersProvider";
import { Input, Button, Tooltip } from "@nextui-org/react";
import SearchIcon from "@/assets/searchIcon";
import AddIcon from "@/assets/addIcon";
import { useRouter } from "next/navigation";

export default function AdminPlayerSearchBar() {

  const playerContext = useContext(PlayersContext);
  const router = useRouter()
  

  const onSubmit = (e) => {
    e.preventDefault();
    playerContext.fetchPlayers(playerContext.searchInput)
  };

  const newPlayer = () => {};

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
    </section>
  );
}
