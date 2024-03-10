"use client";

import React, { useCallback, useContext, useState } from "react";
import { DataDisplayTeamsContext } from "@/context/dataDisplayTeamsContext";
import DataDisplay from "../dataDisplay/dataDisplay";
import { teamsColumns } from "@/helpers/teams/columns";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import ToolbarDataDisplay from "../dataDisplay/toolbarDataDisplay";
import SearchIcon from "@/assets/searchIcon";
import AddIcon from "@/assets/addIcon";
import DeleteIcon from "@/assets/deleteIcon";
import { useRouter } from "next/navigation";

export default function DataDisplayTeams() {
  const { dataDisplayTeams } = useContext(DataDisplayTeamsContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [limitPerPage, setLimitPerPage] = useState(10);
  const [teamSearch, setTeamSearch] = useState("");
  const [rows, setRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const router = useRouter()

  const renderCell = useCallback((item, key) => {
    switch (key) {
      case "teamTag":
        return <div>item.teamTag</div>;
      case "teamName":
        return <div>item.teamName</div>;
      case "wins":
        return <div>item.wins</div>;
      case "losses":
        return <div>item.losses</div>;
      case "actions":
        return item.action.map((action, index) => {
          return (
            <Button
              key={index}
              size={action.size || "sm"}
              radius={action.radius || "sm"}
              color={action.color || "default"}
              variant={action.variant || "solid"}
              isIconOnly={action.isIconOnly || false}
            >
              {isIconOnly ? action.icon : action.label}
            </Button>
          );
        });
    }
  }, []);

  const searchTeamNameHandler = useCallback((value) => {
    console.log(value);
  }, []);

  const selectedRowKeysHandler = useCallback((key) => {
    // TODO: Filter selectedRowKeys
    console.log(key);
  }, []);

  return (
    <>
      <section className="">
        <DataDisplay
          pagination={{
            totalPage: 10,
            currentPage: currentPage,
            setCurrentPage: setCurrentPage,
            initialPage: 1,
          }}
          dataContents={{
            columns: teamsColumns,
            rows: rows,
            isSelectable: true,
            renderCell: renderCell,
          }}
          topToolBar={
            <ToolbarDataDisplay
              searchComponent={{
                label: "Search",
                value: teamSearch,
                onChange: (value) => setTeamSearch(value),
                onSearch: () => searchTeamNameHandler(nameSearch),
                isIconOnly: true,
                icon: <SearchIcon />,
                isDisabled: teamSearch.length > 0 ? false : true,
              }}
              toolBars={[
                {
                  isIconOnly: true,
                  ariaLabel: "delete player",
                  onClick: () => {
                    console.log("Delete Selected Players");
                  },
                  icon: <DeleteIcon />,
                  isDisabled: selectedRowKeys.length > 0 ? false : true,
                  size: "sm",
                  variant: "light",
                  toolTip: "Delete selected players",
                },
                {
                  isIconOnly: true,
                  ariaLabel: "add player",
                  onClick: () => {
                    router.push('/admin/dashboard/teams/new')
                  },
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
