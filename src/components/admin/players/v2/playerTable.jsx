import React, {useCallback, useContext, useMemo} from "react"
import { Table, TableBody, TableColumn, TableHeader, TableRow, TableCell, getKeyValue, User, Button } from "@nextui-org/react"
import { PlayersContext } from "./playersProvider"
import PlayerAPI from "@/utils/v2/playerAPI"
import { PlayerModalContext } from "./playerModalProvider"
import EditIcon from "@/assets/editIcon"
import DeleteIcon from "@/assets/deleteIcon"

export default function AdminPlayersTable(){

  const playerContext = useContext(PlayersContext)
  const modalContext = useContext(PlayerModalContext)

  const players = useMemo(() => {
    return playerContext.players.map( doc => ({id: doc.id, ...doc.data(), actions: "actions"}))
  }, [playerContext.players])

  
  const columns = [
    {
      key: "player",
      label: "Player"
    },
    {
      key: "actions",
      label: "Actions"
    },
  ]

  const editPlayer = useCallback((player) => {
    modalContext.setType("Edit Player")
    modalContext.dispatchPlayer({type: "set", value: player})
    modalContext.onOpen()
  }, [modalContext])

  const deletePlayer = useCallback( player => {
    modalContext.setType("Delete Player")
    modalContext.dispatchPlayer({type: "set", value: player})
    modalContext.onOpen()
  }, [modalContext])
  
  const renderCell = useCallback((item, key) => {
    switch(key) {

      case "player":
        return (
          <User 
            name={PlayerAPI.displayName(item, true)}
            avatarProps={{
              src: item.imageUrl || ""
            }}
          />
        )
      case "actions": 
        return (
          <div className="space-x-4">
            <Button isIconOnly onPress={() => editPlayer(item)}><EditIcon/></Button>
            <Button isIconOnly onPress={() => deletePlayer(item)}><DeleteIcon/></Button>
          </div>
        )
      default:
        return getKeyValue(item, key)
    }
  }
  , [])

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
                <TableRow key={item.id}>
                  { key => <TableCell key={key}>{renderCell(item, key)}</TableCell>}
                </TableRow>
              )
            }
          </TableBody>
        </Table>
    </section>
  )
}