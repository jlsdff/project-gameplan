"use client";
import React, { createContext, useState, useReducer } from "react";
import {
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  image,
} from "@nextui-org/react";
import PlayerModalBody, { DeletePlayerModalBody, ImportPlayerModalBody } from "./modalBody";
import PlayerAPI from "@/utils/v2/playerAPI";

export const PlayerModalContext = createContext({
  isOpen: false,
  onOpen: () => {},
  onOpenChange: () => {},
  header: "",
  body: "",
  footer: "",
  type: "New Player",
  data: {},
  player: {
    firstname: "",
    lastname: "",
    number: "",
  },
  dispatchPlayer: () => {},
});

const reducer = (state, action) => {
  switch (action.type) {
    case "firstname":
      return { ...state, firstname: action.value };
    case "lastname":
      return { ...state, lastname: action.value };
    case "number":
      return { ...state, number: action.value };
    case "imageUrl":
      return { ...state, imageUrl: action.value };
    case "isFullNameVisible":
      return {
        ...state,
        profileSettings: {
          ...state.profileSettings,
          isFullNameVisible: action.value,
        },
      };
    case "reset":
      return {
        firstname: "",
        lastname: "",
        number: "",
        imageUrl: "",
        profileSettings: {
          isFullNameVisible: false,
        },
      };
    case "set":
      return { ...state, ...action.value };
    default:
      console.log("Invalid action type", action);
      return state;
  }
};

export default function PlayerModalProvider({ children }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [type, setType] = useState("New Player");
  const [size, setSize] = useState("5xl")
  const [player, dispatchPlayer] = useReducer(reducer, {
    firstname: "",
    lastname: "",
    number: "",
    imageUrl: "",
    profileSettings: {
      isFullNameVisible: false,
    },
  });

  const displayInput = (text) => {
    console.log(text);
  };

  const value = {
    isOpen,
    onOpen,
    onOpenChange,
    type,
    setType,
    player,
    setSize,
    size,
    dispatchPlayer,
  };

  return (
    <PlayerModalContext.Provider value={value}>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={size} scrollBehavior={"inside"}
 >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>{displayHeader(type)}</ModalHeader>
              <ModalBody>{displayBody(type)}</ModalBody>
              <ModalFooter>{displayFooter(type, onClose, player)}</ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {children}
    </PlayerModalContext.Provider>
  );
}

function displayHeader(type) {
  switch (type) {
    case "New Player":
      return "Add New Player";
    case "Edit Player":
      return "Edit Player";
    case "Delete Player":
      return "Delete Player";
    case "Import Players":
      return "Import Players";
    default:
      return "";
  }
}

function displayBody(type) {
  switch (type) {
    case "New Player":
      return <PlayerModalBody />;
    case "Edit Player":
      return <PlayerModalBody />;
    case "Delete Player":
      return <DeletePlayerModalBody />;
    case "Import Players":
      return <ImportPlayerModalBody/>
    default:
      return "Add New Player";
  }
}

function displayFooter(type, onClose, player) {

  const newPlayer = async () => {
    const isValid = PlayerAPI.isPlayerCredsValid(player);

    if (!isValid) {
      alert("Invalid player credentials");
      return;
    }

    await PlayerAPI.createPlayer(player).then( () => {
      console.log("Player created successfully");
      onClose()
    })
    .catch( err => {
      console.error("Error creating player", err)
    })
  };

  const editPlayer = async () => {
    const isValid = PlayerAPI.isPlayerCredsValid(player);

    if (!isValid) {
      alert("Invalid player credentials");
      return;
    }

    await PlayerAPI.updatePlayer(player.id, player).then((doc) => {
      console.log("Player updated successfully", doc);
      alert("Player updated successfully");
      onClose();
    });
  };

  const deletePlayer = async () => {
    await PlayerAPI.deletePlayer(player.id).then((res) => {
      alert(
        !res
          ? "Player has games. Cannot delete."
          : "Player deleted successfully"
      );
      onClose();
    });
  };

  switch (type) {
    case "New Player":
      return (
        <div className="flex gap-2">
          <Button
            color="primary"
            onPress={() => {
              newPlayer();
            }}
          >
            Submit
          </Button>
          <Button
            variant="ghost"
            onPress={() => {
              onClose();
            }}
          >
            Cancel
          </Button>
        </div>
      );
    case "Edit Player":
      return (
        <div className="flex gap-2">
          <Button
            color="primary"
            onPress={() => {
              editPlayer();
            }}
          >
            Submit
          </Button>
          <Button
            variant="ghost"
            onPress={() => {
              onClose();
            }}
          >
            Cancel
          </Button>
        </div>
      );
    case "Delete Player":
      return (
        <div className="flex gap-2">
          <Button
            color="primary"
            onPress={() => {
              deletePlayer();
            }}
          >
            Yes
          </Button>
          <Button
            variant="ghost"
            onPress={() => {
              onClose();
            }}
          >
            No
          </Button>
        </div>
      );
    
    case "Import Players":
      return ""
    default:
      return <Button onPress={onClose}>Close</Button>;
  }
}
