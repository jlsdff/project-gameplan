"use client";
import React, { useState, useEffect } from "react";
import { AdminContext } from "@/context/adminContext";
import { auth } from "@/lib/firebase/firebase";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import {Spinner} from "@nextui-org/react";

export default function AdminProvider({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
         <Spinner label="Please Wait..." color="primary" labelColor="primary" size="lg" />
      </div>
    );
  }
  console.log(user)
  return <AdminContext.Provider value={user}>{children}</AdminContext.Provider>;
}
