"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
} from "@nextui-org/react";
import renderPlayerCell from "@/helpers/players/renderPlayerCell";
import { useRouter } from "next/navigation";

export default function TableClient({ columns, items }) {
  const router = useRouter();

  const routeToPlayer = (id) => {
    router.push(`/players/${id}`);
  };
  // items.map(item => console.log(item.gameRecords))
  return (
    <Table removeWrapper aria-label="Data Display Table for Players">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.key}>
            <Tooltip content={column.description}>{column.label}</Tooltip>
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow
            className="cursor-pointer hover:bg-primary-900/5"
            key={item.id}
            onClick={() => routeToPlayer(item.id)}
          >
            {(columnKey) => (
              <TableCell>{renderPlayerCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
