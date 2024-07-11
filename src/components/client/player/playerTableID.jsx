"use client";
import React, { useCallback, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Tooltip,
  User,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function PlayerTableById({ games, playerId }) {
  const router = useRouter();
  
  const findPlayerStats = (game) => {
    const stats = [...game.playerStats.teamA, ...game.playerStats.teamB];
    return stats.find((stat) => stat.id === playerId);
  };

  const findCurrentTeam = useCallback(
    (game) => {
      // const teamAPlayers = game.teamA.data.players;
      // const teamBPlayers = game.teamB.data.players;
      // const currentTeam = teamAPlayers.find((player) => player === playerId)
      //   ? { ...game.teamA.data, stats: game.teamA.stats }
      //   : { ...game.teamB.data, stats: game.teamB.stats };
      // console.log("Current Team:",currentTeam)
      // console.log("TEAM A", game.teamA)

      const isTeamA = game.playerStats.teamA.some(
        (playerStat) => playerStat.id === playerId
      );

      const currentTeam = isTeamA
        ? {
            ...game.teamA.data,
            stats: game.teamA.stats,
          }
        : { ...game.teamB.data, stats: game.teamB.stats };
      return {
        currentTeam,
        opposingTeam: isTeamA
          ? { ...game.teamB.data, stats: game.teamB.stats }
          : { ...game.teamA.data, stats: game.teamA.stats },
      };
    },
    [playerId]
  );

  const columns = [
    // TODO: tentative: Replace with league
    // {
    //   key: "number",
    //   title: "#",
    //   description: "Game Number",
    // },
    {
      key: "points",
      title: "PTS",
      description: "Points",
    },
    {
      key: "assists",
      title: "AST",
      description: "Assists",
    },
    {
      key: "rebounds",
      title: "REB",
      description: "Rebounds",
    },
    {
      key: "FGP",
      title: "FG%",
      description: "Field Goal Percentage",
    },
    {
      key: "currentTeam",
      title: "Current Team",
      description: "Current Team",
    },
    {
      key: "opposingTeam",
      title: "Opposing Team",
      description: "Opposing Team",
    },
    {
      key: "date",
      title: "Date",
      description: "Game Date",
    },
    {
      key: "league",
      title: "League",
      description: "League",
    },
  ];

  const toGame = (id) => {
    router.push(`/games?id=${id}`);
  };

  const toTeam = (id) => {
    router.push(`/teams?id=${id}`);
  };

  const toLeague = (id) => {
    router.push(`/leagues?id=${id}`);
  };

  const renderCell = (game, key) => {
    const currentStat = findPlayerStats(game);
    const { currentTeam, opposingTeam } = findCurrentTeam(game);
    if (!currentTeam || !opposingTeam) return null;
    switch (key) {
      case "number":
        return <span>{game.number}</span>;
      case "date":
        const date = game.date.toDate().toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
        });
        return (
          <span>{date}</span>
        )
      case "points":
        const points =
          currentStat.twoPointsMade * 2 +
          currentStat.threePointsMade * 3 +
          currentStat.freeThrowsMade;
        return <span>{points}</span>;
      case "assists":
        const assists = currentStat.assists;
        return <span>{assists}</span>;
      case "rebounds":
        const rebounds = currentStat.rebounds;
        return <span>{rebounds}</span>;
      case "FGP":
        const totalAttempts =
          currentStat.twoPointsAttempted + currentStat.threePointsAttempted;
        const totalMade =
          currentStat.twoPointsMade + currentStat.threePointsMade;
        const fgp = ((totalMade / totalAttempts) * 100).toFixed(2);
        return <span>{`${fgp}%`}</span>;
      case "currentTeam":
        console.log("Current Team:", currentTeam);
        return (
          <div
            className="flex items-center justify-start gap-2 cursor-pointer hover:underline"
            onClick={(e) => {
              e.stopPropagation();
              toTeam(currentTeam.id);
            }}
          >
            <User
              name={currentTeam.teamName}
              description={currentTeam.teamAbbr}
              avatarProps={{
                src: currentTeam.teamLogo,
                showFallback: true,
              }}
            />
            <div className="flex items-center justify-center gap-1 font-bold">
              {currentTeam.stats.points > opposingTeam.stats.points ? (
                <span className=" text-success-500">W</span>
              ) : (
                <span className=" text-danger-500">L</span>
              )}
              <h2>{currentTeam.stats.points}</h2>
            </div>
          </div>
        );
      case "opposingTeam":
        return (
          <div
            className="flex items-center justify-start gap-2 cursor-pointer hover:underline"
            onClick={(e) => {
              e.stopPropagation();
              toTeam(opposingTeam.id);
            }}
          >
            <User
              name={opposingTeam.teamName}
              avatarProps={{
                src: opposingTeam.teamLogo,
                showFallback: true,
              }}
            />
            <div className="flex items-center justify-center gap-1 font-bold">
              {opposingTeam.stats.points > currentTeam.stats.points ? (
                <span className=" text-success-500">W</span>
              ) : (
                <span className=" text-danger-500">L</span>
              )}
              <h2>{opposingTeam.stats.points}</h2>
            </div>
          </div>
        );
      case "time":
        return (
          <span>
            {game.time.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </span>
        );
      case "league":
        return (
          <span
            className="cursor-pointer hover:underline"
            onClick={(e) => {
              e.stopPropagation();
              toLeague(game.leagueId);
            }}
          >
            {game.league.title}
          </span>
        );
    }
  };

  return (
    <>
      <Table aria-label="Games Played">
        <TableHeader columns={columns}>
          {(col) => <TableColumn key={col.key}>{col.title}</TableColumn>}
        </TableHeader>
        <TableBody items={games}>
          {(game) => {
            return (
              <TableRow
                key={game.id}
                onClick={() => {
                  toGame(game.id);
                }}
                className="cursor-pointer hover:bg-primary-500/5"
              >
                {(columnkey) => (
                  <TableCell>{renderCell(game, columnkey)}</TableCell>
                )}
              </TableRow>
            );
          }}
        </TableBody>
      </Table>
    </>
  );
}
