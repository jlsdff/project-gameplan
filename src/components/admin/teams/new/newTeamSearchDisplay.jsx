import React from "react";
import { Spinner } from "@nextui-org/react";

export default function NewTeamSearchDisplay({
  data,
  loading,
  hasSearch,
  ...props
}) {
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
        <p>⬆&nbsp;Search for players to add to the team&nbsp;⬆</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="w-full mx-4 my-2 text-center">
        <p>No players found</p>
      </div>
    );
  }

  return (
    <div className="w-full mx-4 my-2">
      <p>
        Players Found
      </p>
    </div>
  );
}
