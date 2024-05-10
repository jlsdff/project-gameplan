"use client";
import React from "react";
import { Pagination } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function PaginationUI({ totalPage, currentPage, url }) {
  const router = useRouter();

  return (
    <Pagination
      total={Math.ceil(totalPage / 5)}
      initialPage={currentPage}
      onChange={(value) => router.push(`${url}${value}`)}
      color="primary"
    />
  );
}
