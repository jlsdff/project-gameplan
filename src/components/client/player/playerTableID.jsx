"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Tooltip,
  User,
  Select,
  SelectItem,
} from "@heroui/react";
import { useRouter } from "next/navigation";

// @decrapated
// TODO: Remove this component
export default function PlayerTableById({ games, playerId }) {
  const router = useRouter();

  const leagues = useMemo(() => {
    const leagueSet = new Set();
    leagueSet.add("All");
    games.forEach((games) => {
      leagueSet.add(games.league.title);
    });
    return Array.from(leagueSet);
  }, [games]);
  console.log("Games from PlayerTableById", games);

  const [selectedLeague, setSelectedLeague] = useState(new Set(["All"]));

  const [displayedGames, setDisplayedGames] = useState(games);

  useEffect(() => {
    const selected = Array.from(selectedLeague)[0];

    if (selected === "All") {
      setDisplayedGames(games);
    } else {
      setDisplayedGames(games.filter((game) => game.league.title === selected));
    }
  }, [games, selectedLeague]);

  const findPlayerStats = (game) => {
    const stats = [...game.playerStats.teamA, ...game.playerStats.teamB];

    const playerStat = stats.find((stat) => stat.id === playerId);
    if (!playerStat) {
      console.log("unknown player: ", playerId);
      console.log("game: ", game);
    }
    return stats.find((stat) => stat.id === playerId);
  };

  const findCurrentTeam = useCallback(
    (game) => {
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
      key: "steals",
      title: "STL",
      description: "Steals",
    },
    {
      key: "blocks",
      title: "BLK",
      description: "Blocks",
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
    if (!currentStat) {
      console.log(game);
    }
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
        return <span>{date}</span>;
      case "points":
        const points =
          currentStat.twoPointsMade * 2 +
          currentStat.threePointsMade * 3 +
          currentStat.freeThrowsMade;
        return <span>{points || 0}</span>;
      case "assists":
        const assists = currentStat.assists;
        return <span>{assists}</span>;
      case "rebounds":
        const rebounds = currentStat.rebounds;
        return <span>{rebounds}</span>;
      case "steals":
        const steals = currentStat.steals || 0;
        return <span>{steals}</span>;
      case "blocks":
        const blocks = currentStat.blocks || 0;
        return <span>{blocks}</span>;
      case "currentTeam":
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
      default:
        return <span></span>;
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-1 mb-2">
        <div>
          <h2 className="text-lg font-bold tracking-wide md:text-xl max-w-sm">
            Games Played
          </h2>
        </div>
        <div className="flex items-center justify-end">
          <Select
            className="w-full sm:max-w-xs"
            label="Filter by League"
            size="sm"
            variant="bordered"
            selectedKeys={selectedLeague}
            onSelectionChange={setSelectedLeague}
          >
            {leagues.map((league) => (
              <SelectItem className="w-full" key={league}>
                {league}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>

      <Table aria-label="Games Played">
        <TableHeader columns={columns}>
          {(col) => <TableColumn key={col.key}>{col.title}</TableColumn>}
        </TableHeader>
        <TableBody items={displayedGames}>
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
