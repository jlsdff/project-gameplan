import React from "react";
import DataDisplayTeams from "@/components/admin/teams/dataDisplayTeams";
import DataDisplayProvider from "@/providers/dataDisplayProvider";

export const metadata = {
  title: "Admin | Teams",
};

export default function Teams() {
  return (
    <DataDisplayProvider>
      <DataDisplayTeams />
    </DataDisplayProvider>
  );
}
