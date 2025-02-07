"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import { getGamesByPage } from "@/utils/gamesAPI";
import { getTeamById } from "@/utils/teamAPI";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  User,
  Link,
  Skeleton,
  Card,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
const fetchData = async () => {
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

  return withTeams;
};

const MainComponent = () => {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["games"],
    queryFn: fetchData,
    // refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    suspense: true,
    staleTime: 1000 * 60 * 5,
  });
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
              classNames={{
                name: "text-ellipsis line-clamp-1"
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

  return (
    <section className="w-full px-2 overflow-x-scroll scrollbar-hide">
      <Table
        aria-label="Recent Games of the Project Gameplan"
        hideHeader
        removeWrapper
        bottomContent={
          <div className="flex justify-center">
            <Link href="/games" className="text-slate-400" underline>
              See more
            </Link>
          </div>
        }
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={data}>
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
};

const SkeletonAvatar = () => {
  return (
    <div className="max-w-[300px] w-full flex items-center gap-3">
      <div>
        <Skeleton className="flex w-12 h-12 rounded-full" />
      </div>
      <div className="flex flex-col w-full gap-2">
        <Skeleton className="w-3/5 h-3 rounded-lg" />
        <Skeleton className="w-4/5 h-3 rounded-lg" />
      </div>
    </div>
  );
};

const Loading = () => {
  return (
    <div className="w-full space-y-2.5 bg-transparent" radius="none">
      <div className="flex items-center justify-between">
        <SkeletonAvatar />
        <SkeletonAvatar />
      </div>
      <div className="flex items-center justify-between">
        <SkeletonAvatar />
        <SkeletonAvatar />
      </div>
      <div className="flex items-center justify-between">
        <SkeletonAvatar />
        <SkeletonAvatar />
      </div>
      <div className="flex items-center justify-between">
        <SkeletonAvatar />
        <SkeletonAvatar />
      </div>
      <div className="flex items-center justify-between">
        <SkeletonAvatar />
        <SkeletonAvatar />
      </div>
    </div>
  );
};

const RecentGames = () => {
  return (
    <Suspense fallback={<Loading />}>
      <MainComponent />
    </Suspense>
  );
};

export default RecentGames;
