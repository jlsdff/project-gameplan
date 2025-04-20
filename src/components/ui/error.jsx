"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { useRouter } from "next/navigation"
import { Button } from "@heroui/react"

export default function ErrorPage({ error, ...props}) {

  const router = useRouter()
  
  const goBack = () => {
    router.back()
  }

  return (
    <main className="flex items-center justify-center w-full h-screen">
      <section className="p-8 flex flex-col items-center ">
        <h2 className="font-bold">Something went wrong!</h2>
        <Button onClick={goBack} className="mt-2" variant="light" color="primary" >Go back</Button>
      </section>
    </main>
  );
}
