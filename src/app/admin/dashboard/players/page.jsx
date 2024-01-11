import React from "react";
import CustomTable from "@/components/ui/table/table";

export default function Players() {

  let sampleData = {}
  
  return (
    <section className="min-h-screen p-8 sm:p-16 ">
      <CustomTable data={sampleData} />
    </section>
  );
}
