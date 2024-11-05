import React, { use, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
  flexRender,
} from "@tanstack/react-table";
import { Card } from "@nextui-org/react";
import { useNewGameStore } from "../gameStore";
import _, { map } from "underscore";

const StatTable = ({ id, team }) => {
  const { stats } = useNewGameStore();
  const columnHelper = useMemo(() => createColumnHelper(), []);

  const columns = useMemo(
    () => [
      columnHelper.accessor((row) => row.number, {
        id: "number",
        header: ({column}) => <span className="font-bold">Number</span>,
        size: 100,
        cell: ({ getValue, column }) => (
          <span>{getValue()}</span>
        ),
      }),
      columnHelper.accessor((row) => `${row.lastname}, ${row.firstname}`, {
        id: "name",
        header: () => <span className="font-bold">Name</span>,
        cell: ({ getValue }) => <span className="">{getValue()}</span>,
      }),
    ],
    [columnHelper]
  );

  const { getHeaderGroups, getRowModel, getTotalSize, ...table } =
    useReactTable({
      columns: _.isEmpty(stats[team]) ? [] : columns,
      data: _.isEmpty(stats[team]) ? [] : stats[team],
      getCoreRowModel: getCoreRowModel(),
    });
  console.log("DATA FOR TABLE: ", stats[team]);
  console.log("Header Group: ", getHeaderGroups());
  _.isEmpty(stats[team])
    ? console.log("EMPTY")
    : console.log("ROWS: ", getRowModel());
  return (

    <section>
      <div>
        {
          getHeaderGroups().map( headerGroup => (
            <div key={headerGroup.id} className="block">
              {
                headerGroup.headers.map( header => (
                  <div key={header.id} className={`inline-block w-[${header.column.getSize()}]`}>
                    {
                      flexRender(header.column.columnDef.header, header.getContext())
                    }
                  </div>
                ))
              }
            </div>
          ))
        }
      </div>
      <div>
        {
          _.isEmpty(stats[team]) ? (
            <Card>No Players</Card>
          ) : (
            getRowModel().rows.map( row => (
              <div key={row.id} className="">
                {
                  row.getVisibleCells().map( cell => (
                    <div key={cell.id} className={`inline-block w-[${cell.column.getSize()}px]`}>
                      {
                        flexRender(cell.column.columnDef.cell, cell.getContext())
                      }
                    </div>
                  ))
                }
              </div>
            ))
          )
        }
      </div>
    </section>
    
  );
};

export default StatTable;
