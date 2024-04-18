"use client";

import React, {
  useCallback,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
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
import EditIcon from "@/assets/editIcon";
import { useRouter } from "next/navigation";
import { getTeamCount } from "@/utils/countersAPI";
import { getTeamsByPage, deleteTeam, getTeamByName } from "@/utils/teamAPI";

export default function DataDisplayTeams() {
  const { dataDisplayTeams } = useContext(DataDisplayTeamsContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [limitPerPage, setLimitPerPage] = useState(2);
  const [totalPage, setTotalPage] = useState(1);

  const [teamSearch, setTeamSearch] = useState("");
  const [rows, setRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchTeams();
  }, [limitPerPage, currentPage]);

  const fetchTeams = useCallback(async () => {
    setTotalPage(Math.ceil((await getTeamCount()) / limitPerPage));

    const teams = await getTeamsByPage(currentPage - 1, limitPerPage);

    const rows = teams.docs.map((team) => {
      return {
        ...team.data(),
        key: team.id,
        actions: [
          {
            label: "Edit",
            size: "sm",
            radius: "sm",
            color: "light",
            variant: "solid",
            isIconOnly: true,
            icon: <EditIcon />,
            onClick: editTeamHandler,
          },
          {
            label: "Delete",
            size: "sm",
            radius: "sm",
            color: "danger",
            variant: "light",
            isIconOnly: true,
            icon: <DeleteIcon />,
            onClick: deleteTeamHandler,
          },
        ],
      };
    });

    setRows(rows);
  }, [limitPerPage, currentPage]);

  const renderCell = useCallback((item, key) => {
    switch (key) {
      case "teamTag":
        return <div>{item.teamAbbr}</div>;
      case "teamName":
        return <div>{item.teamName}</div>;
      case "wins":
        return <div>{item.wins || 0}</div>;
      case "losses":
        return <div>{item.losses || 0}</div>;
      case "actions":
        return item.actions.map((action, index) => {
          return (
            <Button
              key={index}
              size={action.size || "sm"}
              radius={action.radius || "sm"}
              color={action.color || "default"}
              variant={action.variant || "solid"}
              isIconOnly={action.isIconOnly || false}
              onClick={() => action.onClick(item, key)}
            >
              {action.isIconOnly ? action.icon : action.label}
            </Button>
          );
        });
    }
  }, []);

  const editTeamHandler = useCallback((item, key) => {
    router.push(`/admin/dashboard/teams/${item.key}`);
  }, []);

  const deleteTeamHandler = useCallback(async (item, key) => {
    await deleteTeam(item.key)
      .then(() => {
        alert(
          "Team deleted successfully",
          "Team has been deleted successfully"
        );
        fetchTeams();
      })
      .catch((err) => {
        console.error(err);
        alert("Error deleting team", "There was an error deleting the team");
      });
  }, []);

  const searchTeamNameHandler = useCallback(async (value) => {
    await getTeamByName(value)
      .then((res) => {
        const data = res.docs.map((doc) => {
          return {
            id: doc.id,
            key: doc.id,
            actions: [
              {
                label: "Edit",
                size: "sm",
                radius: "sm",
                color: "light",
                variant: "solid",
                isIconOnly: true,
                icon: <EditIcon />,
                onClick: editTeamHandler,
              },
              {
                label: "Delete",
                size: "sm",
                radius: "sm",
                color: "danger",
                variant: "light",
                isIconOnly: true,
                icon: <DeleteIcon />,
                onClick: deleteTeamHandler,
              },
            ],
            ...doc.data(),
          };
        });
        setRows(data);
        setTotalPage(1);
      })
      .catch((err) => {
        console.error(err);
        alert("Error searching team", "There was an error searching the team");
      });
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
            totalPage: totalPage,
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
                onSearch: () => searchTeamNameHandler(teamSearch),
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
                    router.push("/admin/dashboard/teams/new");
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
