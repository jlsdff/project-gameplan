"use client";
import React, { useMemo, useState } from "react";
import { timestampToDate } from "@/helpers/timestampToDate";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function LeaguesTable({ leagues, loading }) {
  console.log(leagues);
  const router = useRouter();
  const [page, setPage] = useState(1);
  const rowPerPage = 10;
  const pages = Math.ceil(leagues.length / rowPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowPerPage;
    const end = start + rowPerPage;

    return leagues.slice(start, end);
  }, [leagues, page]);

  const columns = [
    {
      key: "title",
      title: "Title",
    },
    {
      key: "schedule",
      title: "Schedule",
    },
    {
      key: "venue",
      title: "Venue",
    },
    {
      key: "noOfTeams",
      title: "Total Teams",
    },
    {
      key: "noOfMatches",
      title: "Total Matches",
    },
  ];

  const renderCell = (league, key) => {
    switch (key) {
      case "title":
        return <span>{league.title}</span>;
      case "schedule":
        const schedule = league.dateSchedule.join(",");
        const start = new Date();
        start.setHours(league.timeFrom.split(":")[0]);
        start.setMinutes(league.timeFrom.split(":")[1]);
        const end = new Date();
        end.setHours(league.timeTo.split(":")[0]);
        end.setMinutes(league.timeTo.split(":")[1]);
        return (
          <span>{`${schedule} | ${start.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })} - ${end.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}`}</span>
        );
      case "venue":
        return <span>{league.venue}</span>;
      case "noOfTeams":
        return <span>{league.participatingTeams.length}</span>;
      case "noOfMatches":
        return <span>{league.games.length}</span>;
    }
  };

  const toLeague = (id) => {
    router.push(`/leagues?id=${id}`);
  };

  return (
    <>
      <Table aria-label="Data Display for League" removeWrapper hoverable >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.title}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={items} emptyContent="No Recent Leagues" isLoading={loading} loadingContent={<Spinner label="Loading..."/>} >
          {(league) => (
            <TableRow
              className="cursor-pointer hover:bg-primary/5"
              key={league.id}
              onClick={() => toLeague(league.id)}
            >
              {(key) => <TableCell>{renderCell(league, key)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex justify-center w-full mt-4">
        <Pagination
          // isCompact
          // showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={(page) => setPage(page)}
        />
      </div>
    </>
  );
}
