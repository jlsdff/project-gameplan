"use client";
import React, { useContext } from "react";
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
import { auth } from "@/lib/firebase/firebase";
import { AdminContext } from "@/context/adminContext";
import { useRouter } from "next/navigation";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const adminContext = useContext(AdminContext);

  const menuItems = ["Teams", "Players", "Games", "Leagues", "Blogs", "Log Out"];

  function signOut() {
    auth
      .signOut()
      .then(() => {
        window.localStorage.removeItem("user");
        router.push("/admin");
      })
      .catch((error) => {
        console.error(error);
      });
  }
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

      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
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
        <NavbarItem isActive={pathname === "/admin/dashboard/leagues"}>
          <Link
            color={
              pathname === "/admin/dashboard/leagues" ? "primary" : "foreground"
            }
            href="/admin/dashboard/leagues"
          >
            Leagues
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/admin/dashboard/blogs"}>
          <Link
            color={
              pathname === "/admin/dashboard/blogs" ? "primary" : "foreground"
            }
            href="/admin/dashboard/blogs"
          >
            Blogs
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
            <DropdownItem
              key="profile"
              className="gap-2 h-14"
              onClick={() => {
                router.push(`/admin/dashboard/${adminContext.uid}`);
              }}
            >
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">
                {adminContext ? adminContext.email : "---"}
              </p>
            </DropdownItem>
            {/* <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem> */}
            <DropdownItem key="logout" color="danger" onClick={signOut}>
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
