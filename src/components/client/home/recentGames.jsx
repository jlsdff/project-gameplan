"use client";

import React, { useState, useEffect, useCallback } from "react";
import { getGamesByPage } from "@/utils/gamesAPI";
import { Spinner, User, Link, Avatar } from "@nextui-org/react";
import { getTeamById } from "@/utils/teamAPI";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function RecentGames() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchData = useCallback(async () => {
    const rawGames = await getGamesByPage(0, 5).then((res) =>
      res.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );

    const withTeams = await Promise.all(
      rawGames.map(async (game) => {
        const teamA = await getTeamById(game.teamA.id).then((res) => ({
          id: res.id,
          ...res.data(),
        }));
        const teamB = await getTeamById(game.teamB.id).then((res) => ({
          id: res.id,
          ...res.data(),
        }));
        return {
          ...game,
          teamA: { ...game.teamA, data: teamA },
          teamB: { ...game.teamB, data: teamB },
        };
      })
    );

    setGames(withTeams);
  }, []);

  useEffect(() => {
    try {
      fetchData();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [fetchData]);

  const getTotalScore = (team) => {
    const stats = team.stats;

    return (
      stats.twoPoints.made * 2 +
      stats.threePoints.made * 3 +
      stats.freeThrows.made
    );
  };

  const columns = [
    {
      key: "teamA",
      label: "Team A",
    },
    {
      key: "teamB",
      label: "Team B",
    },
  ];

  const renderCell = useCallback((item, key) => {
    switch (key) {
      case "teamA":
        return (
          <div className="flex items-center justify-between gap-2">
            <User
              name={item.teamA.data.teamName}
              description={item.teamA.data.teamAbbr}
              avatarProps={{
                src: item.teamA.data.teamLogo,
              }}
            />
            <span className="font-bold text-green-500">
              {getTotalScore(item.teamA)}
            </span>
          </div>
        );
      case "teamB":
        return (
          <div className="flex items-center justify-between gap-2">
            <User
              name={item.teamB.data.teamName}
              description={item.teamB.data.teamAbbr}
              avatarProps={{
                src: item.teamB.data.teamLogo,
              }}
            />{" "}
            <span className="font-bold text-red-500">
              {getTotalScore(item.teamB)}
            </span>
          </div>
        );
    }
  }, []);

  if (loading) {
    return (
      <section className="w-full h-[300px] flex justify-center items-center">
        <Spinner />
      </section>
    );
  }

  return (
    <section className="px-2">
      <Table
        aria-label="Recent Games of the Project Gameplan"
        hideHeader
        removeWrapper
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={games}>
          {(game) => (
            <TableRow
              key={game.key}
              onClick={() => {
                router.push(`/games?id=${game.id}`);
              }}
              className="cursor-pointer hover:bg-slate-500/5"
            >
              {(columnKey) => (
                <TableCell>{renderCell(game, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </section>
  );
}
