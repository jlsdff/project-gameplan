import React from "react";
import DataDisplayPlayer from "@/components/admin/players/dataDisplayPlayers";
import AdminPlayer from "@/components/admin/players/v2/adminPlayer";

export const metadata = {
  title: "Admin | Players",
};


export default function Players() {
  
  return (
    <section className="min-h-screen p-8 sm:p-16 ">
      {/*<DataDisplayPlayer /> */}
      <AdminPlayer />
    </section>
  );
}
