"use client";
import React, { useState } from "react";
import { Input, Divider, Button, Pagination } from "@nextui-org/react";
import CustomTable from "../../ui/table/table";
import DeleteIcon from "@/assets/deleteIcon";
import SearchIcon from "@/assets/searchIcon";

const columns = [
  {
    title: "Last Name",
    dataIndex: "lastname",
    key: "lastname",
  },
  {
    title: "First Name",
    dataIndex: "firstname",
    key: "firstname",
  },
  {
    title: "Middle Name",
    dataIndex: "middlename",
    key: "middlename",
  },
  {
    title: "Birth Place",
    dataIndex: "birthplace",
    key: "birthplace",
  },
  {
    title: "Position",
    dataIndex: "position",
    key: "position",
  },
  {
    title: "Action",
    key: "action",
  },
];

const data = [
  {
    key: "1",
    lastname: "John",
    firstname: "Brown",
    middlename: "Doe",
    birthplace: "Manila",
    position: "SF",
  },
  {
    key: "2",
    lastname: "Peter",
    firstname: "Parker",
    middlename: "Doe",
    birthplace: "New York",
    position: "PG",
  },
  {
    key: "3",
    lastname: "John",
    firstname: "Brown",
    middlename: "Doe",
    birthplace: "New York",
    position: "C",
  }
];

export default function DataDisplay({ data, total}) {

  const [nameSearch, setNameSearch] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalData, setTotalData] = useState(total);

  return (
    <section className="">
      <div className="flex w-full space-x-2">
        <div className="flex w-full gap-2 justify-center items-center">
          <Input
            className="w-full"
            variant="flat"
            label="Search by name"
            onValueChange={setNameSearch}
          />
          <Button
            isIconOnly
            color="primary"
            aria-label="search"
            isDisabled={nameSearch.length > 0 ? false : true}
          >
            <SearchIcon />
          </Button>
        </div>
        <Divider orientation="vertical" className="mx-4" />
        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center">
            <Button
              isIconOnly
              color="secondary"
              aria-label="delete"
              isDisabled={selectedRowKeys.length > 0 ? false : true}
            >
              <DeleteIcon />
            </Button>
          </div>
        </div>
      </div>
      <Divider orientation="horizontal" className="my-4" />
      <div>
        <CustomTable columns={columns} data={data} isLoading={isLoading} />
      </div>
      <div className="flex justify-center">
        <Pagination total={totalData} initialPage={1} color="primary" />
      </div>
    </section>
  );
}
