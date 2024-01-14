"use client"
import React, { useState, useEffect } from "react";
import { auth } from "@/lib/firebase/firebase";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    auth.onAuthStateChanged(
      async (user) => {
        if (user) {
          setUser(user);
          if(pathname === "/admin") {
            router.push("/admin/dashboard");
          }
        } else {
          setUser(null);
          router.push("/admin");
        }
        setLoading(false);
      }  
    );
  },[]);

  return { user, loading };
}
