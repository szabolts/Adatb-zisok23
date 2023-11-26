"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarMenuItem,
} from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import ThemeSwitcher from "./ThemeSwitcher";
import LogoutButton from "./LogoutButton";
import LogInOutButton from "./LogInOutButton";
import  { SessionType } from "@/app/lib/definitions"
import { Session } from "next-auth";
// import clsx from "clsx";



export default function Nav({ session }: { session?: Session | null }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  // console.log("session in Nav: ", session);
  // console.log("session email:", session?.user?.email);

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} isBordered>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit text-xl">TournaMentor</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/dashboard" color="foreground">
            Dashboard
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/tournaments">
            Tournaments
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/adatb">
            AdatB
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {/* <NavbarItem>
          <Link href="/login">Login</Link>
        </NavbarItem> */}
        <NavbarItem>
          <LogInOutButton session={session}/>
          {/* <LogoutButton/> */}
          {/* <UserComponent/> */}
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitcher />
          {/* <ThemeButton /> */}
          {/* <UserComponent/> */}
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem>
          <Link href="/dashboard">Home</Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href="/dashboard">Dashboard</Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href="/dashboard">About</Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href="#">Login</Link>
        </NavbarMenuItem>
        <NavbarMenuItem>tSwitch</NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
