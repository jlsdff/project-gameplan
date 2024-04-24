"use client";
import React, { useState } from "react";
import { Input, Select, SelectItem, Button } from "@nextui-org/react";
import { filterOptions } from "./selectOptions";
import AddIcon from "@/assets/addIcon";
import { useRouter } from "next/navigation";

export default function GamesDataDisplay() {
  
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState(new Set(["All"]));

  return (
    <>
      <h1 className="text-xl md:text-2xl">Recent Games</h1>
      <div className="flex items-center justify-start gap-2">
        <Button variant="solid" color="primary" isIconOnly size="sm" onPress={()=>{
          router.push("/admin/dashboard/games/new")
        }}>
          <AddIcon />
        </Button>
        <Select
          label="Filter Games"
          size="sm"
          variant="bordered"
          selectedKeys={selectedFilter}
          onSelectionChange={setSelectedFilter}
          className="max-w-xs"
        >
          {filterOptions.map((filter) => (
            <SelectItem key={filter.value} value={filter.value}>
              {filter.label}
            </SelectItem>
          ))}
        </Select>
      </div>
    </>
  );
}
