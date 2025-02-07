"use client";
import React from "react";
import { Pagination } from "@heroui/react";
import { useRouter } from "next/navigation";

export default function PaginationUI({ totalPage, currentPage, url }) {
  const router = useRouter();
  const total = Math.ceil(totalPage / 10);

  return (
    <Pagination
      total={total}
      initialPage={parseInt(currentPage, 5)}
      isCompact
      onChange={(value) => router.push(`${url}${value}`)}
      showControls
      color="primary"
    />
  );
}
