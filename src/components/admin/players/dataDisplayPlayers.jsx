"use client";
import React, { useState, useReducer, useEffect, useCallback } from "react";
import {
  Input,
  Divider,
  Button,
  Pagination,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Checkbox,
} from "@nextui-org/react";
import CustomTable from "../../ui/table/table";
import DeleteIcon from "@/assets/deleteIcon";
import EditIcon from "@/assets/editIcon";
import SearchIcon from "@/assets/searchIcon";
import DataDisplay from "../dataDisplay/dataDisplay";
import ToolbarDataDisplay from "../dataDisplay/toolbarDataDisplay";
import AddIcon from "@/assets/addIcon";
import { newPlayer as newPlayerFirebase } from "@/helpers/players/newplayer";
import { getPlayersByPage } from "@/helpers/players/getPlayers";
import { playerColumns } from "@/helpers/players/columns";

const newPlayerReducer = (state, action) => {
  switch (action.type) {
    case "firstname":
      return { ...state, firstname: action.value };
    case "middlename":
      return { ...state, middlename: action.value };
    case "lastname":
      return { ...state, lastname: action.value };
    case "birthdate":
      return { ...state, birthdate: action.value };
    case "position":
      if (state.positions.includes(action.value)) {
        return {
          ...state,
          positions: state.positions.filter(
            (position) => position !== action.value
          ),
        };
      } else {
        return { ...state, positions: [...state.positions, action.value] };
      }
    case "height":
      return { ...state, height: action.value };
    case "weight":
      return { ...state, weight: action.value };
    case "citizenship":
      return { ...state, citizenship: action.value };
    case "number":
      return { ...state, number: action.value };
    case "birthplace":
      return { ...state, birthplace: action.value };
    case "reset":
      return {
        firstname: "",
        lastname: "",
        middlename: "",
        number: "",
        birthdate: "",
        birthplace: "",
        positions: [],
        height: "",
        weight: "",
        citizenship: "",
      };
    default:
      return state;
  }
};

