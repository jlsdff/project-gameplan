import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import TableSkeleton from "@/components/ui/skeletons/TableSkeleton";
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
import { Spinner, Button, Input } from "@nextui-org/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import SearchIcon from "@/assets/searchIcon";
import { motion } from "framer-motion";
import { getByPath } from "@/utils/generalAPI";
import useAlgolia from "@/hooks/useAlgolia";
import { playerColumns } from "@/helpers/players/columns";
import { Helmet } from "react-helmet";

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

  if (
    pageParam?.cursorRef === 0 ||
    pageParam?.cursorRef === null ||
    pageParam?.cursorRef === undefined
  ) {
    teams = await getTeamsByLastRef(null, limit);
  } else {
    teams = await getTeamsByLastRef(pageParam.cursorRef, limit);
  }

  teams = teams.docs.map((doc) => ({ id: doc.id, ref: doc, ...doc.data() }));
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
      console.log("The next ref would be: ", lastDoc.ref);
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
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="px-8 py-4 sm:py-8 sm:px-16"
    >
      <h1 className="mb-2 text-xl font-bold sm:text-2xl">Teams</h1>
      <div>
        <div className="mb-2">
          <SearchBar name={name} />
        </div>
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
    </motion.main>
  );
}

const Loading = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <div className={"w-full overflow-x-scroll scrollbar-hide"}>
        <TableSkeleton />
      </div>
    </motion.div>
  );
};

const SearchBar = ({ name }) => {
  const [inputVal, setInputVal] = useState(name || "");
  const router = useRouter();
  const onSubmit = (e) => {
    e.preventDefault();
    router.push(`/teams?name=${inputVal}`);
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
        label="Search Teams..."
        onValueChange={(value) => setInputVal(value)}
        value={inputVal}
      />
      <Button isIconOnly variant="ghost" size="md" type="submit">
        <SearchIcon />
      </Button>
    </form>
  );
};

const processTeamHits = async ({ hits, nextPage }) => {
  let teams = await Promise.all(
    hits.map(async (hit) => {
      return await getByPath(hit.path);
    })
  );

  teams = teams.map((team) => ({
    id: team.id,
    ref: team,
    ...team.data(),
  }));

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
    hits: [...teams],
    nextPage,
  };
};

const SearchResults = ({ name }) => {
  const limit = 10;

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
    indexName: "teams",
    query: name,
    customQueryFn: processTeamHits,
    limit: limit,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const teamsData = useMemo(() => {
    const flattened = data?.pages?.map((page) => page.hits).flat();
    console.log("Flattened: ", flattened);
    console.log("Hits: ", hits);
    console.log("Data: ", data);
    return flattened;
  }, [data, hits]);

  return (
    <section className="px-8 py-4 sm:py-8 sm:px-16">
      <section>
        <SearchBar name={name} />
      </section>
      {isLoading &&   <Loading />}
      {!isLoading && !isFetching && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="overflow-x-auto"
        >
          <TableDataDisplay
            columns={columns}
            items={data.pages.map((page) => page.hits).flat()}
            loading={isLoading}
          />
        </motion.section>
      )}
    </section>
  );
};

export default function TeamsTable({ name, page }) {
  return (
    <>
    <Helmet>
      <title>Teams</title>
      <meta
        name="description"
        content="View all the teams in the league"
      />
    </Helmet>
    <Suspense
      fallback={
        <section className="px-8 py-4 sm:py-8 sm:px-16">
          <Loading className="w-full overflow-x-scroll scrollbar-hide" />
        </section>
      }
    >
      {name ? <SearchResults name={name} /> : <Main />}
    </Suspense>
      </>
  );
}
