"use client";
import { useCallback, useEffect, useMemo, useState, useContext } from "react";
import Averages from "@/components/ui/player/averages";
import { Divider, Select, SelectItem } from "@heroui/react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import PlayerTable from "@/components/client/player/v2/PlayerTable";
import { firestore } from "@/lib/firebase/firebase";
import { usePlayerStore } from "./PlayerWrapper";
import { useQueryClient } from "@tanstack/react-query" 
import { PlayerContext } from "@/context/playerContext";

export default function Player() {

  const { player, games, leagues } = useContext(PlayerContext);

  const league = useSearchParams().get("league");

  const displayedGames = useMemo(() => {
    if (
      league === "all" ||
      league === "null" ||
      league === "undefined" ||
      league === null ||
      league === undefined ||
      !leagues.some( l => l.id === league )
    ) {
      return games;
    }
    return games.filter((game) => game.leagueId === league);
  }, [league, games])

  const leagueSelection = useMemo(() => {
    const selection = [{ name: "All", id: "all" }];
    leagues.forEach((league) => {
      selection.push({
        name: league.title,
        id: league.id,
      });
    });
    return selection;
  }, [leagues]);

  return (
    <main className="px-8 py-4 sm:py-8 sm:px-16">
      <section>
        <Averages player={player} games={displayedGames} />
      </section>
      <Divider className="my-4" />
      <section className="flex flex-col sm:flex-row gap-2 justify-between items-center">
        <h2 className="sm:text-xl font-semibold text-lg">Games Played</h2>
          <div className="min-w-[300px]">
            <LeagueFilter leagues={leagueSelection} />
          </div>
      </section>
      <section className="mt-4">
        <PlayerTable games={displayedGames} />
      </section>
    </main>
  );
}

function LeagueFilter({ leagues }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  let initialValue;
  if(
    searchParams.get("league") === null ||
    searchParams.get("league") === undefined ||
    searchParams.get("league") === "null" ||
    searchParams.get("league") === "undefined" 
  ) {
    initialValue = "all"
  } else {
    const leagueParam = searchParams.get("league")
    if(leagues.some( league => league.id === searchParams.get("league") )) {
      initialValue = leagueParam;
    } else {
      initialValue = "all"
    }
  }

  const [selected, setSelected] = useState(new Set([initialValue]));

  const handleSelectionChange = (selected) => {
    setSelected(selected);

    if (selected.currentKey === searchParams.get("league")) return;
    if (selected.currentKey === "all") {
      router.push(pathname);
      return;
    }

    const url = `${pathname}?league=${selected.currentKey}`;
    router.push(url);
  };

  return (
    <>
      <div>
        <Select
          label="Filter by League"
          size="sm"
          selectedKeys={selected}
          onSelectionChange={(selected) => handleSelectionChange(selected)}
        >
          {leagues.map((league) => (
            <SelectItem key={league.id}>{league.name}</SelectItem>
          ))}
        </Select>
      </div>
    </>
  );
}


