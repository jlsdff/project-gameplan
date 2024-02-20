"use client";
import React, { useState } from "react";
import { Input, Divider, Button, Pagination } from "@nextui-org/react";
import CustomTable from "../../ui/table/table";
import DeleteIcon from "@/assets/deleteIcon";
import SearchIcon from "@/assets/searchIcon";
import DataDisplay from "../dataDisplay/dataDisplay";
import ToolbarDataDisplay from "../dataDisplay/toolbarDataDisplay";
import AddIcon from "@/assets/addIcon";

export default function DataDisplayPlayer() {
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const [nameSearch, setNameSearch] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  return (
    <section>
      <DataDisplay
        pagination={{
          totalPage: totalPage,
          currentPage: currentPage,
          setCurrentPage: setCurrentPage,
          initialPage: 1,
        }}
        topToolBar={
          <ToolbarDataDisplay
            searchComponent={{
              label: "Search by name",
              value: nameSearch,
              onChange: (value) => setNameSearch(value),
              onSearch: () => console.log("searching"),
              isIconOnly: true,
              icon: <SearchIcon />,
              isDisabled: nameSearch.length > 0 ? false : true,
            }}
            toolBars={[
              {
                isIconOnly: true,
                ariaLabel: "delete player",
                onClick: () => console.log("deleting"),
                icon: <DeleteIcon />,
                isDisabled: selectedRowKeys.length > 0 ? false : true,
                size: "sm",
                variant: "light",
                toolTip: "Delete selected players",
              },
              {
                isIconOnly: true,
                ariaLabel: "add player",
                onClick: () => console.log("adding"),
                icon: <AddIcon />,
                isDisabled: false,
                size: "sm",
                variant: "light",
                toolTip: "Add new player",
              },
            ]}
          />
        }
      />
    </section>
  );
}
