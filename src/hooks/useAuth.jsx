"use client"
import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase/firebase";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // const handleAuthStateChanged = async (user) => {
    //   if (user) {
    //     setUser(user);
    //     if (pathname === "/admin") {
    //       router.push("/admin/dashboard");
    //     }
    //   } else {
    //     setUser(null);
    //     router.push("/admin");
    //   }
    //   setLoading(false);
    // };

    // const unsubscribe = auth.onAuthStateChanged(handleAuthStateChanged);

    // return () => {
    //   unsubscribe();
    // };

    const user = auth.currentUser;

    if (user) {
      setUser(user);
      console.log(user)
      if (pathname === "/admin") {
        router.push("/admin/dashboard");
      }
    } else {
      setUser(null);
      router.push("/admin");
    }
    setLoading(false);
    
  }, []);

  return { user, loading };
}