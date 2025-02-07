"use client";
import { lazy, useCallback, useEffect, useMemo, useState } from "react";
import { useNewGameStore } from "./gameStore";
import LeagueAutoComplete from "./form/LeagueAutoComplete";
import { motion } from "framer-motion";
import { cn } from "@heroui/theme";
import * as XLSX from "xlsx";
import _, { map } from "underscore";
import { getTeamTotalStats } from "@/helpers/getTotalPoints";
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Tab,
  Card,
  Input,
  Tabs,
  Modal,
  useDisclosure,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Checkbox,
  CardBody,
  RadioGroup,
  Radio,
  User,
} from "@heroui/react";
import TeamAutoComplete from "./form/teamAutoComplete";
import GameDatePicker from "./form/gameDataPicker";
import GameNumber from "./form/gameNumber";
import StatTable from "./table/statTable";
import ChevronIcon from "@/assets/chevronIcon";
import ImportIcon from "@/assets/importIcon";
import { createPlayer } from "@/utils/playerAPI";
import { FileUploader } from "react-drag-drop-files";
import { toast } from "sonner";
import {
  checkColumnValidity,
  checkLineUps,
  checkTeamCompatability,
} from "@/utils/statsSheetAPI";
import BasicTable from "@/components/ui/table/BasicTable";
import { createColumnHelper } from "@tanstack/react-table";
import { createGamev2 } from "@/utils/gamesAPI";
import { useRouter } from "next/navigation";

const columnHelper = createColumnHelper();

export default function NewGame({ id }) {
  const {
    league,
    teamA,
    teamB,
    teamAPlayers,
    teamBPlayers,
    number,
    date,
    setTeamA,
    setTeamB,
    stats,
  } = useNewGameStore();
  const router = useRouter()
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSave = useCallback(async() => {

    const gameData = {
      league,
      teamA,
      teamB,
      gameTime: date.toDate(),
      date: date.toDate(),
      number,
      stats: {
        teamA: getTeamTotalStats(stats.teamA),
        teamB: getTeamTotalStats(stats.teamB),
      },
      playerStats: stats,
    }
    console.log("Game Data: ", gameData); 

    try {
      setSubmitting(true)
      await createGamev2({...gameData})
        .then(res => console.log("FINAL: ",res))
        .then(res => {
          router.push('/admin/dashboard/games')
          toast.success("Game created successfully.")
        })
    } catch( err ) {
      console.error(err)
      console.log(err.code)
      if(err.code === 400) {
        toast.error(err.message);
      } else {
        toast.error("An error occured while creating the game.");
      }
    } finally {
      setSubmitting(false)
    }
    
    
  }, [
    league,
    teamA,
    teamB,
    teamAPlayers,
    teamBPlayers,
    date,
    number,
    stats,
  ]);

  return (
    <main>
      <section className="flex items-center justify-between w-full mb-4 ">
        <h1 className="text-xl font-semibold sm:text-2xl">New Game</h1>
      </section>

      <section className="grid grid-cols-1 gap-2 mb-2.5 sm:grid-cols-2 md:grid-cols-3">
        <LeagueAutoComplete />
        <TeamAutoComplete label="Team A" setTeam={setTeamA} />
        <TeamAutoComplete label="Team B" setTeam={setTeamB} />
        <GameDatePicker label="Date" />
        <GameNumber label="Game Number" />
      </section>

      {teamA && teamB && (
        <motion.section
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="my-2.5"
        >
          <div className="">
            <ButtonGroup size="sm" className="" variant="bordered">
              <NewPlayerButton />
              <PlayersButton />
              <ImportButton />
            </ButtonGroup>
          </div>
        </motion.section>
      )}

      {teamAPlayers.length > 0 && teamBPlayers.length > 0 && (
        <motion.section
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Tabs aria-label="tabs-table">
            <Tab key={teamA.teamName} title={teamA.teamName}>
              <StatTable id={id} team="teamA" />
            </Tab>
            <Tab key={teamB.teamName} title={teamB.teamName}>
              <StatTable id={id} team="teamB" />
            </Tab>
          </Tabs>
        </motion.section>
      )}

      <section>
        <Button isLoading={isSubmitting} onClick={handleSave}>Save</Button>
      </section>
    </main>
  );
}

