"use client";

import Link from "next/link";
import NavLinks from "@/app/ui/dashboard/nav-links";
import { BiChevronLeft } from "react-icons/bi";
import User from "./User";
import { signOut } from "@/auth";
import { useState } from "react";
import { Session } from "next-auth";
import Clock from "./Clock";

export default function SideNav({ session }: { session?: Session | null }) {
  const [toggle, setToggle] = useState(false);
  console.log("toggle in SideNav: ", toggle);
  // console.log("session in SideNav: ", session);

  // let time = new Date().toLocaleTimeString();

  // const [ctime, setTime] = useState(time);
  // const UpdateTime = () => {
  //   time = new Date().toLocaleTimeString([], {
  //     hour: "2-digit",
  //     minute: "2-digit",
  //     second: "2-digit",
  //     hour12: false,
  //   });
  //   setTime(time);
  // };
  // setInterval(UpdateTime);

  return (
    <>
      {/* <div
        className={`${
          toggle ? "w-[82px]" : "w-[200px]"
        } dark:bg-zinc-900 h-auto rounded-xl ml-6 py-2 mt-6 border overflow-hidden  shadow-md transition-all duration-500 border-solid dark:border-zinc-800 `}
      >
        <Clock toggle={toggle} />
      </div> */}
      <div
        className={`${
          toggle ? "w-[82px]" : "w-[200px]"
        } dark:bg-zinc-900 h-auto rounded-xl ml-6 p-4 mt-6 border overflow-hidden shadow-lg transition-all duration-500 border-solid dark:border-zinc-800 `}
      >
        <div className="ml-1">
          <User toggle={toggle} session={session} />
        </div>
        <div
          className="my-2 flex justify-center items-center ml-1 
         w-10 h-10 dark:hover:bg-zinc-800 rounded-full cursor-pointer"
          onClick={() => setToggle(!toggle)}
        >
          <BiChevronLeft
            className={`${
              toggle ? "rotate-180" : ""
            } text-3xl transition-all duration-500`}
          />
        </div>
        <NavLinks toggle={toggle} />
      </div>
    </>
  );
}
