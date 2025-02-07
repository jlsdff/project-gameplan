import React, { use, useCallback, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
  flexRender,
} from "@tanstack/react-table";
import {
  Button,
  Card,
  Checkbox,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@heroui/react";
import { useNewGameStore } from "../gameStore";
import _, { map } from "underscore";
import ChevronIcon from "@/assets/chevronIcon";
import CheckIcon from "@/assets/checkIcon";

const RenderCellActions = (info) => {
  const { markAsDNP } = useNewGameStore();

  const actions = useCallback(
    (key) => {
      switch (key) {
        case "DNP":
          console.log("DNP");
          markAsDNP(info.row.original.id);
          break;
        default:
          break;
      }
    },
    [info]
  );

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly>
          <ChevronIcon size={14} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        onAction={(key) => actions(key)}
        aria-label="Dropdown actions"
      >
        <DropdownItem
          key="DNP"
          startContent={info.row.original.isDNP && <CheckIcon size={14} />}
        >
          {
            info.row.original.isDNP ?
            "Mark as Active" :
            "Mark as DNP"
          }
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

const StatTable = ({ id, team }) => {
  const { stats, statsDispatch } = useNewGameStore();
  const columnHelper = useMemo(() => createColumnHelper(), []);

  const columns = useMemo(
    () => [
      columnHelper.display({
        header: " ",
        cell: (info) => RenderCellActions(info),
      }),
      columnHelper.accessor((row) => row.number, {
        id: "number",
        header: "#",
        cell: ({ getValue, column }) => <span>{getValue()}</span>,
      }),
      columnHelper.accessor((row) => `${row.lastname}, ${row.firstname}`, {
        id: "name",
        header: () => <span className="font-bold">Name</span>,
        cell: ({ getValue }) => <span className="">{getValue()}</span>,
      }),
      columnHelper.group({
        header: "2 Points",
        columns: [
          columnHelper.accessor("twoPointsMade", {
            header: "Made",
            size: 100,
            cell: (info) => (
              <Input
                classNames={{ base: "w-20", inputWrapper: "bg-gray-700" }}
                type="number"
                value={info.getValue()}
                isDisabled={info.row.original.isDNP}
                onValueChange={ value => statsDispatch({type: 'twoPointsMade', id: info.row.original.id, team ,value}) }
              />
            ),
          }),
          columnHelper.accessor("twoPointsAttempted", {
            header: "Attempted",
            size: 100,
            cell: (info) => (
              <Input
                classNames={{ base: "w-20", inputWrapper: "bg-gray-700" }}
                type="number"
                value={info.getValue()}
                isDisabled={info.row.original.isDNP}
                onValueChange={ value => statsDispatch({type: 'twoPointsAttempted', id: info.row.original.id, team ,value}) }
              />
            ),
          }),
        ],
      }),
      columnHelper.group({
        header: "3 Points",
        columns: [
          columnHelper.accessor("threePointsMade", {
            header: "Made",
            cell: (info) => (
              <Input
                classNames={{ base: "w-20", inputWrapper: "bg-gray-700" }}
                type="number"
                value={info.getValue()}
                isDisabled={info.row.original.isDNP}
                onValueChange={ value => statsDispatch({type: 'threePointsMade', id: info.row.original.id, team ,value}) }
              />
            ),
          }),
          columnHelper.accessor("threePointsAttempted", {
            header: "Attempted",
            cell: (info) => (
              <Input
                classNames={{ base: "w-20", inputWrapper: "bg-gray-700" }}
                type="number"
                value={info.getValue()}
                isDisabled={info.row.original.isDNP}
                onValueChange={ value => statsDispatch({type: 'threePointsAttempted', id: info.row.original.id, team ,value}) }
              />
            ),
          }),
        ],
      }),
      columnHelper.group({
        header: "FT",
        columns: [
          columnHelper.accessor("freeThrowsMade", {
            header: "Made",
            cell: (info) => (
              <Input
                classNames={{ base: "w-20", inputWrapper: "bg-gray-700" }}
                type="number"
                value={info.getValue()}
                isDisabled={info.row.original.isDNP}
                onValueChange={ value => statsDispatch({type: 'freeThrowsMade', id: info.row.original.id, team ,value}) }
              />
            ),
          }),
          columnHelper.accessor("freeThrowsAttempted", {
            header: "Attempted",
            cell: (info) => (
              <Input
                classNames={{ base: "w-20", inputWrapper: "bg-gray-700" }}
                type="number"
                value={info.getValue()}
                isDisabled={info.row.original.isDNP}
                onValueChange={ value => statsDispatch({type: 'freeThrowsAttempted', id: info.row.original.id, team ,value}) }
              />
            ),
          }),
        ],
      }),
      columnHelper.group({
        header: "Stats",
        columns: [
          columnHelper.accessor("rebounds", {
            header: "Rebounds",
            cell: (info) => (
              <Input
                classNames={{ base: "w-20", inputWrapper: "bg-gray-700" }}
                type="number"
                value={info.getValue()}
                isDisabled={info.row.original.isDNP}
                onValueChange={ value => statsDispatch({type: 'rebounds', id: info.row.original.id, team ,value}) }
              />
            ),
          }),
          columnHelper.accessor("assists", {
            header: "Assists",
            cell: (info) => (
              <Input
                classNames={{ base: "w-20", inputWrapper: "bg-gray-700" }}
                type="number"
                value={info.getValue()}
                isDisabled={info.row.original.isDNP}
                onValueChange={ value => statsDispatch({type: 'assists', id: info.row.original.id, team ,value}) }
              />
            ),
          }),
          columnHelper.accessor("steals", {
            header: "Steals",
            cell: (info) => (
              <Input
                classNames={{ base: "w-20", inputWrapper: "bg-gray-700" }}
                type="number"
                value={info.getValue()}
                isDisabled={info.row.original.isDNP}
                onValueChange={ value => statsDispatch({type: 'steals', id: info.row.original.id, team ,value}) }
              />
            ),
          }),
          columnHelper.accessor("blocks", {
            header: "blocks",
            cell: (info) => (
              <Input
                classNames={{ base: "w-20", inputWrapper: "bg-gray-700" }}
                type="number"
                value={info.getValue()}
                isDisabled={info.row.original.isDNP}
                onValueChange={ value => statsDispatch({type: 'blocks', id: info.row.original.id, team ,value}) }
              />
            ),
          }),
          columnHelper.accessor("fouls", {
            header: "Fouls",
            cell: (info) => (
              <Input
                classNames={{ base: "w-20", inputWrapper: "bg-gray-700" }}
                type="number"
                value={info.getValue()}
                isDisabled={info.row.original.isDNP}
                onValueChange={ value => statsDispatch({type: 'fouls', id: info.row.original.id, team ,value}) }
              />
            ),
          }),
          columnHelper.accessor("turnovers", {
            header: "Turnovers",
            cell: (info) => (
              <Input
                classNames={{ base: "w-20", inputWrapper: "bg-gray-700" }}
                type="number"
                value={info.getValue()}
                isDisabled={info.row.original.isDNP}
                onValueChange={ value => statsDispatch({type: 'turnovers', id: info.row.original.id, team ,value}) }
              />
            ),
          }),
        ],
      }),
    ],
    [columnHelper]
  );

  const { getHeaderGroups, getRowModel, getTotalSize, ...table } =
    useReactTable({
      columns: columns,
      data: stats[team],
      getCoreRowModel: getCoreRowModel(),
    });
    
  const teamCard = team === "teamA" ? <Card shadow className="w-full">Team A</Card> : <Card shadow className="w-full">Team B</Card>;

  return (
    <>
      <section className="w-full overflow-x-auto">
      <table className="min-w-full border-collapse divide-y divide-gray-200">
        <thead className="bg-[#201b18]">
          {getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-xs font-medium tracking-wider text-center text-white uppercase"
                  colSpan={header.colSpan}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-[#272729] divide-y divide-gray-200 text-white">
          {getRowModel().rows.map((row, index) => (
            <tr
              key={row.id}
              className={`${
                index % 2 === 0 ? "bg-[#272729]" : "bg-[#1f1f1f]"
              } `}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={`px-6 py-4 text-sm text-white whitespace-nowrap w-[${cell.column.getSize()}px] ${cell.row.original.isDNP ? "opacity-20": ""}`}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
    </>
  );
};

export default StatTable;