const NewPlayerButton = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [number, setnumber] = useState("");
  const [showFullName, setshowFullName] = useState(false);
  const { newPlayer, teamA, teamB } = useNewGameStore();
  const [team, setteam] = useState(teamA.teamName);

  const handleSave = () => {
    const player = {
      firstname,
      lastname,
      number,
      showFullName,
    };
    newPlayer(player, team === teamA.teamName ? teamA : teamB);
    reset();
  };

  const reset = () => {
    setfirstname("");
    setlastname("");
    setnumber("");
    setshowFullName(false);
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>New Player</ModalHeader>
              <ModalBody>
                <div className="space-y-2.5">
                  <div className="grid gap-2.5 grid-cols-1 sm:grid-cols-2">
                    <Input
                      label="First Name"
                      type="text"
                      value={firstname}
                      onValueChange={setfirstname}
                    />
                    <Input
                      label="Last Name"
                      type="text"
                      value={lastname}
                      onValueChange={setlastname}
                    />
                  </div>
                  <Input
                    type="number"
                    label="Jersey Number"
                    value={number}
                    onValueChange={(value) => setnumber(value)}
                  />
                  <Checkbox
                    isSelected={showFullName}
                    onValueChange={setshowFullName}
                  >
                    {" "}
                    Show Full Name{" "}
                  </Checkbox>
                  <RadioGroup label="Team" value={team} onValueChange={setteam}>
                    <Radio value={teamA.teamName}>{teamA.teamName}</Radio>
                    <Radio value={teamB.teamName}>{teamB.teamName}</Radio>
                  </RadioGroup>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                  onClick={() => {
                    handleSave();
                    onClose();
                  }}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Button onPress={onOpen}>New Player</Button>
    </>
  );
};

const PlayersButton = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    teamA,
    teamAPlayers,
    teamB,
    teamBPlayers,
    stats,
    removePlayerFromStats,
    addPlayerToStats,
  } = useNewGameStore();

  const playerBox = (player, team) => {
    const onValueChange = (value) => {
      if (value) {
        addPlayerToStats(player, team);
      } else {
        removePlayerFromStats(player.id, team);
      }
    };

    return (
      <Checkbox
        className="w-full"
        key={player.id}
        isSelected={stats[team].some((p) => p.id === player.id)}
        onValueChange={onValueChange}
      >
        <User name={`${player.firstname ?? ""} ${player.lastname}`} />
      </Checkbox>
    );
  };

  return (
    <>
      <Modal
        scrollBehavior="inside"
        size="4xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h1 className="text-xl text-primary">Players</h1>
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  <div>
                    <h2 className="mb-2.5 font-bold">{teamA.teamName}</h2>
                    <div className="grid grid-cols-2">
                      {teamAPlayers.map((player) => playerBox(player, "teamA"))}
                    </div>
                  </div>
                  <div>
                    <h2 className="mb-2.5 font-bold">{teamB.teamName}</h2>
                    <div className="grid grid-cols-2">
                      {teamBPlayers.map((player) => playerBox(player, "teamB"))}
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose}>Close</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Button onPress={onOpen}>Players</Button>
    </>
  );
};

