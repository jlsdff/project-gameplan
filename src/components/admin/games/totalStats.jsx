'use client'
import React, { useCallback, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";

export default function TotalStats({ stats, name }) {

  const columns = [
    {
      key: 'name',
      label: name
    },
    {
      key: 'pts',
      label: 'PTS'
    },
    {
      key: 'ast',
      label: 'AST'
    },
    {
      key: 'reb',
      label: 'REB'
    },
    {
      key: 'stl',
      label: 'STL'
    },
    {
      key: 'blk',
      label: 'BLK'
      },
    {
      key: 'to',
      label: 'TO'
    },
    {
      key: 'fls',
      label: 'fouls'
    },
    {
      key: 'fg',
      label: 'FG'
    },
    {
      key: '2pt',
      label: '2PT'
    },
    {
      key: '3pt',
      label: '3PT'
    },
    {
      key: 'ft',
      label: 'FT'
    }
  ]

  const getPts = stats.reduce((acc, stat) => acc + (stat.twoPointsMade * 2) + (stat.threePointsMade * 3) + stat.freeThrowsMade, 0)
  const getAst = stats.reduce((acc, stat) => acc + stat.assists, 0)
  const getReb = stats.reduce((acc, stat) => acc + stat.rebounds, 0)
  const getStl = stats.reduce((acc, stat) => acc + stat.steals, 0)
  const getBlk = stats.reduce((acc, stat) => acc + stat.blocks, 0)
  const getTo = stats.reduce((acc, stat) => acc + stat.turnovers, 0)
  const getFls = stats.reduce((acc, stat) => acc + stat.fouls, 0)
  const getFg = useMemo(() => {
    const made = stats.reduce((acc, stat) => acc + stat.twoPointsMade + stat.threePointsMade, 0)
    const attempts = stats.reduce((acc, stat) => acc + stat.twoPointsAttempted + stat.threePointsAttempted, 0)
    const percentage = (((made / attempts) * 100) || 0).toFixed(2);
    return {made, attempts, percentage}
  }, [stats])
  const get2pt = useMemo(() => {
    const made = stats.reduce((acc, stat) => acc + stat.twoPointsMade, 0)
    const attempts = stats.reduce((acc, stat) => acc + stat.twoPointsAttempted, 0)
    const percentage = (((made / attempts) * 100) || 0).toFixed(2);
    return {made, attempts, percentage}
  }, [stats])
  const get3pt = useMemo(() => {
    const made = stats.reduce((acc, stat) => acc + stat.threePointsMade, 0)
    const attempts = stats.reduce((acc, stat) => acc + stat.threePointsAttempted, 0)
    const percentage = (((made / attempts) * 100) || 0).toFixed(2);
    return {made, attempts, percentage}
  }, [stats])  
  const getFt = useMemo(()=> {
    const made = stats.reduce((acc, stat) => acc + stat.freeThrowsMade, 0)
    const attempts = stats.reduce((acc, stat) => acc + stat.freeThrowsAttempted, 0)
    const percentage = (((made / attempts) * 100) || 0).toFixed(2);
    return {made, attempts, percentage}
  }, [stats])
  
  return (<>
  <Table>
    <TableHeader columns={columns}>
      {
        col => (<TableColumn key={col.key}>{col.label}</TableColumn>)
      }
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>{name}</TableCell>
        <TableCell>{getPts}</TableCell>
        <TableCell>{getAst}</TableCell>
        <TableCell>{getReb}</TableCell>
        <TableCell>{getStl}</TableCell>
        <TableCell>{getBlk}</TableCell>
        <TableCell>{getTo}</TableCell>
        <TableCell>{getFls}</TableCell>
        <TableCell>{`${getFg.made} / ${getFg.attempts}`} <br /> <span className="font-bold">{getFg.percentage}</span></TableCell>
        <TableCell>{`${get2pt.made} / ${get2pt.attempts}`} <br /> <span className="font-bold">{get2pt.percentage}</span></TableCell>
        <TableCell>{`${get3pt.made} / ${get3pt.attempts}`} <br /> <span className="font-bold">{get3pt.percentage}</span></TableCell>
        <TableCell>{`${getFt.made} / ${getFt.attempts}`} <br /> <span className="font-bold">{getFt.percentage}</span></TableCell>
      </TableRow>
    </TableBody>
  </Table>
  </>)
}
