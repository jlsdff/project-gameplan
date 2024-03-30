import React from 'react'
import NewTeam from '@/components/admin/teams/new/newTeam'

export default function EditPage({params}) {
  return (
    <NewTeam {...params} />
  )
}
