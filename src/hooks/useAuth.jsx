"use client";
import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase/firebase";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleAuthStateChanged = async (user) => {
      if (user) {
        setUser(user);
        window.localStorage.setItem("user", JSON.stringify(user));
      }
    };

    const unsubscribe = auth.onAuthStateChanged(handleAuthStateChanged);
    setLoading(false);

    return () => {
      unsubscribe();
    };
  }, []);

  return { user, loading };
}
