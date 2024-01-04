import React from "react";
import { Spinner } from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Spinner
        label="Please Wait..."
        color="primary"
        labelColor="primary"
        size="lg"
      />
    </div>
  );
}
