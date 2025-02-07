"use client";
import React, { useState } from "react";
import { Input, Divider, Button, Pagination } from "@heroui/react";
import CustomTable from "../../ui/table/table";

export default function DataDisplay({
  pagination,
  topToolBar,
  dataContents,
  isLoading
}) {

  const { totalPage, currentPage, setCurrentPage, initialPage } = pagination;

  const {
    columns,
    rows,
    isSelectable,
    renderCell
  } = dataContents;

  return (
    <section className="">
      {topToolBar && topToolBar}
      <Divider orientation="horizontal" className="my-4" />
      {
        isLoading ? (
          <div className="flex justify-center">
            <p>Loading...</p>
          </div>
        ) : (
          <CustomTable
            columns={columns}
            rows={rows}
            isSelectable={isSelectable}
            renderCell={renderCell}
          />
        )
      }
      <Divider orientation="horizontal" className="my-4" />
      <div className="flex justify-center">
        <Pagination
          total={totalPage}
          initialPage={1}
          page={currentPage}
          onChange={setCurrentPage}
          color="primary"
        />
      </div>
    </section>
  );
}
