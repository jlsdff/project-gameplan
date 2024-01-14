"use client";
import React, { useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableCell,
} from "@nextui-org/table";

export default function CustomTable({ data }) {


  const columns = useMemo(() => {
    const sampleData = {
      firstname: "John",
      lastname: "Doe",
      middlename: "Y.",
      birthdate: new Date("1990-01-01"),
      birthplace: "Manila",
      actions: "Edit | Delete",
    };  
    return Object.keys(sampleData).map((value, index) => {
      return {
        key: index,
        name: value,
      };
    });
  }, []);

  return (
    <Table aria-label="Player Table" className="bg-transparent">
      <TableHeader className="bg-primary-700">
        {columns.map((column) => (
          <TableColumn className="bg-primary-800" key={column.key}>
            {column.name}
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody></TableBody>
    </Table>
  );
}
