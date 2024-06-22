"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({ error, reset }) {

  return (
    <main className="flex items-center justify-center w-full h-screen">
      <section className="p-8">
        <h2 className="font-bold">Something went wrong!</h2>
      </section>
    </main>
  );
}
