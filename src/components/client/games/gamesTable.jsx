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
  Pagination,
  Spinner
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function GamesTable({ games, loading }) {
  const router = useRouter();

  const columns = [
    {
      key: "teamA",
      title: "Team A",
    },
    {
      key: "teamB",
      title: "Team B",
    },
    {
      key: "league",
      title: "League",
    },
    {
      key: "time",
      title: "Time",
    },
  ];

  const renderTeam = (current, opposing) => {
    const isWinner = current.stats.points > opposing.stats.points;
    return (
      <div className="flex items-center justify-start gap-2 min-w-48">
        <User
          className="cursor-pointer hover:underline"
          name={current.data.teamName}
          description={current.data.teamAbbr}
          avatarProps={{ src: current.data.teamLogo }}
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/teams?id=${current.id}`);
          }}
        />
        <div>
          {isWinner ? (
            <span className="font-bold text-success">
              W: {current.stats.points}
            </span>
          ) : (
            <span className="font-bold text-danger">
              L: {current.stats.points}
            </span>
          )}
        </div>
      </div>
    );
  };

  const renderCell = (game, key) => {
    switch (key) {
      case "teamA":
        return <>{renderTeam(game.teamA, game.teamB)}</>;
      case "teamB":
        return <>{renderTeam(game.teamB, game.teamA)}</>;
      case "league":
        return (
          <div className="min-w-48">
            <User
              name={game.league.title}
              description={game.league.venue}
              avatarProps={{ src: game.league.leagueImage }}
              onClick={(e) => {
                e.stopPropagation()
                router.push(`/leagues?id=${game.leagueId}`)
              }}
              className="cursor-pointer hover:underline"
            />
          </div>
        );
      case "time":
        return (
          <span>
            {game.time.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        );
    }
  };

  const toGame = (id) => router.push(`/games?id=${id}`)

  return (
    <>
      <Table className="overflow-x-scroll" aria-label="Data Display Table for Game" removeWrapper>
        <TableHeader columns={columns}>
          {(col) => <TableColumn key={col.key}>{col.title}</TableColumn>}
        </TableHeader>
        <TableBody items={games} emptyContent="No Recorded Games" isLoading={loading} loadingContent={<Spinner label="Fetching games..."/>} >
          {(game) => (
            <TableRow className="cursor-pointer hover:bg-primary/5" key={game.id} onClick={() => toGame(game.id)}>
              {(key) => <TableCell>{renderCell(game, key)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
