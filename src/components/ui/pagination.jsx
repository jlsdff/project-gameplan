"use client";
import React from "react";
import { Pagination } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function PaginationUI({ totalPage, currentPage, url }) {
  const router = useRouter();
  const total = Math.ceil(totalPage / 5);

  return (
    <Pagination
      total={total}
      initialPage={parseInt(currentPage, 10)}
      isCompact
      onChange={(value) => router.push(`${url}${value}`)}
      showControls
      color="primary"
    />
  );
}
