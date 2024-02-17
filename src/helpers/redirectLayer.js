"use client";
import { AdminContext } from "@/context/adminContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export function RedirectLayer({children, to}) {
  const user = useContext(AdminContext)
  const router = useRouter();

  useEffect(()=>{
    if(!user){
      router.push(to)
    }
  },[])

  return (
    <>
      {children}
    </>
  )

}
