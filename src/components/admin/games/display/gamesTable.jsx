import { Suspense, useCallback, useMemo, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getGamesByLastRef, getGamesByPage, loadTeam, deleteGameById } from "@/utils/gamesAPI";
import { getLeagueById } from "@/utils/leagueAPI";
import {
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
  ButtonGroup,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import TableSkeleton from "@/components/ui/skeletons/TableSkeleton";
import ChevronIcon from "@/assets/chevronIcon";
import { useRouter } from "next/navigation";
import AddIcon from "@/assets/addIcon";
import EditIcon from "@/assets/editIcon";
import DeleteIcon from "@/assets/deleteIcon";
import ImportIcon from "@/assets/importIcon";
import ImportModal from "./importModal";
import { toast } from "sonner";

const fetchGames = async ({ pageParam, limit }) => {
  const { cursor } = pageParam;
  let games;

  // GET GAMES BY LAST REF
  if (!cursor) {
    games = await getGamesByLastRef(null, limit);
  } else {
    games = await getGamesByLastRef(cursor, limit);
  }

  // ORGRANIZE GAMES
  games = games.docs.map((doc) => ({ id: doc.id, ref: doc, ...doc.data() }));
  console.log("org games: ", games);
  // LOAD TEAMS
  games = await Promise.all(
    games.map(async (game) => {
      let teams = game.teams;
      teams = await loadTeam(teams).then((teams) =>
        teams.map((team) => ({ id: team.id, ref: team, ...team.data() }))
      );
      return {
        ...game,
        teams,
      };
    })
  );
  // LOAD LEAGUES
  games = await Promise.all(
    games.map(async (games) => {
      let league = await getLeagueById(games.leagueId).then((league) => ({
        id: league.id,
        ref: league,
        ...league.data(),
      }));
      return {
        ...games,
        league,
      };
    })
  );
  console.log("LOADED TEAMS: ", games);

  return {
    games,
    hasMore: games.length === limit,
  };
};

const _ButtonGroup = ({ action }) => {
  const router = useRouter();

  const newGame = () => router.push("/admin/dashboard/games/new");

  return (
    <ButtonGroup>
      <Button startContent={<AddIcon size={14} />} onClick={newGame}>
        New Game
      </Button>
      <Dropdown>
        <DropdownTrigger>
          <Button isIconOnly>
            <ChevronIcon size={14} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="actions" onAction={(key) => action(key)}>
          <DropdownItem key="import" startContent={<ImportIcon size={14}/>} >Import Game</DropdownItem>
          <DropdownItem key="download-template">Download Sheet Template</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </ButtonGroup>
  );
};

const Main = () => {
  const limit = 10;
  const { isOpen, onOpen, onOpenChange, getButtonProps } = useDisclosure();

  const { data, isError, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["games"],
      queryFn: ({ pageParam }) => fetchGames({ pageParam, limit }),
      initialPageParam: { cursor: null },
      getNextPageParam: (lastPage) => {
        const lastDoc = lastPage.games[lastPage.games.length - 1];
        return lastPage.hasMore ? { cursor: lastDoc.ref } : undefined;
      },
      suspense: true,
      staleTime: Infinity,
      gcTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    });

  const games = useMemo(
    () => data?.pages.map((page) => page.games).flat(),
    [data]
  );

  const dropdownActions = useCallback((key) => {
    switch (key) {
      case "import":
        alert("Not yet implemented");
        onOpen();
        break;
      case 'download-template':
        alert("Not yet implemented");
        break;
      default:
        return null;
    }
  }, []);

  const BottomContent = hasNextPage ? (
    <div className="flex justify-center w-full">
      <Button isLoading={isFetchingNextPage} onClick={() => fetchNextPage()}>
        {isFetchingNextPage ? "Loading more..." : "Load More"}
      </Button>
    </div>
  ) : null;

  const TopContent = (
    <section className="flex items-center justify-between w-full mb-2">
      <ImportModal isOpen={isOpen} onOpenChange={onOpenChange} onOpen={onOpen}/>
      <h1 className="text-xl md:text-2xl">Recent Games</h1>
      <_ButtonGroup action={dropdownActions} />
    </section>
  );

  if (isError) {
    return (
      <section className="w-full h-full flex justify-center items-center gap-2.5 flex-col">
        <h1 className="text-xl text-red-500 sm:text-2xl">Error</h1>
        <p>Something went wrong fetching games</p>
      </section>
    );
  }

  return (
    <main>
      <_Table
        items={games}
        bottomContent={BottomContent}
        topContent={TopContent}
      />
    </main>
  );
};

