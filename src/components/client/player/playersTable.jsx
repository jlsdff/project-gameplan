import React, {
  useMemo,
  useState,
  useEffect,
  useCallback,
  Suspense,
} from "react";
import {
  Button,
  Skeleton,
  TableColumn,
  TableHeader,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import TableClient from "./tableClient";
import TableSkeleton from "@/components/ui/skeletons/TableSkeleton";
import {
  getPlayersGameRecords,
  getLastPlayedTeam,
  getPlayersByLastRef,
} from "@/utils/playerAPI";
import { useInfiniteQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";

function Main({ page, name }) {

  const fetchPlayers = async ({ pageParam = 0 }) => {

    let players;

    if (pageParam === 0 || null || undefined) {
      players = await getPlayersByLastRef(null).then((snapshots) => {
        return snapshots.docs.map((player) => ({
          id: player.id,
          ref: player,
          ...player.data(),
        }));
      });
    } else {
      const lastDoc = (players = await getPlayersByLastRef(
        pageParam.cursorRef
      ).then((snapshots) => {
        return snapshots.docs.map((player) => ({
          id: player.id,
          ref: player,
          ...player.data(),
        }));
      }));
    }

    players = await Promise.all(
      players.map(async (player) => {
        const lastTeam = await getLastPlayedTeam(player.id);
        return {
          ...player,
          lastTeam: lastTeam,
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
      players: [...proms],
      hasMore: proms.length >= 10,
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
        description: "Current Team",
      },
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
      const lastDoc = lastPage.players[lastPage.players.length - 1];
      return lastPage.hasMore ? { cursorRef: lastDoc.ref } : undefined;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    suspense: true,
    staleTime: Infinity,
  });

  const playersData = useMemo(() => {
    const players = data.pages.map((page) => page.players).flat();
    return players;
  }, [data]);

  return (
    <motion.section
      className="px-8 py-4 sm:py-8 sm:px-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-2 text-xl font-bold sm:text-2xl">Players</h1>
      </motion.div>
      <TableClient columns={columns} items={playersData} loading={isLoading} />
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
            : "No More Players"}
        </Button>
      </div>
    </motion.section>
  );
}

const Loading = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="px-8 py-4 sm:py-8 sm:px-16"
    >
      <TableSkeleton />
    </motion.section>
  );
};

const PlayersTable = ({ page, name }) => {
  return (
    <Suspense fallback={<Loading />}>
        <Main />
    </Suspense>
  );
};

export default PlayersTable;
