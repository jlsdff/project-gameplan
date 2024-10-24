import React, { useCallback, useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import PlayerAPI from "@/utils/v2/playerAPI";
import XIcon from "@/assets/xIcon";
import { motion } from "framer-motion";
import * as XLSX from "xlsx";
import { nanoid } from "nanoid";

export default function ImportBody() {
  const [file, setFile] = useState(null);
  const [workbook, setWorkbook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState([]);
  const [errors, setErrors] = useState([]);

  const handleChange = async (file) => {
    try {
      setLoading(true);
      setFile(file);
      const res = await PlayerAPI.verifySheet(file)
        .then((result) => {
          console.log(result.message);
          setWorkbook(result.wb);
        })
        .catch((error) => {
          console.error(error.message);
          setErrors((prev) => [...prev, error.message]);
        });
    } catch (error) {
      console.error("Error verifying sheet", error);
      setErrors((prev) => [
        ...prev,
        "An error occured while verifying the sheet. Please try again.",
      ]);
    } finally {
      setLoading(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    setWorkbook(null);
  };

  const uploadPlayers = useCallback(async () => {
    try {
      setLoading(true);
      const sheetData = XLSX.utils
        .sheet_to_json(workbook.Sheets["Players"])

      const errors = await PlayerAPI.importPlayers(sheetData);

      if (errors.length) {
        setErrors(prev => [...prev, ...errors]);
      } else {
        setErrors([])
        setFile(null)
        setWorkbook(null)
        setStatus(prev => [...prev, "Players uploaded successfully"])
      }

    } catch (error) {
      console.error("Error uploading players", error);
      setErrors((prev) => [
        ...prev,
        "An error occured while uploading players. Please try again.",
      ]);
    } finally {
      setLoading(false);
    }
  }, [workbook]);

  return (
    <>
      <div className="mb-4 space-y-2">
        {
          status && (
            status.map((stat, index) => (
              <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              key={index}
              className="p-2 text-green-500 bg-red-100 rounded-md"
              >
                {stat}
              </motion.div>
            ))
          )
        }
        {errors &&
          errors.map((err, index) => (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              key={index}
              className="p-2 text-red-500 bg-red-100 rounded-md"
            >
              {err}
            </motion.div>
          ))}
      </div>
      <div className="flex items-center justify-between mb-4">
        <UploadFile
          handleChange={handleChange}
          file={file}
          removeFile={removeFile}
        />
        {workbook && (
          <div>
            <Button onPress={uploadPlayers} isLoading={loading} variant="solid">
              Upload Players
            </Button>
          </div>
        )}
        <Button onPress={PlayerAPI.downloadTemplate} variant="light">
          Download Template
        </Button>
      </div>

      {workbook && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SheetToTable wb={workbook} />
        </motion.div>
      )}
    </>
  );
}

function UploadFile({ handleChange, file, removeFile }) {
  const fileTypes = ["xlsx"];
  return (
    <FileUploader
      handleChange={handleChange}
      name="EXCEL FILE"
      types={fileTypes}
    >
      <div className={`p-2.5 border-2 border-dashed rounded-md border-primary`}>
        {file ? (
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              <span className="font-semibold">{file.name}</span>
            </p>
            <Button isIconOnly onClick={removeFile} size="sm" radius="full">
              {" "}
              <XIcon size={16} />{" "}
            </Button>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Drag and drop</span> your excel
              file here
            </p>
            <p className="text-sm text-gray-500">or choose file</p>
          </>
        )}
      </div>
    </FileUploader>
  );
}

function SheetToHTML({ wb }) {
  const [__html, setHTML] = useState(null);

  useEffect(() => {
    const table = XLSX.utils.sheet_to_html(
      wb.Sheets["Players"] || wb.Sheets["players"],
      { editable: true }
    );
    const customCSS = `
    <style>
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
        }
        th {
          background-color: #f4f4f4;
          text-align: left;
        }
        tr:nth-child(even) {
          background-color: #f9f9f9;
        }
      </style>`;
    setHTML(`${customCSS}${table}`);
  }, [wb]);

  return (
    <>
      {__html && (
        <div
          className="p-4 overflow-auto"
          dangerouslySetInnerHTML={{ __html }}
        />
      )}
    </>
  );
}

function SheetToTable({ wb }) {
  const columns = [
    { key: "number", title: "Jersey Number" },
    { key: "firstname", title: "First Name" },
    { key: "lastname", title: "Last Name" },
    { key: "showFullName", title: "isFullNameVisible" },
  ];

  const data = XLSX.utils.sheet_to_json(wb.Sheets["Players"]);

  const renderCell = useCallback((item, key) => {
    switch (key) {
      case "number":
        return <div>{item.number}</div>;
      case "firstname":
        return <div>{item.firstname}</div>;
      case "lastname":
        return <div>{item.lastname}</div>;
      case "showFullName":
        const showFullName = +item.showFullName === 1 ? true : false;
        return (
          <div
            className={`${showFullName ? "text-green-300" : "text-red-300"}`}
          >
            {showFullName ? "Yes" : "No"}
          </div>
        );
      default:
        return <div>null</div>;
    }
  }, []);

  return (
    <Table>
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.title}</TableColumn>}
      </TableHeader>
      <TableBody items={data}>
        {(item) => (
          <TableRow key={nanoid()}>
            {(key) => <TableCell>{renderCell(item, key)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
