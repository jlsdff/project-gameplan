"use client"
import React from "react";
import { AdminContext } from "@/context/adminContext";
import { useAuth } from "@/hooks/useAuth";
import {Spinner} from "@nextui-org/react";

export default function AdminProvider({ children }) {
  
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
         <Spinner label="Please Wait..." color="primary" labelColor="primary" size="lg" />
      </div>
    );
  }
  return <AdminContext.Provider value={user}>{children}</AdminContext.Provider>;
}
