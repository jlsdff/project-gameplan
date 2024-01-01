"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  NavbarMenuToggle,
  NavbarMenu,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
// import {AcmeLogo} from "./AcmeLogo.jsx";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();

  const menuItems = ["Teams", "Players", "Games", "Log Out"];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          {/* <AcmeLogo /> */}
          <Link href="/admin/dashboard">
            <p className="font-bold text-inherit">The Project Gameplan</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={pathname === "/admin/dashboard/teams"}>
          <Link
            color={
              pathname === "/admin/dashboard/teams" ? "primary" : "foreground"
            }
            href="/admin/dashboard/teams"
          >
            Teams
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/admin/dashboard/players"}>
          <Link
            color={
              pathname === "/admin/dashboard/players" ? "primary" : "foreground"
            }
            href="/admin/dashboard/players"
          >
            Players
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/admin/dashboard/games"}>
          <Link
            color={
              pathname === "/admin/dashboard/games" ? "primary" : "foreground"
            }
            href="/admin/dashboard/games"
          >
            Games
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent as={"div"} justify="end">
        <Dropdown>
          <DropdownTrigger>
            {/* TODO: replace src and name */}
            <Avatar
              showFallback
              // src="https://assets.vercel.com/image/upload/v1538361091/repositories/next-js/next-js-bg.png"
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Admin"
              size="sm"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">placeholder@example.com</p>
            </DropdownItem>
            {/* <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem> */}
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarItem
            key={`${item}-${index}`}
            isActive={pathname === `/admin/dashboard/${item.toLowerCase()}`}
          >
            <Link
              color={index === menuItems.length - 1 ? "danger" : "foreground"}
              className="w-full"
              href={`/admin/dashboard/${item.toLowerCase()}`}
              size="lg"
            >
              {item}
            </Link>
          </NavbarItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
