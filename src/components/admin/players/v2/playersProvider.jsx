"use client";
import React, {
  useContext,
  createContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import PlayerAPI from "@/utils/v2/playerAPI";
import { useRouter, useSearchParams } from "next/navigation";
import { useDisclosure } from "@nextui-org/react";

export const PlayersContext = createContext({
  searchInput: "",
  setSearchInput: () => {},
  playerCount: 0,
  players: [],
  isFetching: false,
  fetchPlayers: () => {},
});



export default function PlayersProvider({ children }) {

  const params = useSearchParams()
  const router = useRouter()
  const [searchInput, setSearchInput] = useState("");
  const [playerCount, setPlayerCount] = useState(0);
  const [players, setPlayers] = useState([])
  const [isFetching, setIsFetching] = useState(false)

  const getPlayerCount = useCallback(async () => {
    const players = await PlayerAPI.countPlayers().then((res) => {
      const count = res.data().size;
      setPlayerCount(count);
    });
    return players;
  }, []);

  const fetchPlayers = async (name) => {

    try {

      if(name) {
        const res = await PlayerAPI.getPlayerByName(name)
        console.log(`BY NAME: ${name}: `,res.docs)
        setPlayers(res.docs)
        router.push('?name='+name)
        return
      }

      setIsFetching(true)
      const lastDoc = players[players.length - 1]

      const res = await PlayerAPI.getPlayerByDocumentSnap(lastDoc, 10)
      setPlayers((prev) => [...prev, ...res.docs])

    } catch(err) {
      console.log(err)
    } finally {
      setIsFetching(false)
    }

  }

  const initialFetch = useCallback( async () => {
    try {

      const name = params.get("name");

      if(name) {
        const res = await PlayerAPI.getPlayerByName(name)
        console.log("By name:",res.docs)
        setPlayers(res.docs)
        return
      }

      setIsFetching(true)
      const res = await PlayerAPI.getPlayerByDocumentSnap(null, 10)
      setPlayers(res.docs)
    }
    catch(err) {
      console.log(err)
    }
    finally {
      setIsFetching(false)
    }

  },[])
  
  useEffect(() => {
    getPlayerCount();
    initialFetch();
  }, []);
  

  const value = {
    searchInput,
    setSearchInput,
    playerCount,
    players,
    isFetching,
    fetchPlayers
  };

  return (
    <PlayersContext.Provider value={value}>{children}</PlayersContext.Provider>
  );
}
