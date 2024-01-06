"use client";
import React, { useState } from "react";
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
import { Josefin_Sans } from "next/font/google";

const josefin_sans = Josefin_Sans({ subsets: ["latin"] });

export default function TopNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Navbar
      className="wrapper"
      maxWidth="full"
      onMenuOpenChange={setIsMenuOpen}
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
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
        />
        <NavbarBrand>
          <Link href="/">
          <h3 className={`${josefin_sans.className} text-primary font-bold `}>
            THE PROJECT GAMEPLAN
          </h3>
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarMenu>
        <NavbarItem isActive={pathname === "/players"}>
          <Link href="/players" className="w-full" size="lg">Players</Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/games"}>
          <Link href="/games" className="w-full" size="lg">Games</Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/teams"}>
          <Link href="/teams" className="w-full" size="lg">Teams</Link>
        </NavbarItem>
      </NavbarMenu>

      <NavbarContent className="hidden md:flex " justify="end">
        <NavbarItem isActive={pathname === "/players"}>
          <Link className="" href="/players">
            Players
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/games"}>
          <Link className="" href="/games">
            Games
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/teams"}>
          <Link className="" href="/teams">
            Teams
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
