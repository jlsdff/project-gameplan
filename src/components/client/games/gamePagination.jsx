"use client";
import { Pagination } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function GamePagination({ total, initialPage }) {
  const router = useRouter();
  const [page, setPage] = useState(initialPage);

  const handlePageChange = (value) => {
    router.push(`/games?page=${value}`);
  };

  return (
    <>
      <Pagination
        color="primary"
        total={total}
        initialPage={page}
        showControls
        isCompact
        onChange={(value) => {
          setPage(value);
          handlePageChange(value);
        }}
      />
    </>
  );
}
