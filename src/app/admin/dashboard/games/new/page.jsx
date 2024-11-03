import React from "react";
// import NewGame from "@/components/admin/games/newGame";
import NewGame from "@/components/admin/games/new/NewGame";
import NewGamePage from "@/components/admin/games/new/NewGamePage";

export default function Page({id}) {

  {/* <NewGame /> */}
  return (
      <>
        <NewGamePage id={id} />
      </>
  );
}
