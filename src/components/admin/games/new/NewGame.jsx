"use client";
import { lazy, useCallback, useMemo, useState } from "react";
import { useNewGameStore } from "./gameStore";
import LeagueAutoComplete from "./form/LeagueAutoComplete";
import { motion } from "framer-motion";
import { cn } from "@nextui-org/theme";
import * as XLSX from "xlsx";
import _, { map } from "underscore";
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
} from "@nextui-org/react";
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

export default function NewGame({ id }) {
  const {
    league,
    teamA,
    teamB,
    teamAPlayers,
    teamBPlayers,
    gameNumber,
    date,
    setTeamA,
    setTeamB,
    stats,
  } = useNewGameStore();

  const handleSave = useCallback(() => {
    console.log("Save: ", league);
    console.log("Team A: ", teamA);
    console.log("Team B: ", teamB);
    console.log("Team A Players: ", teamAPlayers);
    console.log("Team B Players: ", teamBPlayers);
    console.log("Date: ", date);
    console.log("Game Number: ", gameNumber);
    console.log("Team A Stats: ", stats.teamA);
    console.log("Team B Stats: ", stats.teamB);
  }, [
    league,
    teamA,
    teamB,
    teamAPlayers,
    teamBPlayers,
    date,
    gameNumber,
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
        <Button onClick={handleSave}>Save</Button>
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
  const { teamA, teamB, teamAPlayers, teamBPlayers } = useNewGameStore();

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
    setselectedSheet(null);
  };

  const mapSheetToPlayers = useMemo(async () => {
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

    console.log("Stats: ", stats);

    const teamARows = [];
    const teamBRows = [];

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
                  setTimeout(() => {
                    toast.success(
                      `Creating Player: ${player.lastname}, ${player.firstname} in ${error.team.teamName}`,
                      { duration: 3000 }
                    );
                  }, 3000);
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

    // stats.forEach((row) => {
    //   if (row.TEAM.toLowerCase() === teamA.teamName.toLowerCase()) {
    //     // Player check for teamA
    //     const isPresent = teamAPlayers.some(
    //       (p) =>
    //         p.lastname.toLowerCase() === row.lastname.toLowerCase() ||
    //         p.number === row["#"]
    //     );

    //     if (!isPresent) {
    //       toast.error(
    //         `Player #${row["#"]} ${row.Name} not found in ${teamA.teamName}. Please add the player to the team first.`,
    //         {
    //           duration: Infinity,
    //           cancel: {
    //             label: "Okay",
    //           },
    //         }
    //       );
    //     } else {
    //       teamARows.push(row);
    //     }
    //   } else {
    //     // Player Check for teamB
    //     const isPresent = teamBPlayers.some(
    //       (p) =>
    //         p.lastname.toLowerCase() === row.lastname.toLowerCase() ||
    //         p.number === row["#"]
    //     );

    //     if (!isPresent) {
    //       toast.error(
    //         `Player #${row["#"]} ${row.Name} not found in ${teamB.teamName}. Please add the player to the team first.`,
    //         {
    //           duration: Infinity,
    //           cancel: {
    //             label: "Okay",
    //           },
    //         }
    //       );
    //     } else {
    //       teamBRows.push(row);
    //     }
    //   }
    // });

    const grouped = {
      teamA: teamARows,
      teamB: teamBRows,
    };

    console.log("grouped: ", grouped);

    // const mappedPlayers = stats.map((row) => {
    //   const matches = players.filter(
    //     (p) =>
    //       p.lastname.toLowerCase() === row.lastname || p.number === row["#"]
    //   );
    //   return matches ? { row, matches: matches } : { row, matches: null };
    // });

    // mappedPlayers.forEach( player => {
    //   if(player.matches?.length === 0) {
    //     toast.error(`Player ${player.row.Name} not found.`, {duration: Infinity, action: {
    //       label: "Create Player",
    //       onClick: () => new Promise( async (resolve) => setTimeout(() => {console.log("Creating Player: ", player.row ), 3000}))
    //     }})
    //     onClose();
    //     reset()
    //   }
    // })

    // console.log("Mapped Players: ", mappedPlayers);
    // return mappedPlayers;
  }, [onClose, selectedSheet, teamAPlayers, teamBPlayers, wb]);

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
                <div></div>
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose}>Close</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Button onClick={onOpen}>Import</Button>
    </>
  );
};
