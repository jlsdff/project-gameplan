import React, {useContext, useMemo} from "react"
import { Table, Pagination} from "@nextui-org/react"
import { PlayersContext } from "./playersProvider"

export default function AdminPlayersTable(){

  const playerContext = useContext(PlayersContext)

  if(playerContext.players.length === 0 || !playerContext.players) {
    return <div> Loading... </div>
  } else {
    // console.log(playerContext.players.docs.map(doc => doc.data()))
  }

  
  const columns = [
    {
      key: "firstname",
      label: "First Name"
    },
    {
      key: "lastname",
      label: "Last Name"
    },
    {
      key: "actions",
      label: "Actions"
    },
  ]
  
  
  return (
    <section className="mt-4">
      <div>
        {
          playerContext.players && 
          playerContext.players.map(doc => <p key={doc.id}>{doc.data().lastname}</p>)
        }
      </div>
    </section>
  )
}