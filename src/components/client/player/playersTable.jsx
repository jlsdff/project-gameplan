import React, { useMemo, useState, useEffect, useCallback, Suspense } from "react";
import SearchBarClient from "@/components/ui/searchBar/searchBar";
import { Divider, Button } from "@nextui-org/react";
import TableClient from "./tableClient";
import PaginationUI from "@/components/ui/pagination";
import {
  getPlayerByLikeName,
  getPlayersByPage,
  getPlayersGameRecords,
  getLastPlayedTeam,
} from "@/utils/playerAPI";
import { getPlayerCount } from "@/utils/countersAPI";
import { useInfiniteQuery } from "@tanstack/react-query";
import { faker } from "@faker-js/faker";

const fetchData = async ({pageParams}) => {
  console.log("fetching data: ", pageParams);
  return [
    {
      name: faker.person.fullName(),
      number: faker.number.int(1, 100)
    }
  ]
  // Get the first 10 players
  // let players = await getPlayersByPage(page - 1, 10).then((data) => {
  //   return data.docs.map((doc) => {
  //     return {
  //       id: doc.id,
  //       ref: doc.ref,
  //       ...doc.data(),
  //     };
  //   });
  // });

  // // Get last played team
  // players = await Promise.all(
  //   players.map(async (player) => {
  //     const lastTeam = await getLastPlayedTeam(player.id);
  //     return {
  //       ...player,
  //       lastTeam: lastTeam,
  //     };
  //   })
  // );

  // // GET PLAYER GAME RECORDS
  // const proms = await getPlayersGameRecords(players).then((res) =>
  //   res.map((player) => {
  //     return {
  //       ...player,
  //     };
  //   })
  // );

  // return [...proms]
}

function Main({ page, name }) {

  const fetchPlayers = async ({ pageParam = 0 }) => {
    console.log("fetching data: ", pageParam);
    return {
      players: [1, 2, 3, 4, 5].map((i) => ({
        name: faker.person.fullName(),
        number: faker.number.int({ min: 1, max: 100 }),
      })),
      nextPage: pageParam + 1,
      hasMore: pageParam < 4, // Assuming there are 5 pages in total
    };
  };
  const columns = useMemo(
    () => [
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
        key: "LPT",
        label: "Current Team",
        description: "Current Team"
      }
    ],
    []
  );

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["players"],
    queryFn: fetchPlayers,
    getNextPageParam: (lastPage) => {
      console.log("lastPage: ", lastPage);
      return lastPage.hasMore ? lastPage.nextPage : undefined;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    suspense: true,
    staleTime: Infinity,
  });

  console.log("data: ", data);

  return (
    <div>
      <div className="mb-2.5 font-bold">PlayersTable</div>
      {data.pages.map((page, i) => (
        <React.Fragment key={i}>
          {page.players.map((player, j) => (
            <div key={j}>{player.name}</div>
          ))}
        </React.Fragment>
      ))}
      <Button onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
        {isFetchingNextPage ? "Loading more..." : hasNextPage ? "Load More" : "No More Players"}
      </Button>
    </div>
    // <div>PlayersTable</div>
    // <section className="px-8 py-4 sm:py-8 sm:px-16">
    //   <h1 className="mb-2 text-xl font-bold sm:text-2xl">Players</h1>
    //   {/* Search Bar */}
    //   <div>
    //     <SearchBarClient
    //       label="Search Player"
    //       searchUrl={"/players?name="}
    //       inputProps={{ size: "sm" }}
    //     />
    //   </div>
    //   <Divider className="my-2" />
    //   {/* Table */}
    //   <div className="w-full overflow-x-scroll">
    //     <TableClient columns={columns} items={players} loading={loading} />
    //   </div>
    //   {/* Pagination */}
    //   <div className="flex items-center justify-center mt-2">
    //     <PaginationUI
    //       url="/players?page="
    //       totalPage={playersCount}
    //       currentPage={page || 1}
    //     />
    //   </div>
    // </section>
  );
}

const PlayersTable = ({ page, name }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Main />
    </Suspense>
  )
}

export default PlayersTable;