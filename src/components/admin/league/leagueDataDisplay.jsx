"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Select,
  SelectItem,
  User,
  Chip,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  Pagination,
  Button,
  Tooltip,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import DataDisplay from "../dataDisplay/dataDisplay";
import { leagueColumns } from "@/helpers/leagues/columns";
import {
  getLeaguesByPage,
  getAllLeagues,
  getLeagueSize,
  setLeagueStatus,
  deleteLeague,
} from "@/utils/leagueAPI";
import EditIcon from "@/assets/editIcon";
import DeleteIcon from "@/assets/deleteIcon";
import CheckIcon from "@/assets/checkIcon";

const totalRowsChoices = [
  { value: 10, label: "10" },
  { value: 20, label: "20" },
  { value: 50, label: "50" },
  { value: 100, label: "100" },
];

export default function LeagueDataDisplay({ searchedLeagues }) {
  const [limitPerPage, setLimitPerPage] = useState(["10"]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [isFetchingData, setIsFetchingData] = useState(true);
  const [lastSnapshots, setLastSnapshots] = useState({});

  const [rows, setRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const router = useRouter();

  const handleLimitPerPageChange = useCallback((e) => {
    const value = e.target.value;
    if (value == limitPerPage[0]) return;
    setLimitPerPage([value]);
  }, [limitPerPage]);

  const handleEditRow = useCallback(async (id) => {
    router.push(`/admin/dashboard/leagues/new?id=${id}`);
  },[router]);

  const handleDeleteRow = useCallback(async (id) => {
    deleteLeague(id)
      .then(() => {
        fetchLeagues();
      })
      .catch((error) => {
        console.error(error);
      });
  },[]);

  const renderCell = useCallback((item, key) => {
    switch (key) {
      case "league":
        return (
          <User
            name={item.title}
            description={item.startDate}
            avatarProps={{
              src: item.leagueImage,
              alt: item.title,
              name: item.title,
              showFallback: true,
            }}
          />
        );
      case "venue":
        return <div>{item.venue}</div>;
      case "status":
        const dateToday = new Date();
        const startDate = new Date(item.startDate);

        if (item.status === "Finished") {
          return (
            <div>
              <Chip color="success" variant="solid" radius="full">
                Finished
              </Chip>
            </div>
          );
        } else if (dateToday < startDate) {
          return (
            <div>
              <Chip color="warning" variant="solid" radius="full">
                Upcoming
              </Chip>
            </div>
          );
        }
        return (
          <Tooltip content="Mark as Finished">
            <Chip
              className="cursor-pointer"
              color="success"
              variant="solid"
              radius="full"
              endContent={<CheckIcon />}
              onClick={() => {
                setLeagueStatus(item.id, "Finished")
                  .then(() => {
                    fetchLeagues();
                  })
                  .catch((error) => {
                    console.error(error);
                  });
              }}
            >
              Ongoing
            </Chip>
          </Tooltip>
        );
      case "actions":
        return (
          <div className="flex items-center justify-start gap-2">
            <Button
              onClick={() => handleEditRow(item.id)}
              isIconOnly
              color="primary"
              variant="ghost"
              size="sm"
              radius="sm"
            >
              <EditIcon />
            </Button>
            <Button
              onClick={() => handleDeleteRow(item.id)}
              isIconOnly
              color="danger"
              variant="ghost"
              size="sm"
              radius="sm"
            >
              <DeleteIcon />
            </Button>
          </div>
        );
    }
  }, [ handleEditRow, handleDeleteRow]);

  const fetchLeagues = useCallback(async () => {
    setIsFetchingData(true);

    const limit = Number.parseInt(limitPerPage[0]);
    const current = currentPage;
    const totalLeagues = await getLeagueSize();
    setTotalPage(Math.ceil(totalLeagues / limit));

    const snapshot = await getLeaguesByPage(
      current,
      limit,
      lastSnapshots[currentPage - 1]
    );
    const data = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    setLastSnapshots((prev) => ({
      ...prev,
      [currentPage]: snapshot.docs[snapshot.docs.length - 1] || null,
    }));

    setRows(data);
    setIsFetchingData(false);
  }, [limitPerPage, currentPage, lastSnapshots]);

  useEffect(() => {
    
    if (searchedLeagues.length > 0) {
      setRows(searchedLeagues);
      setTotalPage(1);
      setIsFetchingData(false);
      return;
    }
    fetchLeagues();    
  }, [limitPerPage, currentPage, searchedLeagues]);

  return (
    <>
      <div>
        <Select
          items={totalRowsChoices}
          label="Rows"
          placeholder="Rows per page"
          labelPlacement="outside-left"
          selectedKeys={limitPerPage}
          onChange={handleLimitPerPageChange}
          className="flex items-center justify-center max-w-xs"
        >
          {(dataRow) => (
            <SelectItem key={dataRow.value} value={dataRow.value}>
              {dataRow.label}
            </SelectItem>
          )}
        </Select>
      </div>

      {/* DATA DISPLAY */}
      <Table className="mt-4" aria-label="League Data Display">
        <TableHeader columns={leagueColumns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={rows}
          isLoading={isFetchingData}
          loadingContent={<Spinner label="Fetching Data..." />}
        >
          {(item) => (
            <TableRow key={item.id}>
              {leagueColumns.map((column) => (
                <TableCell key={column.key}>
                  {renderCell(item, column.key)}
                </TableCell>
              ))}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}

      <div className="flex items-center justify-center mt-4">
        <Pagination
          loop
          showControls
          color="primary"
          total={totalPage}
          page={currentPage}
          onChange={setCurrentPage}
        />
      </div>
    </>
  );
}
