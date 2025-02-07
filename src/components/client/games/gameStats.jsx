'use client'
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";

export default function GameStats({ teamA, teamB }) {
  return (
    <>
      <Table aria-label="Stats Comparison" removeWrapper hideHeader  >
        <TableHeader>
          <TableColumn className="text-center">{teamA.data.teamName}</TableColumn>
          <TableColumn className="text-center">STATS</TableColumn>
          <TableColumn className="text-center">{teamB.data.teamName}</TableColumn>
        </TableHeader>
        <TableBody className="text-center">
          <TableRow>
            <TableCell className="text-center ">{teamA.stats.points}</TableCell>
            <TableCell className="font-bold text-center">
              <h3>PTS</h3>
            </TableCell>
            <TableCell className="text-center ">{teamB.stats.points}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-center ">
              {teamA.stats.assists}
            </TableCell>
            <TableCell className="font-bold text-center">
              <h3>AST</h3>
            </TableCell>
            <TableCell className="text-center ">
              {teamB.stats.assists}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-center ">
              {teamA.stats.rebounds}
            </TableCell>
            <TableCell className="font-bold text-center">
              <h3>REB</h3>
            </TableCell>
            <TableCell className="text-center ">
              {teamB.stats.rebounds}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-center ">{teamA.stats.steals}</TableCell>
            <TableCell className="font-bold text-center">
              <h3>STL</h3>
            </TableCell>
            <TableCell className="text-center ">{teamB.stats.steals}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-center ">{teamA.stats.blocks}</TableCell>
            <TableCell className="font-bold text-center">
              <h3>BLK</h3>
            </TableCell>
            <TableCell className="text-center ">{teamB.stats.blocks}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-center ">{teamA.stats.fouls}</TableCell>
            <TableCell className="font-bold text-center">
              <h3>FLS</h3>
            </TableCell>
            <TableCell className="text-center ">{teamB.stats.fouls}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-center ">
              {teamA.stats.turnovers}
            </TableCell>
            <TableCell className="font-bold text-center">
              <h3>TO</h3>
            </TableCell>
            <TableCell className="text-center ">
              {teamB.stats.turnovers}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-center ">
              {`${teamA.stats.fieldGoals.made}/${teamA.stats.fieldGoals.attempt}`}{" "}
              <span className="font-semibold">
                {teamA.stats.fieldGoals.percentage}%
              </span>
            </TableCell>
            <TableCell className="font-bold text-center">
              <h3>FG%</h3>
            </TableCell>
            <TableCell className="text-center ">
              {`${teamB.stats.fieldGoals.made}/${teamB.stats.fieldGoals.attempt}`}{" "}
              <span className="font-semibold">
                {teamB.stats.fieldGoals.percentage}%
              </span>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-center ">
              {`${teamA.stats.twoPoints.made}/${teamA.stats.twoPoints.attempt}`}{" "}
              <span className="font-semibold">
                {teamA.stats.twoPoints.percentage}%
              </span>
            </TableCell>
            <TableCell className="font-bold text-center">
              <h3>2PT%</h3>
            </TableCell>
            <TableCell className="text-center ">
              {`${teamB.stats.twoPoints.made}/${teamB.stats.twoPoints.attempt}`}{" "}
              <span className="font-semibold">
                {teamB.stats.twoPoints.percentage}%
              </span>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-center ">
              {`${teamA.stats.threePoints.made}/${teamA.stats.threePoints.attempt}`}{" "}
              <span className="font-semibold">
                {teamA.stats.threePoints.percentage}%
              </span>
            </TableCell>
            <TableCell className="font-bold text-center">
              <h3>3PT%</h3>
            </TableCell>
            <TableCell className="text-center ">
              {`${teamB.stats.threePoints.made}/${teamB.stats.threePoints.attempt}`}{" "}
              <span className="font-semibold">
                {teamB.stats.threePoints.percentage}%
              </span>
            </TableCell>
          </TableRow>
          <TableRow>
          <TableCell className="text-center ">
            {`${teamA.stats.freeThrows.made}/${teamA.stats.freeThrows.attempt}`}{" "}
            <span className="font-semibold">
              {teamA.stats.freeThrows.percentage}%
            </span>
          </TableCell>
          <TableCell className="font-bold text-center">
            <h3>FT%</h3>
          </TableCell>
          <TableCell className="text-center ">
            {`${teamB.stats.freeThrows.made}/${teamB.stats.freeThrows.attempt}`}{" "}
            <span className="font-semibold">
              {teamB.stats.freeThrows.percentage}%
            </span>
          </TableCell>
        </TableRow>
        </TableBody> 
      </Table>
    </>
  );
}
