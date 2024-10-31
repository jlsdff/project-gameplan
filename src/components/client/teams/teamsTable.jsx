import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import SearchBarClient from "@/components/ui/searchBar/searchBar";
import TableDataDisplay from "@/components/client/teams/tableDataDisplay";
import { firestore } from "@/lib/firebase/firebase";
import {
  getTeamsByPage,
  getTeamByName,
  getTeamsByLastRef,
  getGamesByTeamId,
} from "@/utils/teamAPI";
import { getTeamCount } from "@/utils/countersAPI";
import PaginationUI from "@/components/ui/pagination";
import { Spinner, Button } from "@nextui-org/react";
import { useInfiniteQuery } from "@tanstack/react-query";

const columns = [
  {
    key: "team",
    title: "Team",
  },
  {
    key: "wins",
    title: "Wins",
  },
  {
    key: "losses",
    title: "Losses",
  },
  {
    key: "ppg",
    title: "PPG",
  },
  {
    key: "apg",
    title: "APG",
  },
  {
    key: "rpg",
    title: "RPG",
  },
  // {
  //   key: "winstreak",
  //   title: "Winstreak",
  // },
  {
    key: "fgp",
    title: "FG%",
  },
];


const getTeams = async ({ pageParam, limit }) => {
  
  let teams;
  
  if (pageParam?.cursorRef === 0 || pageParam?.cursorRef === null || pageParam?.cursorRef === undefined) {
    teams = await getTeamsByLastRef(null, limit)
  } else {
    teams = await getTeamsByLastRef(pageParam.cursorRef, limit)
  }

  teams = teams.docs.map( doc => ({ id: doc.id, ref: doc,  ...doc.data() }) );
  teams = await Promise.all(
    teams.map(async (team) => {
      const games = await getGamesByTeamId(team.id).then((snapshot) =>
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
      return {
        ...team,
        games,
      };
    })
  );
  console.log("Returning Teams: ", teams);
  return {
    teams: [...teams],
    hasMore: teams.length === limit,
  };
};

function Main({ name, page }) {
  const limit = 10;

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["teams"],
    queryFn: ({ pageParam }) => getTeams({ pageParam, limit }),
    getNextPageParam: (lastPage) => {
      const lastDoc = lastPage.teams[lastPage.teams.length - 1];
      console.log("The next ref would be: ", lastDoc.ref)
      return lastPage.hasMore ? { cursorRef: lastDoc.ref } : undefined;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    suspense: true,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  if (data) {
    console.log("Data", data);
  }

  const teamsData = useMemo(() => {
    const teams = data?.pages.map((page) => page.teams).flat();
    return teams;
  }, [data]);

  return (
    <main className="px-8 py-4 sm:py-8 sm:px-16">
      <h1 className="mb-2 text-xl font-bold sm:text-2xl">Teams</h1>
      <div>
        {/* <SearchBarClient
              label="Search Teams"
              searchUrl={"/teams?name="}
              inputProps={{ size: "sm" }}
              initialValue={name || ""}
            /> */}
        <div className="w-full my-4 overflow-x-auto">
          <TableDataDisplay columns={columns} items={teamsData} />
        </div>
        <div className="flex items-center justify-center w-full">
        <Button
          onClick={() => fetchNextPage()}
          variant="light"
          size="sm"
          isLoading={isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "No More Teams"}
        </Button>
      </div>
      </div>
    </main>
  );
}

const Loading = () => {
  return <div>Loading...</div>;
};

export default function TeamsTable() {
  return (
    <Suspense fallback={<Loading />}>
      <Main />
    </Suspense>
  );
}
