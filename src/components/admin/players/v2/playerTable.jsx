import React, {useContext, useMemo} from "react"
import { Table, TableBody, TableColumn, TableHeader, TableRow, TableCell, getKeyValue } from "@nextui-org/react"
import { PlayersContext } from "./playersProvider"

export default function AdminPlayersTable(){

  const playerContext = useContext(PlayersContext)

  const players = useMemo(() => {
    return playerContext.players.map( doc => ({id: doc.id, ...doc.data(), actions: "actions"}))
  }, [playerContext.players])

  
  const columns = [
    {
      key: "lastname",
      label: "Last Name"
    },
    {
      key: "firstname",
      label: "First Name"
    },
    {
      key: "actions",
      label: "Actions"
    },
  ]
  
  
  return (
    <section className="mt-4">
        <Table
          aria-label="Players Table"
        >
          <TableHeader 
            columns={columns}
          >
            { column => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody items={players || []}>
            {
              item => (
                <TableRow key={item.key}>
                  { key => <TableCell key={key}>{getKeyValue(item, key)}</TableCell>}
                </TableRow>
              )
            }
          </TableBody>
        </Table>
    </section>
  )
}