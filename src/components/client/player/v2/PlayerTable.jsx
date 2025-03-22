"use client";
import { firestore } from "@/lib/firebase/firebase";
import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
} from "@heroui/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useCallback, useEffect } from "react";
import { Timestamp } from "@/lib/firebase/firebase";

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

export default function PlayerTable({ games }) {
  const pathname = usePathname();
  const playerId = pathname.split("/").pop();
  const router = useRouter();

  const findPlayerStats = useCallback(
    (game) => {
      const stats = [...game.playerStats.teamA, ...game.playerStats.teamB];

      const playerStat = stats.find((stat) => stat.id === playerId);
      if (!playerStat) {
        console.log("unknown player: ", playerId);
        console.log("game: ", game);
      }
      return stats.find((stat) => stat.id === playerId);
    },
    [playerId]
  );

  const findCurrentTeam = useCallback(
    (game) => {
      const isTeamA = game.playerStats.teamA.some(
        (playerStat) => playerStat.id === playerId
      );

      const currentTeam = isTeamA
        ? {
            id: game.teamA.id,
            stats: game.teamA.stats,
          }
        : { id: game.teamB.id, stats: game.teamB.stats };
      return {
        currentTeam,
        opposingTeam: isTeamA
          ? { id: game.teamB.id, stats: game.teamB.stats }
          : { id: game.teamA.id, stats: game.teamA.stats },
      };
    },
    [playerId]
  );

  const toGame = (id) => {
    router.push(`/games/${id}`);
  };

  const toTeam = (id) => {
    router.push(`/teams?id=${id}`);
  };

  const toLeague = (id) => {
    router.push(`/leagues?id=${id}`);
  };

  const renderCell = useCallback((game, key) => {
    const currentStat = findPlayerStats(game);
    if (!currentStat) {
      console.error("No stats found for player in game", {
        "Player ID": playerId,
        Game: game.doc,
      });
    }
    const { currentTeam, opposingTeam } = findCurrentTeam(game);

    switch (key) {
      case "points":
        return (
          <div>
            {currentStat.twoPointsMade * 2 +
              currentStat.threePointsMade * 3 +
              currentStat.freeThrowsMade}
          </div>
        );
      case "assists":
        return <div>{currentStat.assists}</div>;
      case "rebounds":
        return <div>{currentStat.rebounds}</div>;
      case "steals":
        return <div>{currentStat.steals}</div>;
      case "blocks":
        return <div>{currentStat.blocks}</div>;
      case "currentTeam":
        const isCurrentWon =
          currentTeam.stats.points > opposingTeam.stats.points;
        return (
          <div
            className="cursor-pointer hover:underline"
            onClick={(e) => {
              e.stopPropagation();
              toTeam(currentTeam.id);
            }}
          >
            <TeamAvatar
              id={currentTeam.id}
              score={
                <div
                  className={`${
                    isCurrentWon ? "text-green-500" : "text-red-500"
                  } font-semibold`}
                >
                  {isCurrentWon ? "W " : "L "}
                  {currentTeam.stats.points}
                </div>
              }
            />
          </div>
        );
      case "opposingTeam":
        const isOpposingWon =
          opposingTeam.stats.points > currentTeam.stats.points;
        return (
          <div
            className="cursor-pointer hover:underline"
            onClick={(e) => {
              e.stopPropagation();
              toTeam(opposingTeam.id);
            }}
          >
            <TeamAvatar
              id={opposingTeam.id}
              score={
                <div
                  className={`${
                    isOpposingWon ? "text-green-500" : "text-red-500"
                  } font-semibold`}
                >
                  {isOpposingWon ? "W " : "L "}
                  {opposingTeam.stats.points}
                </div>
              }
            />
          </div>
        );
      case "date":
        const date = new Timestamp(
          game.date.seconds,
          game.date.nanoseconds
        ).toDate();
        return (
          <div>
            {date.toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
        );
        return <></>;
      case "league":
        return (
          <div
            className="cursor-pointer hover:underline"
            onClick={(e) => {
              e.stopPropagation();
              toLeague(game.leagueId);
            }}
          >
            <LeagueAvatar id={game.leagueId} />
          </div>
        );
      default:
        return <></>;
    }
  }, []);

  return (
    <Table aria-label="Player Game Records">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.title}</TableColumn>}
      </TableHeader>
      <TableBody items={games}>
        {(game) => (
          <TableRow
            key={game.doc}
            className="cursor-pointer hover:bg-primary-500/5"
            onClick={() => toGame(game.doc)}
          >
            {(key) => <TableCell>{renderCell(game, key)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

function LoadingAvatar() {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="rounded-full w-8 h-8 " />
      <Skeleton className="w-12 h-2.5 rounded-sm" />
    </div>
  );
}

function TeamAvatar({ id, score }) {
  const [teamData, setTeamData] = useState(null);

  const fetchTeam = async (teamId) => {
    const team = await firestore
      .collection("teams")
      .doc(teamId)
      .get()
      .then((res) => ({ id: res.id, ...res.data() }))
      .then((team) => setTeamData(team));
    return team;
  };

  useEffect(() => {
    fetchTeam(id);
  }, []);

  if (!teamData) {
    return <LoadingAvatar />;
  }

  return (
    <div className="flex justify-start items-center gap-2">
      {<div>{score}</div>}
      <User
        avatarProps={{
          src: teamData.teamLogo,
        }}
        name={teamData.teamName}
      />
    </div>
  );
}

function LeagueAvatar({ id }) {
  const [leagueData, setLeagueData] = useState(null);

  const fetchLeague = async () => {
    const league = await firestore
      .collection("leagues")
      .doc(id)
      .get()
      .then((res) => ({ id: res.id, ...res.data() }))
      .then((league) => setLeagueData(league));
    return league;
  };

  useEffect(() => {
    fetchLeague();
  }, []);

  if (!leagueData) {
    return <LoadingAvatar />;
  }
  return <div>{leagueData.title}</div>;
}
