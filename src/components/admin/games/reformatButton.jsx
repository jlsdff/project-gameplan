import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { reformatGamesDocument } from "@/components/scripts/reformatGamesDocument";

export default function ReformatButton() {

  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleClick = async () => {
    try {
      setLoading(true);
      await reformatGamesDocument();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleClick} isLoading={loading} disabled={isDisabled}>
      Reformat Games
    </Button>
  );
}
