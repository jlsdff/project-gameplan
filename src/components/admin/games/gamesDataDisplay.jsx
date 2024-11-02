"use client";
import React, { lazy, useState } from "react";
import { Input, Select, SelectItem, Button, ButtonGroup, Dropdown } from "@nextui-org/react";
import { filterOptions } from "./selectOptions";
import AddIcon from "@/assets/addIcon";
import { useRouter } from "next/navigation";
import ReformatButton from "./reformatButton";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

const Games = lazy(() => import("./display/gamesTable"))



export default function GamesDataDisplay() {
  
  const router = useRouter();

  return (
      <section>
        <QueryClientProvider client={client}>
          <Games />
        </QueryClientProvider>
      </section>
  );
}