const _Table = ({ items, bottomContent, topContent }) => {
  const { isOpen, onOpen, onOpenChange, getButtonProps } = useDisclosure();
  const selectedGame = useRef(null);

  const columns = [
    {
      key: "teamA",
      label: "TEAM A",
    },
    {
      key: "teamB",
      label: "TEAM B",
    },
    {
      key: "league",
      label: "LEAGUE",
    },
    {
      key: "date",
      label: "DATE",
    },
    {
      key: "actions",
      label: "ACTIONS",
    },
  ];

  const renderCell = useCallback((item, key) => {
    switch (key) {
      case "teamA":
        const teamA = item.teams.find((team) => team.id === item.teamA.id);
        return (
          <div className="flex items-center justify-between">
            <User
              src={teamA?.teamLogo}
              name={teamA?.teamName}
              description={teamA?.teamAbbr}
            />
            <span>{item.teamA.stats.points}</span>
          </div>
        );
      case "teamB":
        const teamB = item.teams.find((team) => team.id === item.teamB.id);
        return (
          <div className="flex items-center justify-between">
            <User
              src={teamB?.teamLogo}
              name={teamB?.teamName}
              description={teamB?.teamAbbr}
            />
            <span>{item.teamB.stats.points}</span>
          </div>
        );
      case "league":
        return (
          <div>
            <User src={item.league.leagueImage} name={item.league.title} />
          </div>
        );
      case "date":
        return (
          <div>
            {item.date.toDate().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </div>
        );
      case "actions":
        return (
          <div>
            <ButtonGroup>
              <Button
                variant="ghost"
                size="sm"
                startContent={<EditIcon size={14} />}
              >
                Edit
              </Button>
              <Button
                variant="light"
                size="sm"
                color="danger"
                onClick={() => {
                  selectedGame.current = item;
                  onOpen();
                }}
                startContent={<DeleteIcon size={14} />}
              >
                Delete
              </Button>
            </ButtonGroup>
          </div>
        );
      default:
        return <div>null</div>;
    }
  });

  const deleteGame = async () => {
    console.log("Deleting Game: ", selectedGame.current.id);
    try {
      await deleteGameById(selectedGame.current.id).then(res => {
        toast.success("Delete Successfully")
      })
    } catch(e) {
      console.error(e)
      toast.error("Something went wrong")
    }
  };

  const editGame = async () => {
    console.log("Editing Game: ", selectedGame.current.id);
  }

  return (
    <section className="overflow-x-auto">

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h1>Delete Game</h1>
              </ModalHeader>
              <ModalBody>
                <h2 className="font-semibold">Are you sure you want to delete this game? </h2>
                {
                  selectedGame.current && (
                    <div className="space-y-1">
                      <h3>Game: {selectedGame.current.id}</h3>
                      <p>League: {selectedGame.current.league.title} </p>
                      <p>
                        Date:{" "}
                        {selectedGame.current.date.toDate().toLocaleDateString()}
                      </p>
                    </div>
                  )
                }
              </ModalBody>
              <ModalFooter>
                <Button color="light" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="danger"
                  onPress={() => {
                    deleteGame();
                    onClose();
                  }}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Table
        aria-labelledby="games table"
        removeWrapper
        bottomContent={bottomContent}
        topContent={topContent}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </section>
  );
};

const Loading = () => {
  return (
    <section>
      <TableSkeleton />
    </section>
  );
};

export default function GamesTable() {
  return (
    <Suspense
      fallback={
        <div>
          <Loading />
        </div>
      }
    >
      <Main />
    </Suspense>
  );
}
