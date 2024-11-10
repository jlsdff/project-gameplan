import { object, reject } from "underscore";
import * as XLSX from "xlsx";

const validColumns = [
  "#",
  "Name",
  "2PM",
  "2PM",
  "3PM",
  "3PA",
  "FTM",
  "FTA",
  "REB",
  "AST",
  "STL",
  "BLK",
  "TO",
  "FLS",
  "PTS",
  "TEAM",
];

export const verifySheet = async () => {};

export const checkColumnValidity = (sheet, columnsFormat = null) => {
  const ws = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  const headers = ws[0];
  return new Promise((resolve, reject) => {
    const format = columnsFormat || validColumns;
    const missingColumns = format.filter((column) => !headers.includes(column));

    if (missingColumns.length > 0) {
      reject(missingColumns);
    } else {
      resolve(true);
    }
  });
};

export const checkTeamCompatability = async (rows, teams) => {
  const {
    teamA: { teamName: teamAName },
    teamB: { teamName: teamBName },
  } = teams;

  return new Promise((resolve, reject) => {
    const isValid = rows.every(
      (row) =>
        row.TEAM?.toLowerCase() === teamAName.toLowerCase() ||
        row.TEAM?.toLowerCase() === teamBName.toLowerCase()
    );

    if (!isValid) {
      reject("Teams in the sheet do not match the selected teams");
    } else {
      resolve(true);
    }
  });
};

export const checkLineUps = async (rows, teams) => {
  const { teamA, teamB, teamAPlayers, teamBPlayers } = teams;

  return new Promise((resolve, reject) => {
    
    const invalidPlayers = [];
    
    rows.forEach((row) => {

      const currentTeam = row.TEAM?.toLowerCase() === teamA.teamName.toLowerCase() ? teamA : teamB;
      const currentTeamPlayers = row.TEAM?.toLowerCase() === teamA.teamName.toLowerCase() ? teamAPlayers : teamBPlayers;

      const player = currentTeamPlayers.find( p => p.lastname?.toLowerCase() === row?.lastname?.toLowerCase())
      if (!player) {
        invalidPlayers.push({row, team: currentTeam});
      }
      
    });

    if (invalidPlayers.length > 0) {
      reject(invalidPlayers);
    } else {
      resolve(true);
    }
  });
};

export const mapSheetToStats = async () => {
  return new Promise((resolve, reject) => {
    const duplicates = [];
  });
};

export const fileToBuffer = async (file) => {
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);
  return new Promise((resolve, reject) => {
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
  });
};