export default function DataDisplayPlayer() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [rows, setRows] = useState([]);

  const [nameSearch, setNameSearch] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [newPlayer, dispatch] = useReducer(newPlayerReducer, {
    firstname: "",
    lastname: "",
    middlename: "",
    number: "",
    birthdate: "",
    birthplace: "",
    positions: [],
    height: "",
    weight: "",
    citizenship: "",
  });

  useEffect(() => {
    async function getPlayers() {
      const players = await getPlayersByPage(currentPage - 1, 10);
      players.docs.forEach((player) => console.log(player.id));

      const rows = players.docs.map((player) => {
        return {
          key: player.id,
          ...player.data(),
          actions: (
            [
              {
                label: "Edit",
                onClick: (item, key) => {
                  const rowKey = item.key;
                  console.log("editing", item, key);
                },
                color: "primary",
                isIconOnly: true,
                icon: <EditIcon />,
              },
              {
                label: "Delete",
                onClick: (item, key) => {
                  const rowKey = item.key;
                  console.log("deleting", item, key);
                },
                color: "danger",
                isIconOnly: true,
                icon: <DeleteIcon />,
              }
            ]
          ),
        };
      });

      setRows(rows);

      console.log("Players", rows);
    }
    getPlayers();
  }, [currentPage]);

  const renderCell = useCallback((item, key) => {
    switch (key){
      case "firstname":
        return (
          <div>
            {item.firstname}
          </div>
        )
      case "lastname":
        return (
          <div>
            {item.lastname}
          </div>
        )
      case "middlename":
        return (
          <div>
            {item.middlename}
          </div>
        )
      case "number":
        return (
          <div>
            {item.number}
          </div>
        )
      case "positions":
        return (
          <div>
            {item.positions.join(", ")}
          </div>
        )
      case "actions":
        return (
          item.actions.map((action, index) => (
            <Button
              key={index}
              color={action.color || "primary"}
              variant="light"
              size="sm"
              isIconOnly={action.isIconOnly}
              onClick={()=> action.onClick(item, key)}
            >
              {action.icon || action.label || ""}
            </Button>
          ))
        )
    }
  }, [])
  
  const newPlayerHandler = useCallback(async () => {
    await newPlayerFirebase(newPlayer)
      .then((res) => {
        dispatch({ type: "reset" });
        alert("Player added");
      })
      .catch((err) => alert("Error adding player"));
  }, [newPlayer]);

  return (
    <>
      <Modal
        size="5xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h1>New Player</h1>
              </ModalHeader>

              <ModalBody>
                <section className="flex flex-col gap-2">
                  <div className="flex justify-center items-center gap-2">
                    <Input
                      value={newPlayer.firstname}
                      onValueChange={(value) =>
                        dispatch({ type: "firstname", value })
                      }
                      label="First Name"
                    />
                    <Input
                      value={newPlayer.middlename}
                      onValueChange={(value) =>
                        dispatch({ type: "middlename", value })
                      }
                      label="Middle Name"
                    />
                    <Input
                      value={newPlayer.lastname}
                      onValueChange={(value) =>
                        dispatch({ type: "lastname", value })
                      }
                      label="Last Name"
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col">
                      <span>Birthdate</span>
                      <Input
                        type="date"
                        value={newPlayer.birthdate}
                        onValueChange={(value) =>
                          dispatch({ type: "birthdate", value })
                        }
                        placeholder="Birthdate"
                      />
                    </div>
                    <div>
                      <div className="flex gap-1 justify-center items-center">
                        <Input
                          value={newPlayer.birthplace}
                          onValueChange={(value) =>
                            dispatch({ type: "birthplace", value })
                          }
                          label="Birthplace"
                        />
                        <span className="mx-2">Positions:</span>
                        <Checkbox
                          isSelected={newPlayer.positions.includes("PG")}
                          onValueChange={(value) =>
                            dispatch({ type: "position", value: "PG" })
                          }
                        >
                          PG
                        </Checkbox>
                        <Checkbox
                          isSelected={newPlayer.positions.includes("SG")}
                          onValueChange={(value) =>
                            dispatch({ type: "position", value: "SG" })
                          }
                        >
                          SG
                        </Checkbox>
                        <Checkbox
                          isSelected={newPlayer.positions.includes("SF")}
                          onValueChange={(value) =>
                            dispatch({ type: "position", value: "SF" })
                          }
                        >
                          SF
                        </Checkbox>
                        <Checkbox
                          isSelected={newPlayer.positions.includes("PF")}
                          onValueChange={(value) =>
                            dispatch({ type: "position", value: "PF" })
                          }
                        >
                          PF
                        </Checkbox>
                        <Checkbox
                          isSelected={newPlayer.positions.includes("C")}
                          onValueChange={(value) =>
                            dispatch({ type: "position", value: "C" })
                          }
                        >
                          C
                        </Checkbox>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={newPlayer.height}
                        onValueChange={(value) =>
                          dispatch({ type: "height", value })
                        }
                        type="number"
                        label="Height (ft.) "
                      />
                      <Input
                        value={newPlayer.weight}
                        onValueChange={(value) =>
                          dispatch({ type: "weight", value })
                        }
                        type="number"
                        label="Weight (kg.) "
                      />
                      <Input
                        value={newPlayer.number}
                        onValueChange={(value) =>
                          dispatch({ type: "number", value })
                        }
                        type="number"
                        label="Jersey Number "
                      />
                      <Input
                        value={newPlayer.citizenship}
                        onValueChange={(value) =>
                          dispatch({ type: "citizenship", value })
                        }
                        label="Citizenship"
                      />
                    </div>
                  </div>
                </section>
              </ModalBody>

              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    newPlayerHandler();
                    onClose();
                  }}
                >
                  New Player
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <section>
        <DataDisplay
          pagination={{
            totalPage: totalPage,
            currentPage: currentPage,
            setCurrentPage: setCurrentPage,
            initialPage: 1,
          }}
          dataContents={{
            columns: playerColumns,
            rows: rows,
            isSelectable: true,
            renderCell: renderCell
          }}
          topToolBar={
            <ToolbarDataDisplay
              searchComponent={{
                label: "Search by name",
                value: nameSearch,
                onChange: (value) => setNameSearch(value),
                onSearch: () => console.log("searching"),
                isIconOnly: true,
                icon: <SearchIcon />,
                isDisabled: nameSearch.length > 0 ? false : true,
              }}
              toolBars={[
                {
                  isIconOnly: true,
                  ariaLabel: "delete player",
                  onClick: () => console.log("deleting"),
                  icon: <DeleteIcon />,
                  isDisabled: selectedRowKeys.length > 0 ? false : true,
                  size: "sm",
                  variant: "light",
                  toolTip: "Delete selected players",
                },
                {
                  isIconOnly: true,
                  ariaLabel: "add player",
                  onClick: () => onOpen(),
                  icon: <AddIcon />,
                  isDisabled: false,
                  size: "sm",
                  variant: "light",
                  toolTip: "Add new player",
                },
              ]}
            />
          }
        />
      </section>
    </>
  );
}
