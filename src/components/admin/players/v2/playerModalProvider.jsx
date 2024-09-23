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
import PlayerModalBody from "./modalBody";

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
      return {...state, profileSettings: { ...state.profileSettings, isFullNameVisible: action.value}}
    default:
      console.log("Invalid action type", action);
      return state;
  }
};

export default function PlayerModalProvider({ children }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [type, setType] = useState("New Player");
  // const [data, setData] = useState({});
  const [player, dispatchPlayer] = useReducer(reducer, {
    firstname: "",
    lastname: "",
    number: "",
    imageUrl: "",
    profileSettings: {
      isFullNameVisible: false,
    }
  });

  const displayInput = (text) => {
    console.log(text)
  }


  const value = {
    isOpen,
    onOpen,
    onOpenChange,
    type,
    setType,
    player,
    dispatchPlayer,
  };

  return (
    <PlayerModalContext.Provider value={value}>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>{displayHeader(type)}</ModalHeader>
              <ModalBody>{displayBody(type)}</ModalBody>
              <ModalFooter>{displayFooter(type, onClose)}</ModalFooter>
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
    default:
      return "Add New Player";
  }
}

function displayBody(type) {
  switch (type) {
    case "New Player":
      return <PlayerModalBody />;
    case "Edit Player":
      return "Edit Player";
    case "Delete Player":
      return "Delete Player";
    default:
      return "Add New Player";
  }
}

function displayFooter(type, onClose, data) {
  const newPlayer = () => {};

  const editPlayer = () => {};

  const deletePlayer = () => {};

  switch (type) {
    case "New Player":
      return (
        <div className="flex gap-2">
          <Button color="primary" onPress={() => {
            newPlayer()
          }}>Submit</Button>
          <Button variant="ghost" onPress={() => {
            onClose()
          }}>Cancel</Button>
        </div>
      );
    case "Edit Player":
      return "Edit Player";
    case "Delete Player":
      return "Delete Player";
    default:
      return <Button onPress={onClose}>Close</Button>;
  }
}
