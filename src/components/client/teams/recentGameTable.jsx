"use client";
import React, { useCallback } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Spinner,
} from "@heroui/react";
import { useRouter } from "next/navigation";

export default function RecentGameTable({ games, teamId, loading }) {
  const router = useRouter();
  const columns = [
    {
      key: "pts",
      title: "PTS",
    },
    {
      key: "ast",
      title: "AST",
    },
    {
      key: "reb",
      title: "REB",
    },
    {
      key: "stl",
      title: "STL",
    },
    {
      key: "blk",
      title: "BLK",
    },
    {
      key: "fls",
      title: "FLS",
    },
    {
      key: "to",
      title: "TO",
    },
    {
      key: "twoPt",
      title: "2PT%",
    },
    {
      key: "threePt",
      title: "3PT%",
    },
    {
      key: "ft",
      title: "FT%",
    },
    {
      key: "fgp",
      title: "FG%",
    },
    {
      key: "opposingTeam",
      title: "Opposing Team",
    },
  ];

  const findOpposingTeam = useCallback(
    (game) => {
      const teamA = game.data.teamA.data.id;

      let opposingTeam;
      let isWinner;
      if (teamA === teamId) {
        opposingTeam = game.data.teamB.data;
        isWinner = game.data.teamA.stats.points > game.data.teamB.stats.points;
      } else {
        opposingTeam = game.data.teamA.data;
        isWinner = game.data.teamB.stats.points > game.data.teamA.stats.points;
      }
      return { opposingTeam, isWinner };
    },
    [teamId]
  );

  const renderCell = useCallback(
    (game, key) => {
      switch (key) {
        case "pts":
          const { isWinner } = findOpposingTeam(game);
          return (
            <p>
              {game.points}{" "}
              <span className={`${isWinner ? "text-success" : "text-danger"}`}>
                {isWinner ? "W" : "L"}
              </span>
            </p>
          );
        case "ast":
          return <p>{game.assists}</p>;
        case "reb":
          return <p>{game.rebounds}</p>;
        case "stl":
          return <p>{game.steals}</p>;
        case "blk":
          return <p>{game.blocks}</p>;
        case "fls":
          return <p>{game.fouls}</p>;
        case "to":
          return <p>{game.turnovers}</p>;
        case "twoPt":
          return (
            <p>
              {`${game.twoPoints.made} / ${game.twoPoints.attempt}`} <br />{" "}
              <span>{game.twoPoints.percentage}%</span>{" "}
            </p>
          );
        case "threePt":
          return (
            <p>
              {`${game.threePoints.made} / ${game.threePoints.attempt}`} <br />{" "}
              <span>{game.threePoints.percentage}%</span>{" "}
            </p>
          );
        case "ft":
          return (
            <p>
              {`${game.freeThrows.made} / ${game.freeThrows.attempt}`} <br />{" "}
              <span>{game.freeThrows.percentage}%</span>{" "}
            </p>
          );
        case "fgp":
          return (
            <p>
              {`${game.fieldGoals.made} / ${game.fieldGoals.attempt}`} <br />{" "}
              <span>{game.fieldGoals.percentage}%</span>{" "}
            </p>
          );
        case "opposingTeam":
          const { opposingTeam } = findOpposingTeam(game);
          return (
            <User
              className="cursor-pointer hover:underline"
              onClick={(e)=> {
                e.stopPropagation();
                router.push(`/teams?id=${opposingTeam.id}`);
              }}
              name={opposingTeam.teamName}
              description={opposingTeam.teamAbbr}
              avatarProps={{
                src: opposingTeam.teamLogo,
                showFallback: true,
                name: opposingTeam.teamAbbr,
              }}
            />
          );
      }
    },
    [findOpposingTeam, router]
  );

  return (
    <Table aria-label="Recent Games" removeWrapper>
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.title}</TableColumn>}
      </TableHeader>
      <TableBody items={games} isLoading={loading} loadingContent={<Spinner label="Please Wait..."/>} emptyContent="No Games Recorded">
        {(game) => (
          <TableRow
            key={game.id}
            className="cursor-pointer hover:bg-primary-500/5"
            onClick={() => router.push(`/games?id=${game.id}`)}
          >
            {(key) => <TableCell>{renderCell(game, key)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
