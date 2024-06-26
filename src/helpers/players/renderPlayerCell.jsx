import { User } from "@nextui-org/react";

export default function renderPlayerCell(player, key) {
  switch (key) {
    case "number":
      return <span>{player.number}</span>;
    case "player":
      return (
        <User
          className=" min-w-3.5"
          name={player.firstname ? `${player.lastname}, ${player.firstname}` : player.lastname}
          description={player.positions.join(" | ")}
          avatar={{
            src: player.avatar || null,
            showFallback: true,
            name: `${player.lastname}`,
          }}
        />
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
      if(player.gameRecords.length === 0) return <span>0</span>

      const spg = player.gameRecords.reduce((acc, curr) => {
        return acc + curr.steals;
      },0)
      
      return (
        <span className="max-w-fit">
          {(spg / player.gameRecords.length).toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })}
        </span>
      )
    case "BPG":
      if(player.gameRecords.length === 0) return <span>0</span>
      const bpg = player.gameRecords.reduce((acc, curr) => {
        return acc + curr.blocks;
      }
      ,0)
      return (
        <span className="max-w-fit">
          {(bpg / player.gameRecords.length).toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })}
        </span>
      )
    case "FG%":
      if(player.gameRecords.length === 0) return <span>0</span>
      const fg = player.gameRecords.reduce((acc, curr) => {
        return acc + curr.twoPointsMade + curr.threePointsMade;
      },0)
      const fga = player.gameRecords.reduce((acc, curr) => {
        return acc + curr.twoPointsAttempted + curr.threePointsAttempted;
      },0)
      return (
        <span className="max-w-fit">
          {((fg / fga) * 100).toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          }) + "%"}
        </span>
      )
  }
}
