'use client'
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";

export default function TopNav() {

  const pathname = usePathname();

  return (
    <Navbar
      className="wrapper"
      maxWidth="full"
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-primary",
        ],
      }}
    >
      <NavbarBrand>
        <h3>THE PROJECT GAMEPLAN</h3>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem isActive={pathname === "/"} >
          <Link className="" href="/">Home</Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/players"} >
          <Link className="" href="/players">Players</Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/games"}>
          <Link className="" href="/games">Games</Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/teams"}>
          <Link className="" href="/teams">Teams</Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
