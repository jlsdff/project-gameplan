import React from "react";
import {
  getPlayerByLikeName,
  getPlayersByPage,
  getPlayersGameRecords,
} from "@/utils/playerAPI";
import { getPlayerCount } from "@/utils/countersAPI";
import PaginationUI from "@/components/ui/pagination";
import SearchBarClient from "@/components/ui/searchBar/searchBar";
import TableClient from "@/components/client/player/tableClient";
import { Divider } from "@nextui-org/react";

async function getData(params) {
  if (params.name) {
    const players = await getPlayerByLikeName(params.name).then((res) =>
      res.map((player) => {
        return {
          id: player.id,
          ...player.data(),
        };
      })
    );

    const proms = await getPlayersGameRecords(players).then((res) =>
      res.map((player) => {
        const { gameRecords } = player;
        console.log(gameRecords)
        // return {
        //   ...player,
        //   ppg: ((gameRecords.reduce(
        //     (acc, record) =>
        //       acc +
        //       record.twoPointsMade * 2 +
        //       record.threePointsMade * 3 +
        //       record.freeThrowsMade,
        //     0
        //   )) / gameRecords.length).toFixed(2),
        //   apg: (
        //     gameRecords.reduce((acc, record
        //     ) => acc + record.assists, 0) / gameRecords.length
        //   ).toFixed(2),
        //   rpg: (
        //     gameRecords.reduce((acc, record) => acc + record.rebounds, 0) /
        //     gameRecords.length
        //   ).toFixed(2),
        // };
      })
    );

    console.log(players);

    return {
      players,
      playersCount: 1,
    };
  }

  const page = params.page || 0;

  const playersCount = await getPlayerCount();

  const players = await getPlayersByPage(page - 1, 5).then((data) => {
    return data.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
  });

  return {
    players,
    playersCount,
  };
}

export default async function Players({ searchParams }) {
  const { players, playersCount } = await getData(searchParams);

  const columns = [
    {
      key: "number",
      label: "#",
    },
    {
      key: "player",
      label: "Player",
    },
    {
      key: "PPG",
      label: "PPG",
    },
    {
      key: "APG",
      label: "APG",
    },
    {
      key: "RPG",
      label: "RPG",
    },
  ];

  return (
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
      <TableClient columns={columns} items={players} />
      {/* Pagination */}
      <div className="flex items-center justify-center mt-2">
        <PaginationUI
          totalPage={playersCount}
          currentPage={searchParams.page}
        />
      </div>
    </section>
  );
}
