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
  Link,
} from "@heroui/react";
import { useRouter } from "next/navigation";

export default function LeagueIdTable({ teams, games }) {
  const router = useRouter();

  const toGame = (id) => router.push(`/games?id=${id}`);
  const toTeam = (id) => router.push(`/teams?id=${id}`);

  const columns = [
    {
      key: "TeamA",
      title: "Team A",
    },
    {
      key: "TeamB",
      title: "Team B",
    },
    {
      key: "date",
      title: "Date",
    },
  ];

  const renderTeam = (currentTeam, opposingTeam) => {
    const curr = teams.find((team) => team.id === currentTeam.id);
    const opp = teams.find((team) => team.id === opposingTeam.id);
    return (
      <div
        className="flex items-center justify-start space-x-2 hover:underline"
        onClick={(e) => {
          e.stopPropagation();
          toTeam(curr.id);
        }}
      >
        <div className=" min-w-10">
          {currentTeam.stats.points > opposingTeam.stats.points ? (
            <span className="font-bold text-success">{`W ${currentTeam.stats.points}`}</span>
          ) : (
            <span className="font-bold text-danger">{`L ${currentTeam.stats.points}`}</span>
          )}
        </div>
        <User
          name={curr.teamName}
          description={curr.teamAbbr}
          avatarProps={{ src: curr.teamLogo }}
        />
      </div>
    );
  };

  const renderCell = (item, key) => {
    switch (key) {
      case "number":
        return <span>{item.number}</span>;
      case "TeamA":
        return <>{renderTeam(item.teamA, item.teamB)}</>;
      case "TeamB":
        return <>{renderTeam(item.teamB, item.teamA)}</>;
      case "date":
        const gameDate = item.date.toDate();
        return (
          <span>
            {gameDate.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        );
    }
  };

  return (
    <>
      <Table aria-label="Data Display for Games">
        <TableHeader columns={columns}>
          {(col) => <TableColumn key={col.key}>{col.title}</TableColumn>}
        </TableHeader>
        <TableBody
          items={games.sort((a, b) => b.date.toDate() - a.date.toDate())}
        >
          {(game) => (
            <TableRow
              key={game.id}
              className="cursor-pointer hover:bg-primary-500/5"
              onClick={() => toGame(game.id)}
            >
              {(key) => (
                <TableCell key={key}>{renderCell(game, key)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
