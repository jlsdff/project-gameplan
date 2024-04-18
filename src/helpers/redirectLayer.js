"use client";
import { AdminContext } from "@/context/adminContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export function RedirectLayer({ children, to }) {
  const router = useRouter();

  useEffect(() => {
    if(!window.localStorage.getItem("user")) {
      router.push(to);
    }
  }, []);

  return <>{children}</>;
}
