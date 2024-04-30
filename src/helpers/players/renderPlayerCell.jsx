import { User } from "@nextui-org/react";

export default function renderPlayerCell(player, key) {
  switch (key) {
    case "number":
      return <span>{player.number}</span>;
    case "player":
      return (
        <User
          name={`${player.lastname}, ${player.firstname || ""}`}
          description={player.positions.join(" | ")}
          avatar={{
            src: player.avatar || null,
            showFallback: true,
            name: `${player.lastname}`,
          }}
        />
      );
    case "PPG":
      return <span>{"player.PPG"}</span>;
    case "APG":
      return <span>{"player.APG"}</span>;
    case "RPG":
      return <span>{"player.RPG"}</span>;
  }
}
