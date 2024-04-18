import React, { useReducer } from "react";
import { Modal, useDisclosure } from "@nextui-org/react";

const playerReducer = (state, action) => {
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

export default function EditPlayerModal({ item, action, index }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [player, playerDispatch] = useReducer(playerReducer, item);

  const EditPlayerHandler = () => {
    console.log(player);
  }

  return (
    <>
      <Button
        key={index}
        color={action.color || "primary"}
        variant="light"
        size="sm"
        isIconOnly={action.isIconOnly}
        onClick={() => action.onClick(item, key)}
      >
        {action.icon || action.label || ""}
      </Button>
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
                        playerDispatch({ type: "firstname", value })
                      }
                      label="First Name"
                    />
                    <Input
                      value={newPlayer.middlename}
                      onValueChange={(value) =>
                        playerDispatch({ type: "middlename", value })
                      }
                      label="Middle Name"
                    />
                    <Input
                      value={newPlayer.lastname}
                      onValueChange={(value) =>
                        playerDispatch({ type: "lastname", value })
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
                          playerDispatch({ type: "birthdate", value })
                        }
                        placeholder="Birthdate"
                      />
                    </div>
                    <div>
                      <div className="flex gap-1 justify-center items-center">
                        <Input
                          value={newPlayer.birthplace}
                          onValueChange={(value) =>
                            playerDispatch({ type: "birthplace", value })
                          }
                          label="Birthplace"
                        />
                        <span className="mx-2">Positions:</span>
                        <Checkbox
                          isSelected={newPlayer.positions.includes("PG")}
                          onValueChange={(value) =>
                            playerDispatch({ type: "position", value: "PG" })
                          }
                        >
                          PG
                        </Checkbox>
                        <Checkbox
                          isSelected={newPlayer.positions.includes("SG")}
                          onValueChange={(value) =>
                            playerDispatch({ type: "position", value: "SG" })
                          }
                        >
                          SG
                        </Checkbox>
                        <Checkbox
                          isSelected={newPlayer.positions.includes("SF")}
                          onValueChange={(value) =>
                            playerDispatch({ type: "position", value: "SF" })
                          }
                        >
                          SF
                        </Checkbox>
                        <Checkbox
                          isSelected={newPlayer.positions.includes("PF")}
                          onValueChange={(value) =>
                            playerDispatch({ type: "position", value: "PF" })
                          }
                        >
                          PF
                        </Checkbox>
                        <Checkbox
                          isSelected={newPlayer.positions.includes("C")}
                          onValueChange={(value) =>
                            playerDispatch({ type: "position", value: "C" })
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
                          playerDispatch({ type: "height", value })
                        }
                        type="number"
                        label="Height (ft.) "
                      />
                      <Input
                        value={newPlayer.weight}
                        onValueChange={(value) =>
                          playerDispatch({ type: "weight", value })
                        }
                        type="number"
                        label="Weight (kg.) "
                      />
                      <Input
                        value={newPlayer.number}
                        onValueChange={(value) =>
                          playerDispatch({ type: "number", value })
                        }
                        type="number"
                        label="Jersey Number "
                      />
                      <Input
                        value={newPlayer.citizenship}
                        onValueChange={(value) =>
                          playerDispatch({ type: "citizenship", value })
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
                    EditPlayerHandler();
                    onClose();
                  }}
                >
                  Edit Player
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
