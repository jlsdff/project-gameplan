"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import PlayersTable from "./playersTable";
import PlayerPage from "./playerPage";


export default function PlayersPage() {
  const params = useSearchParams();

  const name = params.get('name')
  const page = params.get('page')
  const id = params.get('id')

  if(id){
    return <PlayerPage id={id}/>
  }

  return (
    <>
      <PlayersTable page={page || 1} name={name} />
    </>
  );
}
