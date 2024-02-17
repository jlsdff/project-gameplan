import React from "react";
import DataDisplay from "@/components/admin/dataDisplay/dataDisplay";

export default function Players() {
  
  return (
    <section className="min-h-screen p-8 sm:p-16 ">
      <DataDisplay total={20} />
    </section>
  );
}
