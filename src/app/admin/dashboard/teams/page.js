import React from "react";
import DataDisplayTeams from "@/components/admin/teams/dataDisplayTeams";
import DataDisplayProvider from "@/providers/dataDisplayProvider";

export const metadata = {
  title: "Admin | Teams",
};

export default function Teams() {
  return (
    <DataDisplayProvider>
      <section className="min-h-screen p-8 sm:p-16">
        <DataDisplayTeams />
      </section>
    </DataDisplayProvider>
  );
}
