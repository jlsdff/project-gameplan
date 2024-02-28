"use client";

import React, { useCallback, useContext, useState } from "react";
import { DataDisplayTeamsContext } from "@/context/dataDisplayTeamsContext";
import DataDisplay from "../dataDisplay/dataDisplay";
import { teamsColumns } from "@/helpers/teams/columns";
import { Button } from "@nextui-org/react";

export default function DataDisplayTeams() {
  const { dataDisplayTeams } = useContext(DataDisplayTeamsContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [limitPerPage, setLimitPerPage] = useState(10);
  const [teamSearch, setTeamSearch] = useState("");
  const [rows, setRows] = useState([]);

  const renderCell = useCallback((item, key) => {
    switch (key) {
      case "teamTag":
        return <></>;
      case "teamName":
        return <></>;
      case "wins":
        return <></>;
      case "losses":
        return <></>;
      case "actions":
        return item.action.map((item, index) => {
          return (
            <Button
              key={index}
              size={item.size || "sm"}
              radius={item.radius || "sm"}
              color={item.color || "default"}
              variant={item.variant || "solid"}
              isIconOnly={item.isIconOnly || false}
            >
              {isIconOnly ? item.icon : item.label}
            </Button>
          );
        });
    }
  }, []);

  return (
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
      />
    </section>
  );
}
