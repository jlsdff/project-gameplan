"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function TableDataDisplay({ columns, items }) {

  const router = useRouter()
  
  const getPPG = (games) => {
    if (games.length === 0) return 0;
    return (
      games.reduce((acc, game) => acc + game.points, 0) / games.length
    ).toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  };

  const getAPG = (games) => {
    if (games.length === 0) return 0;
    return (
      games.reduce((acc, game) => acc + game.assists, 0) / games.length
    ).toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  };

  const getRPG = (games) => {
    if(games.length === 0) return 0;
    return (
      games.reduce((acc, game) => acc + game.rebounds, 0) / games.length
    ).toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  };

  const getFGP = (games) => {
    if (games.length === 0) return 0;
    const made = games.reduce((acc, game) => acc + game.fieldGoals.made, 0);
    const attempts = games.reduce(
      (acc, game) => acc + game.fieldGoals.attempt,
      0
    );
    return ((made / attempts) * 100).toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  };

  const renderCell = (item, key) => {
    switch (key) {
      case "team":
        return (
          <User
            name={item.teamName}
            description={item.teamAbbr}
            avatarProps={{
              src: item.teamLogo,
              showFallback: true,
              name: item.teamAbbr,
            }}
          />
        );
      case "wins":
        return <span>{item.wins || 0}</span>;
      case "losses":
        return <span>{item.losses || 0}</span>;
      case "ppg":
        return <span>{getPPG(item.games)}</span>;
      case "apg":
        return <span>{getAPG(item.games)}</span>;
      case "rpg":
        return <span>{getRPG(item.games)}</span>;
      case "fgp":
        return <span>{getFGP(item.games) + "%"}</span>;
      default:
        return <span>{item[key]}</span>;
    }
  };

  const toTeam = (id) => {
    router.push(`/teams/${id}`)
  }

  return (
    <>
      <Table removeWrapper aria-label="Data display for teams">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.title}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow onClick={()=>{toTeam(item.id)}} key={item.id} className="cursor-pointer hover:bg-primary-900/5">
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
