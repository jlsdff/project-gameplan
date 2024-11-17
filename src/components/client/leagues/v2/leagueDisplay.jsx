import {
  getOngoingLeagues,
  getFinishedLeagues,
  getGamesByLeagueId,
} from "@/utils/leagueAPI";
import { josefinSans } from "@/components/fonts";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import {
  Image,
  Link,
  Table,
  TableColumn,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const fetchOngoingLeagues = async () => {
  return await getOngoingLeagues().then((snap) =>
    snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  );
};

const fetchRecentLeagues = async (pageParam, limit) => {
  const { hasMore, lastDoc } = pageParam;

  const finishedLeagues = await getFinishedLeagues(lastDoc, limit)
    .then((snap) =>
      snap.docs.map((doc) => ({ id: doc.id, snap: doc, ...doc.data() }))
    )
    .then((docs) => ({
      leagues: docs,
      hasMore: docs.length === limit,
      lastDoc: docs[docs.length - 1]?.snap,
    }));

  return finishedLeagues;
};

// TODO: ADD RECENT LEAGUES TITLE
export default function LeagueDisplay({}) {
  const { data: ongoingleagues, isError: isOngoingLeaguesError } = useQuery({
    queryKey: ["ongoingLeagues"],
    queryFn: fetchOngoingLeagues,
    suspense: true,
    refetchInterval: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const limit = 5;
  const {
    data: recentleagues,
    isError: isRecentLeaguesError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["recentLeagues"],
    queryFn: ({ pageParam = null }) => fetchRecentLeagues(pageParam, limit),
    initialPageParam: { hasmore: true, lastDoc: null },
    getNextPageParam: (lastPage) => {
      const { hasMore, lastDoc } = lastPage;
      return hasMore ? { hasMore, lastDoc } : undefined;
    },
    suspense: true,
    refetchInterval: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    gcTime: Infinity,
    staleTime: Infinity,
  });

  const finishedLeagues = useMemo(() => {
    return recentleagues?.pages.map((page) => page.leagues).flat();
  }, [recentleagues]);

  return (
    <>
      <Helmet>
        <title>Leagues</title>
        <meta
          name="description"
          content="Ongoing and Finished leagues of Project:Gameplan"
        />
        <meta
          name="keywords"
          content="Leagues, Ongoing Leagues, Finished Leagues"
        />
        <meta name="author" content="Project:Gameplan" />
      </Helmet>
      <section className="min-h-screen px-8 py-4 sm:py-8 sm:px-16">
        <section>
          {isOngoingLeaguesError ? (
            <div className="text-2xl font-black text-red-500">
              Failed to load ongoing leagues
            </div>
          ) : (
            <OngoingLeague OngoingLeagues={ongoingleagues} />
          )}
        </section>
        <section>
          {isRecentLeaguesError ? (
            <div className="text-2xl font-black text-red-500">
              Failed to load recent leagues
            </div>
          ) : (
            <FinishedLeagueTable
              leagues={finishedLeagues}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          )}
        </section>
      </section>
    </>
  );
}

const OngoingLeague = ({ OngoingLeagues }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-2"
    >
      <h1
        className={`mb-2 text-2xl font-black ${josefinSans.className}`}
      >{`Ongoing League${OngoingLeagues.length > 1 && "s"}`}</h1>
      {OngoingLeagues.map((league) => (
        <Banner league={league} key={league.id} />
      ))}
    </motion.div>
  );
};

const Banner = ({ league }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <motion.div
      className="relative w-full group hover:underline"
      key={league.id}
    >
      <Link href={`/leagues?id=${league.id}`}>
        <div className="z-0 w-full sm:max-w-sm">
          <Image
            className="w-full sm:max-w-sm min-h-[100px]"
            loading="lazy"
            onLoad={() => setIsImageLoaded(true)}
            src={league.leagueImage}
            alt={league.title}
          />
        </div>
        <div className="absolute bottom-0 left-0 flex items-end w-full p-2 transition-all duration-300 opacity-0 sm:hidden rounded-xl group-hover:opacity-100 h-1/2 bg-gradient-to-b-transparent-black">
          <h2 className="z-10 text-3xl font-bold sm:text-2xl text-primary">
            {league.title || ""}
          </h2>
        </div>
        {isImageLoaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="hidden md:block ml-2.5"
          >
            <h2 className="text-3xl font-bold sm:text-2xl text-primary">
              {league.title || ""}
            </h2>
            <div className=" text-foreground">
              {league.venue && (
                <h3>
                  <span className="text-lg font-semibold">Venue:</span>
                  <br />
                  <span>{league.venue}</span>
                </h3>
              )}
              {league.gameSchedule && (
                <h3>
                  <span className="text-lg font-semibold">Game Schedule:</span>
                  <br />
                  <span>{displayGameShedule(league)}</span>
                </h3>
              )}
            </div>
          </motion.div>
        )}
      </Link>
    </motion.div>
  );
};

const columnHelper = createColumnHelper();
const FinishedLeagueTable = ({
  leagues,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
}) => {
  const columns = [
    columnHelper.accessor("title", {
      header: "Title",
      cell: ({ getValue }) => (
        <div className="truncate max-w-40">{getValue()}</div>
      ),
    }),
    columnHelper.accessor("venue", {
      header: "Venue",
    }),
    columnHelper.accessor(
      (row) =>
        `${row.dateSchedule.join(", ")} | ${row.timeFrom} - ${row.timeTo}`,
      {
        header: "Schedule",
        cell: ({ row }) => {
          const {
            original: { dateSchedule, timeFrom, timeTo },
          } = row;
          let from;
          let to;
          if (timeFrom && timeTo) {
            from = new Date();
            from.setHours(timeFrom.split(":")[0]);
            from.setMinutes(timeFrom.split(":")[1]);
            to = new Date();
            to.setHours(timeTo.split(":")[0]);
            to.setMinutes(timeTo.split(":")[1]);
          }

          if (from === undefined || to === undefined)
            return dateSchedule.join(", ");

          return `${dateSchedule.join(", ")} | ${from?.toLocaleTimeString(
            "en-US",
            {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            }
          )} - ${to?.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}`;
        },
      }
    ),
    columnHelper.accessor("participatingTeams", {
      header: "No. of Teams",
      cell: ({ row }) => {
        const {
          original: { participatingTeams },
        } = row;
        return participatingTeams?.length || "unknown";
      },
    }),
  ];

  const table = useReactTable({
    data: leagues,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table
      aria-labelledby="Recent Leagues"
      removeWrapper
      className="w-full overflow-x-auto"
      bottomContent={
        <div className="flex justify-center">
          <Button
            size="sm"
            variant="light"
            isLoading={isFetchingNextPage}
            onClick={() => fetchNextPage()}
            isDisabled={!hasNextPage}
          >
            {hasNextPage ? "Load More" : "No More Leagues"}
          </Button>
        </div>
      }
    >
      <TableHeader>
        {table.getHeaderGroups()[0].headers.map((header) => (
          <TableColumn key={header.id}>
            {header.isPlaceholder
              ? null
              : flexRender(header.column.columnDef.header, header.getContext())}
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
