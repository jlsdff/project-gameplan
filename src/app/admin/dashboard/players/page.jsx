import React from "react";
import DataDisplayPlayer from "@/components/admin/players/dataDisplayPlayers";

export const metadata = {
  title: "Admin | Players",
};


export default function Players() {
  
  return (
    <section className="min-h-screen p-8 sm:p-16 ">
      <DataDisplayPlayer />
    </section>
  );
}
