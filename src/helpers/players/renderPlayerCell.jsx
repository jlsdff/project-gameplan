import { User } from "@nextui-org/react";
import { Suspense } from "react";

export default function renderPlayerCell(player, key, toTeam) {
  switch (key) {
    case "number":
      return <span>{player.number}</span>;
    case "player":
      let firstname = player.firstname ? player.firstname.split(" ") : null;

      if (firstname) {
        firstname = firstname
          .map((name) => name.charAt(0).toUpperCase())
          .join(" ");
      }

      return (
        <div className="w-full">
          <User
            className=" min-w-3.5"
            name={
              player.firstname
                ? `${player.lastname}, ${firstname}`
                : player.lastname
            }
            description={player?.positions?.join(" | ") || ""} 
            avatar={{
              src: player.avatar || null,
              showFallback: true,
              name: `${player.lastname}`,
            }}
          />
        </div>
      );
    case "PPG":
      const records = player.gameRecords;
      if (records.length === 0) return <span>0</span>;
      const ppg = records.reduce((acc, record) => {
        return (
          acc +
          (record.twoPointsMade * 2 +
            record.threePointsMade * 3 +
            record.freeThrowsMade)
        );
      }, 0);
      return (
        <span className="max-w-fit">
          {(ppg / records.length).toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          }) || 0}
        </span>
      );
    case "APG":
      if (player.gameRecords.length === 0) return <span>0</span>;
      const apg = player.gameRecords.reduce((acc, curr) => {
        return acc + curr.assists;
      }, 0);
      return (
        <span className="max-w-fit">
          {(apg / player.gameRecords.length).toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })}
        </span>
      );
    case "RPG":
      if (player.gameRecords.length === 0) return <span>0</span>;
      const rpg = player.gameRecords.reduce((acc, curr) => {
        return acc + curr.rebounds;
      }, 0);
      return (
        <span className="max-w-fit">
          {(rpg / player.gameRecords.length).toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })}
        </span>
      );
    case "SPG":
      if (player.gameRecords.length === 0) return <span>0</span>;

      const spg = player.gameRecords.reduce((acc, curr) => {
        return acc + curr.steals;
      }, 0);

      return (
        <span className="max-w-fit">
          {(spg / player.gameRecords.length).toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })}
        </span>
      );
    case "BPG":
      if (player.gameRecords.length === 0) return <span>0</span>;
      const bpg = player.gameRecords.reduce((acc, curr) => {
        return acc + curr.blocks;
      }, 0);
      return (
        <span className="max-w-fit">
          {(bpg / player.gameRecords.length).toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })}
        </span>
      );
    case "FG%":
      if (player.gameRecords.length === 0) return <span>0</span>;
      const fg = player.gameRecords.reduce((acc, curr) => {
        return acc + curr.twoPointsMade + curr.threePointsMade;
      }, 0);
      const fga = player.gameRecords.reduce((acc, curr) => {
        return acc + curr.twoPointsAttempted + curr.threePointsAttempted;
      }, 0);
      return (
        <span className="max-w-fit">
          {((fg / fga) * 100).toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          }) + "%"}
        </span>
      );
    case "currentTeam":
      return <span>{}</span>;
    case "LPT":
      if (!player.lastTeam) return <span>None</span>;
      return (
        <div className="">
          <User
            name={player.lastTeam.teamName}
            className="hover:cursor-pointer hover:underline"
            avatarProps={{ src: player.lastTeam.teamLogo }}
            onClick={(e) => {
              e.stopPropagation();
              toTeam(player.lastTeam.id);
            }}
          />
        </div>
      );
  }
}
