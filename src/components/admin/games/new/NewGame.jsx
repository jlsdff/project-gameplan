"use client";
import { useCallback, useState } from "react";
import { useNewGameStore } from "./gameStore";
import LeagueAutoComplete from "./form/LeagueAutoComplete";
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
} from "@nextui-org/react";
import TeamAutoComplete from "./form/teamAutoComplete";
import GameDatePicker from "./form/gameDataPicker";
import GameNumber from "./form/gameNumber";
import StatTable from "./table/statTable";
import ChevronIcon from "@/assets/chevronIcon";
import ImportIcon from "@/assets/importIcon";
import { createPlayer } from "@/utils/playerAPI";

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

  const handleNewPlayer = useCallback((player, team) => {

  }, [])

  return (
    <main>
      <section className="flex items-center justify-between w-full mb-4 ">
        <h1 className="text-xl font-semibold sm:text-2xl">New Game</h1>

        <div>
          <Dropdown>
            <DropdownTrigger>
              <Button>
                <ChevronIcon size={14} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="extra options">
              <DropdownItem startContent={<ImportIcon size={14} />}>
                Import
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-2 mb-2.5 sm:grid-cols-2 md:grid-cols-3">
        <LeagueAutoComplete />
        <TeamAutoComplete label="Team A" setTeam={setTeamA} />
        <TeamAutoComplete label="Team B" setTeam={setTeamB} />
        <GameDatePicker label="Date" />
        <GameNumber label="Game Number" />
      </section>

      <section>
        {teamAPlayers.length > 0 && teamBPlayers.length > 0 && (
          <Tabs aria-label="tabs-table">
            <Tab key={teamA.teamName} title={teamA.teamName}>
              <div className="">
                <ButtonGroup size="sm" className="" variant="bordered">
                  <NewPlayerButton team={teamA} />
                  <Button>Add Player</Button>
                </ButtonGroup>
                <StatTable id={id} team="teamA" />
              </div>
            </Tab>
            <Tab key={teamB.teamName} title={teamB.teamName}>
              <StatTable id={id} team="teamB" />
            </Tab>
          </Tabs>
        )}
      </section>

      <section>
        <Button onClick={handleSave}>Save</Button>
      </section>
    </main>
  );
}

const NewPlayerButton = ({team}) => {

  const {isOpen, onOpen, onOpenChange} = useDisclosure()
  const [firstname, setfirstname] = useState("")
  const [lastname, setlastname] = useState("")
  const [number, setnumber] = useState("")
  const [showFullName, setshowFullName] = useState(false)
  const {newPlayer} = useNewGameStore()

  const handleSave = () => {
    const player = {
      firstname,
      lastname,
      number,
      showFullName
    }
    newPlayer(player, team)
  }
  
  return (
    <>
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {
          (onClose) => (
            <>
            <ModalHeader>New Player</ModalHeader>
            <ModalBody>
              <div className="space-y-2.5">
                <div className="grid gap-2.5 grid-cols-1 sm:grid-cols-2">
                <Input label="First Name" type="text" value={firstname} onValueChange={setfirstname} />
                <Input label="Last Name" type="text" value={lastname} onValueChange={setlastname} />
                </div>
                <Input type="number" label="Jersey Number" value={number} onValueChange={value => setnumber(value)} />
                <Checkbox isSelected={showFullName} onValueChange={setshowFullName} > Show Full Name </Checkbox>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Cancel</Button>
              <Button onClick={() => {
                handleSave()
                onClose()
              }}>Save</Button>
            </ModalFooter>
            </>
          )
        }
      </ModalContent>
    </Modal>
    <Button onPress={onOpen}>New Player</Button>
    </>
  )
}