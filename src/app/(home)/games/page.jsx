import React from "react";
import GamesPage from "@/components/client/games/gamesPage";
import UnderMaintainance from "@/components/ui/underMaintainance";

export const metadata = {
  title: "Games",
  description: "Recent games played by teams",
};

export default async function Page({ searchParams }) {

  return (
    // <UnderMaintainance />
    <GamesPage />
  );
}
