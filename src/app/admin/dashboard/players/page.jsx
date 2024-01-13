"use client";
import React, { useMemo, useEffect, useState, useCallback } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Pagination,
  Spacer,
  Input,
  Button,
} from "@nextui-org/react";
import { SearchIcon } from "@/assets/searchIcon";
import AddIcon from "@/assets/addIcon";
import { getPlayers } from "@/lib/firebase/getData";
import { useAsyncList } from "@react-stately/data";

export default function Players() {

  const [players, setPlayers] = useState([]);
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;

  const list = useAsyncList({
    async load() {
      const datas = await getPlayers(rowsPerPage, ((page * rowsPerPage) - 9));
      console.log(datas)
      setPlayers(datas);
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          let first = a[sortDescriptor.column];
          let second = b[sortDescriptor.column];
          let cmp =
            (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

          if (sortDescriptor.direction === "descending") {
            cmp *= -1;
          }

          return cmp;
        }),
      };
    },
  });

  const pages = Math.ceil(players.length / rowsPerPage);

  const sortedItems = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return players.slice(start, end);
  }, [page, players]);

  const columns = [
    {
      key: "lastname",
      label: "Last Name",
    },
    {
      key: "firstname",
      label: "First Name",
    },
    {
      key: "middlename",
      label: "Middle Name",
    },
    {
      key: "position",
      label: "Position",
    },
    {
      key: "birthplace",
      label: "Birthplace",
    },
    {
      key: "birthdate",
      label: "Birthdate",
    },
  ];

  console.log(players)

  return (
    <section className="p-8 sm:p-16">
      <section className="flex justify-start items-center gap-8">
        <Input
          classNames={{
            base: "max-w-full sm:w-full h-10 ",
            mainWrapper: "h-full",
            input: "text-sm",
            inputWrapper:
              "h-full font-normal text-foreground bg-neutral-800 dark:bg-default-900 px-4 py-2 sm:px-8 sm:py-4",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<SearchIcon size={18} stroke="currentColor" />}
          type="search"
        />
        <Button className="bg-neutral-800 hover:bg-neutral-700">
          <AddIcon size={18} stroke="currentColor" />
          Add Player
        </Button>
      </section>
      <Spacer y={4} />
      <Table
        aria-label="Player Table"
        className="bg-transparent"
        bgcolor="primary"
        selectionMode="multiple"
        sortDescriptor={list.sortDescriptor}
        onSortChange={list.sort}
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
      >
        <TableHeader className="bg-primary-700" columns={columns}>
          {(column) => (
            <TableColumn key={column.key} allowsSorting>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent="No data to display." items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </section>
  );
}
