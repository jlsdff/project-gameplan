import React from 'react'

export default function Page({params}) {

  const {id}  = params;
  
  return (
    <div>
      <h1>{id}</h1>
    </div>
  )
}
