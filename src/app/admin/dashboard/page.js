import React from "react";
import { RedirectLayer } from "@/helpers/redirectLayer";

export default function Dashboard() {
  return (
    <RedirectLayer to="/admin" >
      <main className=" flex min-h-screen flex-col items-center justify-between p-24 ">
        <p>Dashboard</p>
      </main>
    </RedirectLayer>
  );
}
