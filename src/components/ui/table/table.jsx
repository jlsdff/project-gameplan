"use client";
import React, { useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableCell,
} from "@nextui-org/table";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "@/assets/searchIcon";
import { Spacer } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import AddIcon from "@/assets/addIcon";

export default function CustomTable({ data }) {
  const sampleData = {
    firstname: "John",
    lastname: "Doe",
    middlename: "Y.",
    birthdate: new Date("1990-01-01"),
    birthplace: "Manila",
    actions: "Edit | Delete",
  };

  const columns = useMemo(() => {
    return Object.keys(sampleData).map((value, index) => {
      return {
        key: index,
        name: value,
      };
    });
  }, [sampleData]);

  return (
    <>
      <section className="w-[]">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20 px-8 py-4",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<SearchIcon size={18} stroke="currentColor" />}
          type="search"
        />
        <Button  >
          <AddIcon size={8} stroke="currentColor" />
          Add Icon
        </Button>
      </section>
      <Spacer y={4} />
      <Table
        aria-label="Player Table"
        className="bg-transparent"
        bgcolor="primary"
        classNames={
          {
            base: "text-default-500",
            header: "bg-primary-700",
            body: "bg-primary-800",
            row: "bg-primary-800",
            cell: "bg-primary-800",
          }
        }
      >
        <TableHeader className="bg-primary-700">
          {columns.map((column) => (
            <TableColumn className="bg-primary-800" key={column.key}>
              {column.name}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody></TableBody>
      </Table>
    </>
  );
}
