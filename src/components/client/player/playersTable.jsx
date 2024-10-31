import React, {
  useMemo,
  useState,
  useEffect,
  useCallback,
  Suspense,
  useRef,
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
  Input,
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
import { useRouter } from "next/navigation";
import SearchIcon from "@/assets/searchIcon";
import useAlgolia from "@/hooks/useAlgolia";
import { getByPath } from "@/utils/generalAPI";

const columns = [
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
];

function Main({ page, name }) {
  const fetchPlayers = async ({ pageParam = 0 }) => {
    let players;

    if (pageParam?.cursorRef === 0 || pageParam?.cursorRef === null || pageParam?.cursorRef === undefined) {
      players = await getPlayersByLastRef(null).then((snapshots) => {
        return snapshots.docs.map((player) => ({
          id: player.id,
          ref: player,
          ...player.data(),
        }));
      });
    } else {
      players = await getPlayersByLastRef(
        pageParam.cursorRef
      ).then((snapshots) => {
        return snapshots.docs.map((player) => ({
          id: player.id,
          ref: player,
          ...player.data(),
        }));
      });
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
    <motion.main
      className="px-8 py-4 sm:py-8 sm:px-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="mb-2 text-xl font-bold sm:text-2xl">Players</h1>
      <section>
        <SearchBar name={name} />
      </section>
      <section className="w-full overflow-x-scroll scrollbar-hide">
        <TableClient
          columns={columns}
          items={playersData}
          loading={isLoading}
        />
      </section>
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
    </motion.main>
  );
}

const Loading = ({ className }) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`w-full ${className}`}
    >
      <div className={"w-full overflow-x-scroll scrollbar-hide"}>
        <TableSkeleton />
      </div>
    </motion.section>
  );
};

const SearchBar = ({ name }) => {
  const router = useRouter();
  const [inputVal, setInputVal] = useState(name || "");

  const onSubmit = (e) => {
    e.preventDefault();
    if (inputVal === "") return;
    router.push(`/players?name=${inputVal}`);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center justify-center gap-2.5 mb-2.5"
    >
      <Input
        startContent={
          <div className="flex items-center justify-center p-1">
            <SearchIcon size={14} />
          </div>
        }
        isClearable
        variant="bordered"
        radius="md"
        size="md"
        label="Search Player..."
        onValueChange={(value) => setInputVal(value)}
        value={inputVal}
      />
      <Button isIconOnly variant="ghost" size="md" type="submit">
        <SearchIcon />
      </Button>
    </form>
  );
};

const processPlayerHits = async ({ hits, nextPage }) => {
  let players = await Promise.all(
    hits.map(async (player) => {
      return await getByPath(player.path);
    })
  );

  players = players.map((player) => ({
    id: player.id,
    ref: player,
    ...player.data(),
  }));

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
    res.map((player) => ({ ...player }))
  );

  return { hits: [...proms], nextPage };
};

const SearchResults = ({ name }) => {
  const {
    hits,
    data,
    isLoading,
    isFetching,
    status,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useAlgolia({
    indexName: "pgp",
    query: name,
    customQueryFn: processPlayerHits,
    limit: 10,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <main className="px-8 py-4 sm:py-8 sm:px-16">
      <h1 className="mb-2 text-xl font-bold sm:text-2xl">Players</h1>
      <section>
        <SearchBar name={name} />
      </section>
      <section>{isLoading && <Loading className="" />}</section>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          className="overflow-x-auto"
          >
            <TableClient
              columns={columns}
              items={data.pages?.map((page) => page.hits).flat()}
              loading={isLoading}
            />
          </motion.div>
        )}
        <div className="flex items-center justify-center w-full">
          {hasNextPage && (
            <Button
              variant="light"
              onClick={() => fetchNextPage()}
              isLoading={isFetchingNextPage}
              className="disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Load more
            </Button>
          )}
        </div>
      </motion.section>

      <section>{hasNextPage}</section>
    </main>
  );
};

const PlayersTable = ({ page, name }) => {
  return (
    <Suspense
      fallback={
        <section className="px-8 py-4 sm:py-8 sm:px-16">
          <Loading className="w-full overflow-x-scroll scrollbar-hide" />
        </section>
      }
    >
      {name ? <SearchResults name={name} /> : <Main name={name} />}
    </Suspense>
  );
};

export default PlayersTable;
