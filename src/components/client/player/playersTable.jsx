import React, {useMemo, useState, useEffect, useCallback} from 'react'
import SearchBarClient from '@/components/ui/searchBar/searchBar'
import { Divider } from '@nextui-org/react'
import TableClient from './tableClient'
import PaginationUI from '@/components/ui/pagination'
import {
  getPlayerByLikeName,
  getPlayersByPage,
  getPlayersGameRecords,
} from "@/utils/playerAPI";
import { getPlayerCount } from "@/utils/countersAPI";

export default function PlayersTable({page, name}) {

  const [players, setPlayers] = useState([])
  const [playersCount, setPlayersCount] = useState(0)
  const [loading, setLoading] = useState(true)

  const columns = useMemo(()=>[
    {
      key: "number",
      label: "#",
      description: "Jersey Number",
    },
    {
      key: "player",
      label: "Player",
      description: "Player Name",
    },
    {
      key: "PPG",
      label: "PPG",
      description: "Points Per Game",
    },
    {
      key: "APG",
      label: "APG",
      description: "Assists Per Game",
    },
    {
      key: "RPG",
      label: "RPG",
      description: "Rebounds Per Game",
    },
    {
      key: "SPG",
      label: "SPG",
      description: "Steals Per Game",
    },
    {
      key: "BPG",
      label: "BPG",
      description: "Blocks Per Game",
    },
    {
      key: "FG%",
      label: "FG%",
      description: "Field Goal Percentage",
    },
  ],[])

  const fetchData = useCallback( async () => {
    if (name) {
      const players = await getPlayerByLikeName(name).then((res) =>
        res.map((player) => {
          return {
            id: player.id,
            ...player.data(),
          };
        })
      );

      const proms = await getPlayersGameRecords(players).then((res) =>
        res.map((player) => {
          return {
            ...player,
          };
        })
      );

      return {
        players: proms,
        playersCount: 1,
      };
    }

    const playersCount = await getPlayerCount();

    const players = await getPlayersByPage(page - 1, 5).then((data) => {
      return data.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
    });

    const proms = await getPlayersGameRecords(players).then((res) =>
      res.map((player) => {
        return {
          ...player,
        };
      })
    );

    return {
      players: proms,
      playersCount,
    };
  }, [name, page])

  useEffect(()=>{
    try {
      fetchData().then((data) => {
        setPlayers(data.players);
        setPlayersCount(data.playersCount);
        console.log(players)
      }).catch(error => {
        console.error(error)
        throw new Error(error)
      })

    }catch(error){
      console.error(error)
    }finally{
      setLoading(false)
    }
  },[fetchData])
  
  return (
    // <div>PlayersTable</div>
    <section className="px-8 py-4 sm:py-8 sm:px-16">
      <h1 className="mb-2 text-xl font-bold sm:text-2xl">Players</h1>
      {/* Search Bar */}
      <div>
        <SearchBarClient
          label="Search Player"
          searchUrl={"/players?name="}
          inputProps={{ size: "sm" }}
        />
      </div>
      <Divider className="my-2" />
      {/* Table */}
      <div className="w-full overflow-x-scroll">
        <TableClient columns={columns} items={players} loading={loading} />
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-center mt-2">
        <PaginationUI
          url="/players?page="
          totalPage={playersCount}
          currentPage={page || 1}
        />
      </div>
    </section>
  )
}
