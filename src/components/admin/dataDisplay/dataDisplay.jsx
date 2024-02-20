"use client";
import React, { useState } from "react";
import { Input, Divider, Button, Pagination } from "@nextui-org/react";
import CustomTable from "../../ui/table/table";

export default function DataDisplay({ data, pagination, columns, topToolBar }) {
  const [isLoading, setIsLoading] = useState(true);
  // const [totalData, setTotalData] = useState(totalPage);

  const { totalPage, currentPage, setCurrentPage, initialPage } = pagination;

  return (
    <section className="">
      {topToolBar && (
        topToolBar
      )}
      <Divider orientation="horizontal" className="my-4" />
      <div>
        {/* <CustomTable columns={columns} data={data} isLoading={isLoading} /> */}
      </div>
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
