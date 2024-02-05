"use client"
import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase/firebase";
import { useRouter } from "next/router"; // Corrected import
import { usePathname } from "next/router"; // Corrected import

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
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

    // Clean up function
    return () => unsubscribe();
  }, [router, pathname]); // Added dependencies
}