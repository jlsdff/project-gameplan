import React from 'react'
import NewTeam from '@/components/admin/teams/new/newTeam'

export default async function EditPage(props) {
  const params = await props.params;
  return (
    <NewTeam {...params} />
  )
}