const ImportButton = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [file, setfile] = useState();
  const [wb, setwb] = useState(null);
  const [selectedSheet, setselectedSheet] = useState(null);
  const [matches, setMatches] = useState([]);
  const [status, setstatus] = useState({
    handlingDuplicates: false,
    viewingTable: false,
    finalizingTeamStats: false,
  });
  const { teamA, teamB, teamAPlayers, teamBPlayers, importPlayersStats } = useNewGameStore();

  const handleFile = (file) => {
    file.arrayBuffer().then((buffer) => {
      setfile({
        raw: file,
        buffer: buffer,
      });
      const workbook = XLSX.read(buffer, { type: "buffer" });
      setwb(workbook);
    });
  };

  const reset = () => {
    setfile(null);
    setwb(null);
    setMatches([]);
    setselectedSheet(null);
    setstatus({
      handlingDuplicates: false,
      viewingTable: false,
      finalizingTeamStats: false,
    });
  };

  const mapMatches = useMemo(async () => {
    if (!wb || !selectedSheet) return;
    let stats = XLSX.utils.sheet_to_json(wb.Sheets[selectedSheet]);
    stats = stats.map((row) => ({
      ...row,
      Name: row.Name?.toLowerCase()?.trim() || "",
      firstname: row.Name?.split(",")[1]?.trim().toLowerCase() || "",
      lastname: row.Name?.split(",")[0]?.trim().toLowerCase() || "",
    }));
    const players = [...teamAPlayers, ...teamBPlayers];

    try {
      await checkColumnValidity(wb.Sheets[selectedSheet]);
    } catch (err) {
      toast.error(
        `The sheet is missing the following columns: ${err.join(
          ", "
        )}. Please check the sheet and try again.`
      );
      onClose();
      reset();
      return;
    }

    // Check teams compatability
    try {
      await checkTeamCompatability(stats, { teamA, teamB });
    } catch (err) {
      toast.error(err);
      onClose();
      reset();
      return;
    }

    // Check Lineups
    try {
      await checkLineUps(stats, {
        teamA,
        teamB,
        teamAPlayers,
        teamBPlayers,
      });
    } catch (errors) {
      console.log("Error: ", errors);
      errors.map((error) => {
        toast.error(
          `Player ${error.row.Name} not found in ${error.team.teamName}.`,
          {
            duration: Infinity,
            action: {
              label: "Create Player",
              onClick: () => {
                const player = {
                  firstname: error.row.firstname,
                  lastname: error.row.lastname,
                  number: error.row["#"],
                  showFullName: false,
                };

                return new Promise(async (resolve, reject) => {
                  try {
                    await createPlayer(player, error.team).then(() => {
                      toast.success(
                        `Player ${error.row.Name} created successfully.`,
                        { duration: 5000 }
                      );
                      resolve();
                    });
                  } catch (err) {
                    reject(err);
                  }
                });
              },
            },
            cancel: {
              label: "Okay",
            },
            cancelButtonStyle: {
              backgroundColor: "transparent",
              color: "#000",
            },
          }
        );
      });
    }

    const matches = stats
      .map((p) => {
        if (p.TEAM?.toLowerCase() === teamA.teamName.toLowerCase()) {
          const m = teamAPlayers.filter(
            (player) =>
              player.lastname?.toLowerCase() === p.lastname?.toLowerCase()
          );
          return { player: p, team: teamA, matches: m };
        } else {
          const m = teamBPlayers.filter(
            (player) =>
              player.lastname?.toLowerCase() === p.lastname?.toLowerCase()
          );
          return { player: p, team: teamB, matches: m };
        }
      })
      .map((match) => ({
        ...match,
        player: { ...match.player, id: _.uniqueId("player_") },
        id: _.uniqueId("match_"),
      }));
    setMatches(matches);
    setstatus({ handlingDuplicates: true, viewingTable: false });
    return matches;
  }, [selectedSheet]);

  console.log("Matches: ", matches);

  return (
    <>
      <Modal
        scrollBehavior="inside"
        size="full"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h1 className="text-xl text-primary">Import Players</h1>
              </ModalHeader>
              <ModalBody>
                {/* Drag & Drop */}
                <div>
                  <FileUploader
                    handleChange={handleFile}
                    name="stat sheet"
                    filetypes={["xlsx"]}
                  >
                    <div
                      className={cn(
                        [
                          "border-2",
                          "border-dashed",
                          "rounded-md",
                          file ? "border-gray-500/50" : "border-primary",
                          file ? "bg-primary/5" : "bg-primary/5",
                          file ? "text-gray-500/50" : "text-primary",
                        ],
                        ["w-full", "p-4", "flex", "gap-2.5"]
                      )}
                    >
                      <ImportIcon size={24} />
                      <p>
                        {file
                          ? file.raw.name
                          : "Drag and drop or click to upload a file"}
                      </p>
                    </div>
                  </FileUploader>
                </div>
                {/* Sheet Selector */}
                <div>
                  {wb && (
                    <>
                      <h2>Select a Sheet:</h2>
                      {wb.SheetNames.map((sheet, i) => {
                        return (
                          <Button
                            key={i}
                            onClick={() => setselectedSheet(sheet)}
                            className={cn(
                              sheet === selectedSheet && "bg-primary"
                            )}
                          >
                            {sheet}
                          </Button>
                        );
                      })}
                    </>
                  )}
                </div>
                {/* Mapped Players */}
                <div>
                  {matches.length > 0 && status.handlingDuplicates && (
                    <>
                      <h2>Handle Duplicates</h2>
                      <HandleDuplicates
                        matches={matches}
                        setMatches={setMatches}
                        setStatus={setstatus}
                      />
                    </>
                  )}
                </div>
                {/* Viewing Player Stats */}
                <div className="w-full overflow-x-auto">
                  {status.viewingTable && (
                    <HandlePlayerTable matches={matches} />
                  )}
                </div>
                {/* Viewing Team Stats */}
                <div>
                  {status?.finalizingTeamStats && (
                    <HandleTeamTable
                      teamA={matches.filter(
                        (m) => m.team.teamName === teamA.teamName
                      )}
                      teamB={matches.filter(
                        (m) => m.team.teamName === teamB.teamName
                      )}
                    />
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onClick={() => reset()}>
                  Reset
                </Button>
                <Button onClick={onClose}>Close</Button>
                {status.viewingTable && (
                  <Button
                    color="primary"
                    variant="solid"
                    onClick={() => {
                      setstatus({
                        handlingDuplicates: false,
                        viewingTable: false,
                        finalizingTeamStats: true,
                      });
                    }}
                  >
                    Finalize Stats
                  </Button>
                )}
                {
                  status?.finalizingTeamStats && (
                    <Button variant="solid" color="primary" onClick={() => {
                      importPlayersStats(matches);
                      onClose();
                      reset();
                    }}>Import</Button>
                  )
                }
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Button onClick={onOpen}>Import</Button>
    </>
  );
};

const HandleDuplicates = ({ matches, setMatches, setStatus }) => {
  const [cleaned, setCleaned] = useState([]);
  const [duplicates, setDuplicates] = useState([]);

  useEffect(() => {
    const cleaned = matches
      .filter((match) => match.matches.length === 1)
      .map((match) => ({
        player: match.player,
        match: match.matches[0],
        team: match.team,
        id: match.id,
      }));
    const duplicates = matches.filter((match) => match.matches.length > 1);

    setCleaned(cleaned);
    setDuplicates(duplicates);
  }, [matches]);

  const handleClean = (match, player) => {
    if (cleaned.some((cleanedMatch) => cleanedMatch.id === match.id)) {
      const cleanedMatches = cleaned.map((cleanedMatch) => {
        if (cleanedMatch.id === match.id) {
          return {
            player: match.player,
            match: player,
            team: match.team,
            id: match.id,
          };
        }
        return cleanedMatch;
      });
      setCleaned(cleanedMatches);
      return;
    }

    const cleanedMatch = {
      player: match.player,
      match: player,
      team: match.team,
      id: match.id,
    };

    setCleaned([...cleaned, cleanedMatch]);
  };

  if (cleaned.length === matches.length) {
    setStatus({ handlingDuplicates: false, viewingTable: true });
    setMatches(cleaned);
    console.log("Cleaned: ", cleaned);
  }

  return (
    <section className="mt-2.5 space-y-2">
      {duplicates?.map((match, i) => {
        return (
          <Card key={match.player.id}>
            <CardBody className="grid grid-cols-1 sm:grid-cols-2">
              <div>
                <User
                  name={`${match.player["#"] ?? "##"}-${match.player.Name}`}
                  description={match.team.teamName}
                  avatarProps={{
                    name: match.player.Name,
                  }}
                />
              </div>
              <div className="space-y-1">
                {match.matches?.map((player, j) => {
                  return (
                    <div
                      key={player.id}
                      className={cn(
                        ["p-2 rounded-md hover:bg-primary/5  cursor-pointer"],
                        [
                          cleaned.some(
                            (c) => c.match.id === player.id && c.id === match.id
                          ) && "bg-green-500/50",
                        ],
                        [
                          cleaned.some(
                            (c) => c.match.id === player.id && c.id !== match.id
                          ) && "bg-red-500/5 cursor-not-allowed opacity-20",
                        ]
                      )}
                      onClick={() => {
                        if (
                          cleaned.some(
                            (c) => c.match.id === player.id && c.id !== match.id
                          )
                        )
                          return;
                        handleClean(match, player);
                      }}
                    >
                      <User
                        name={`${player.number || "##"}-${player.lastname}, ${
                          player.firstname
                        }`}
                        description={player.number}
                        avatarProps={{
                          name: player.lastname,
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </CardBody>
          </Card>
        );
      })}
    </section>
  );
};

const HandlePlayerTable = ({ matches }) => {
  const { teamA, teamB } = useNewGameStore();

  const columns = useMemo(
    () => [
      columnHelper.accessor("Name", {
        header: "NAME",
      }),
      columnHelper.group({
        header: "2 POINTS",
        columns: [
          columnHelper.accessor("2PM", {
            header: "M",
          }),
          columnHelper.accessor("2PA", {
            header: "A",
          }),
        ],
      }),
      columnHelper.group({
        header: "3 POINTS",
        columns: [
          columnHelper.accessor("3PM", {
            header: "M",
          }),
          columnHelper.accessor("3PA", {
            header: "A",
          }),
        ],
      }),
      columnHelper.group({
        header: "FREE THROWS",
        columns: [
          columnHelper.accessor("FTM", {
            header: "M",
          }),
          columnHelper.accessor("FTA", {
            header: "A",
          }),
        ],
      }),
      columnHelper.accessor("REB", {
        header: "REBOUNDS",
      }),
      columnHelper.accessor("AST", {
        header: "ASSISTS",
      }),
      columnHelper.accessor("STL", {
        header: "STEALS",
      }),
      columnHelper.accessor("BLK", {
        header: "BLOCKS",
      }),
      columnHelper.accessor("FLS", {
        header: "FOULS",
      }),
      columnHelper.accessor("TO", {
        header: "TURNOVERS",
      }),
    ],
    []
  );

  const data = useMemo(
    () => ({
      teamA: matches
        .filter(
          (match) =>
            match.team.teamName?.toLowerCase() === teamA.teamName?.toLowerCase()
        )
        .map((match) => match.player),
      teamB: matches
        .filter(
          (match) =>
            match.team.teamName?.toLowerCase() === teamB.teamName?.toLowerCase()
        )
        .map((match) => match.player),
    }),
    [matches]
  );

  return (
    <section>
      <div>
        <h2>{teamA.teamName}</h2>
        <BasicTable columns={columns} data={data.teamA} />
      </div>
      <div>
        <h2>{teamB.teamName}</h2>
        <BasicTable columns={columns} data={data.teamB} />
      </div>
    </section>
  );
};

const HandleTeamTable = ({ teamA, teamB }) => {
  const { teamA: teamAName, teamB: teamBName } = useNewGameStore();

  const columns = useMemo(
    () => [
      columnHelper.accessor("teamName", {
        header: "TEAM",
      }),
      columnHelper.group({
        header: "2 POINTS",
        columns: [
          columnHelper.accessor("2PM", {
            header: "M",
          }),
          columnHelper.accessor("2PA", {
            header: "A",
          }),
        ],
      }),
      columnHelper.group({
        header: "3 POINTS",
        columns: [
          columnHelper.accessor("3PM", {
            header: "M",
          }),
          columnHelper.accessor("3PA", {
            header: "A",
          }),
        ],
      }),
      columnHelper.group({
        header: "FREE THROWS",
        columns: [
          columnHelper.accessor("FTM", {
            header: "M",
          }),
          columnHelper.accessor("FTA", {
            header: "A",
          }),
        ],
      }),
      columnHelper.accessor("REB", {
        header: "REBOUNDS",
      }),
      columnHelper.accessor("AST", {
        header: "ASSISTS",
      }),
      columnHelper.accessor("STL", {
        header: "STEALS",
      }),
      columnHelper.accessor("BLK", {
        header: "BLOCKS",
      }),
      columnHelper.accessor("FLS", {
        header: "FOULS",
      }),
      columnHelper.accessor("TO", {
        header: "TURNOVERS",
      }),
      columnHelper.accessor("PTS", {
        header: "POINTS",
      }),
    ],
    []
  );

  console.log("Team A: ", teamA);
  console.log("Team B: ", teamB);

  const getSums = useCallback((players) => {
    return players.reduce(
      (acc, player) => {
        acc["2PM"] += player["2PM"];
        acc["2PA"] += player["2PA"];
        acc["3PM"] += player["3PM"];
        acc["3PA"] += player["3PA"];
        acc["FTM"] += player["FTM"];
        acc["FTA"] += player["FTA"];
        acc["REB"] += player["REB"];
        acc["AST"] += player["AST"];
        acc["STL"] += player["STL"];
        acc["BLK"] += player["BLK"];
        acc["FLS"] += player["FLS"];
        acc["TO"] += player["TO"];
        acc["PTS"] += player["PTS"];
        return acc;
      },
      {
        "2PM": 0,
        "2PA": 0,
        "3PM": 0,
        "3PA": 0,
        FTM: 0,
        FTA: 0,
        REB: 0,
        AST: 0,
        STL: 0,
        BLK: 0,
        FLS: 0,
        TO: 0,
        PTS: 0,
      }
    );
  }, []);

  const data = useMemo(() => {
    const teamAData = getSums(teamA.map((match) => match.player));
    const teamBData = getSums(teamB.map((match) => match.player));

    return [
      { ...teamAData, teamName: teamAName.teamName },
      { ...teamBData, teamName: teamBName.teamName },
    ];
  }, [teamA, teamB]);

  console.log("Data: ", data);

  return (
    <div>
      <div>
        <BasicTable columns={columns} data={data} />
      </div>
    </div>
  );
};
