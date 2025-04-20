import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
} from "@heroui/react";
import { useRouter } from "next/navigation";

export default function PlayerTable({ stats }) {
  const router = useRouter();

  const columns = [
    {
      key: "player",
      label: "Player",
    },
    {
      key: "pts",
      label: "PTS",
    },
    {
      key: "ast",
      label: "AST",
    },
    {
      key: "reb",
      label: "REB",
    },
    {
      key: "stl",
      label: "STL",
    },
    {
      key: "blk",
      label: "BLK",
    },
    {
      key: "fls",
      label: "FLS",
    },
    {
      key: "to",
      label: "TO",
    },
    {
      key: "fgp",
      label: "FG%",
    },
    {
      key: "ft",
      label: "FT%",
    },
    {
      key: "2pt",
      label: "2PT%",
    },
    {
      key: "3pt",
      label: "3PT%",
    },
  ];

  const toPlayer = (id) => router.push(`/players/${id}`);

  const renderCell = (stat, key) => {
    switch (key) {
      case "player":
        return (
          <User
            name={stat.data.lastname}
            description={stat.data.positions.join(" | ")}
            avatarProps={{ src: stat.data.image }}
            className="cursor-pointer hover:underline"
            onClick={() => toPlayer(stat.id)}
          />
        );
      case "pts":
        return (
          <span>
            {stat.twoPointsMade * 2 +
              stat.threePointsMade * 3 +
              stat.freeThrowsMade}
          </span>
        );
      case "ast":
        return <span>{stat.assists}</span>;
      case "reb":
        return <span>{stat.rebounds}</span>;
      case "stl":
        return <span>{stat.steals}</span>;
      case "blk":
        return <span>{stat.blocks}</span>;
      case "fls":
        return <span>{stat.fouls}</span>;
      case "to":
        return <span>{stat.turnovers}</span>;
      case "fgp":
        const made = stat.threePointsMade + stat.twoPointsMade;
        const attempts = stat.twoPointsAttempted + stat.threePointsAttempted;
        const res = ((made / attempts) * 100).toFixed(2);
        return (
          <span>
            {`${made} / ${attempts}`} <br />
            <span className="font-semibold">{`${res}%`}</span>
          </span>
        );
      case "2pt":
        const twoP = (
          (stat.twoPointsMade / stat.twoPointsAttempted) *
          100
        ).toFixed(2);
        return (
          <span>
            {`${stat.twoPointsMade} / ${stat.twoPointsAttempted}`}
            <br />
            <span className="font-semibold">{twoP}%</span>
          </span>
        );
      case "3pt":
        const threeP = (
          (stat.threePointsMade / stat.threePointsAttempted) *
          100
        ).toFixed(2);
        return (
          <span>
            {`${stat.threePointsMade} / ${stat.threePointsAttempted}`}
            <br />
            <span className="font-semibold">{threeP}%</span>
          </span>
        );
      case "ft":
        const ftp = (
          (stat.freeThrowsMade / stat.freeThrowsAttempted) *
          100
        ).toFixed(2);
        return (
          <span>
            {`${stat.freeThrowsMade} / ${stat.freeThrowsAttempted}`}
            <br />
            <span className="font-semibold">{ftp}%</span>
          </span>
        );
    }
  };

  return (
    <>
      <Table>
        <TableHeader columns={columns}>
          {(col) => <TableColumn key={col.key}>{col.label}</TableColumn>}
        </TableHeader>
        <TableBody
          items={stats.sort((a, b) => {
            return (
              b.freeThrowsMade +
              b.threePointsMade * 3 +
              b.twoPointsMade * 2 -
              (a.freeThrowsMade + a.twoPointsMade * 2 + a.threePointsMade * 3)
            );
          })}
        >
          {(stat) => (
            <TableRow key={stat.id}>
              {(key) => <TableCell>{renderCell(stat, key)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
