import React, { useMemo } from "react";
import { Spinner } from "@nextui-org/react";
import PlayerContainer from "./playerContainer";
import CheckIcon from "@/assets/checkIcon";
import AddIcon from "@/assets/addIcon";

export default function NewTeamSearchDisplay({
  data,
  initialDisplay,
  loading,
  hasSearch,
  addPlayer,
  removePlayer,
  ...props
}) {
  initialDisplay = initialDisplay || "Search for players to add to the team";

  const endContents = useMemo(() => {
    return [
      {
        isIconOnly: true,
        toolTip: "Add to team",
        icon: <AddIcon />,
        onClick: addPlayer,
        color: "primary",
        size: "sm",
        radius: "full",
      },
    ];
  }, []);

  if (loading) {
    return (
      <div className="w-full mx-4 my-2 text-center">
        <Spinner />
      </div>
    );
  }

  if (!hasSearch) {
    return (
      <div className="w-full mx-4 my-2 text-center">
        <p>⬆&nbsp;{initialDisplay}&nbsp;⬆</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="w-full mx-4 my-2 text-center">
        <p>No Data found</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {data.map((player, index) => (
        <PlayerContainer
          key={index}
          player={player}
          endContent={endContents}
          addPlayer={addPlayer}
        />
      ))}
    </div>
  );
}
