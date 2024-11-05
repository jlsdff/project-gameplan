import React, { useMemo, useState } from 'react';
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';

const StatTable = ({ id, stats, team}) => {

  const columns = useMemo(() => [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "#",
      accessorKey: "number",
    },
    {
      header: "Name",
      accessorKey: "fullname",
    },
    {
      header: "2 PTS MADE",
      accessorKey: "twoPointsMade",
    },
    {
      header: "2 PTS ATT",
      accessorKey: "twoPointsAttempted",
    },
    {
      header: "3 PTS MADE",
      accessorKey: "threePointsMade",
    },
    {
      header: "3 PTS ATT",
      accessorKey: "threePointsAttempted",
    },
    {
      header: "FT MADE",
      accessorKey: "freeThrowsMade",
    },
    {
      header: 'rebounds',
      accessorKey: 'rebounds'
    },
    {
      header: 'assists',
      accessorKey: 'assists'
    },
    {
      header: 'steals',
      accessorKey: 'steals'
    },
    {
      header: 'blocks',
      accessorKey: 'blocks'
    },
    {
      header: 'turnovers',
      accessorKey: 'turnovers'
    },
    {
      header: 'fouls',
      accessorKey: 'fouls'
    }
  ], [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useReactTable({
    columns,
    data: stats[team],
    rowModel: getCoreRowModel(),
  })
  return (
    <table {...getTableProps()} className="w-full">
    </table>
  )
}

export default StatTable;