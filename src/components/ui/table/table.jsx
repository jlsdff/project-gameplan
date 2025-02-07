"use client";
import React, { useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@heroui/react";

export default function CustomTable({
  rows,
  columns,
  isSelectable,
  tableLabel,
  onRowClick,
  onRowDelete,
  onRowEdit,
  onRowView,
  isLoading,
  renderCell
}) {
  return (
    <Table
      selectionMode={isSelectable ? "multiple" : "none"}
      aria-label={tableLabel || "table for data display"}
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
