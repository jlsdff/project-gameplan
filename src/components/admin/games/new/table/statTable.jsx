import React, { useCallback } from 'react';
import { Input, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';

const columns = [
  {
    key: 'actions',
    title: '',
  },
  {
    key: 'number',
    title: '#',
  },
  {
    key: 'name',
    title: 'Name',
  },
  {
    key: '2ptmd',
    title: '2pt Made',
  }, 
  {
    key: '2ptatt',
    title: '2pt Attempt',
  },
  {
    key: '3ptmd',
    title: '3pt Made',
  }, 
  {
    key: '3ptatt',
    title: '3pt Attempt',
  },
  {
    key: 'ftmd',
    title: 'FT Made',
  }, 
  {
    key: 'ftatt',
    title: 'FT Attempt',
  },
  {
    key: 'rebounds',
    title: 'Rebounds',
  },
  {
    key: 'assists',
    title: 'Assists',
  },
  {
    key: 'steal',
    title: 'Steal',
  },
  {
    key: 'block',
    title: 'Block',
  },
  {
    key: 'fouls',
    title: 'Fouls',
  },
  {
    key: "turnover",
    title: "Turnover"
  }
]

export default function StatTable({id, players}){

  const renderCell = useCallback((player, key) => {
    switch(key){
      case 'actions':
        return <div></div>
      case 'number':
        return <div>{player.number}</div>
      case 'name':
        return <div>{`${player.lastname}, ${player.firstname}`}</div>
      case '2ptmd':
        return <Input  />
      case '2ptatt':
        return <Input  />
      case '3ptmd':
        return <Input  />
      case '3ptatt':
        return <Input  />
      case 'ftmd':
        return <Input  />
      case 'ftatt':
        return <Input  />
      case 'rebounds':
        return <Input  />
      case 'assists':
        return <Input  />
      case 'steal':
        return <Input  />
      case 'block':
        return <Input />
      case 'fouls':
        return <Input  />
      case 'turnover':
        return <Input  />
      default:
        return <div></div>
    }
  }, [])

  const onCellActions = (key) => {
    console.log(key)
  }

  return (
    <Table aria-labelledby='stat-table' onCellAction={onCellActions}>
      <TableHeader columns={columns}>
        {
          column => (
            <TableColumn key={column.key} prop={column.key}>
              {column.title}
            </TableColumn>
          )
        }
      </TableHeader>
      <TableBody items={players} >

        {
          player => (
            <TableRow key={player.id} >
              {
                key => (
                  <TableCell >
                    {renderCell(player, key)}
                  </TableCell>
                )
              }
            </TableRow>
          )
          
        }

      </TableBody>
    </Table>
  )
}