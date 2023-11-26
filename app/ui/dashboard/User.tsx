import { Avatar } from "@nextui-org/react";
import { Session } from "next-auth";

type UserProps = {
    toggle: boolean;
    session?: Session | null;
  };

  export default function User({ toggle, session }: UserProps) {
    console.log("session in User: ",session);
    return (
      <div className={`flex  items-center ${toggle ? "bg-none transition-opacity duration-300 delay-200" : " "}`}>
        <div className="min-w-[3.5rem] h-[3.5rem] flex items-center ">
          <Avatar/>               
        </div>
        <div className={`flex flex-col  transition-opacity duration-300 ${toggle ? "opacity-0" : "opacity-100"}`}>
          <span className="text-xl">{session?.user?.name}</span>
          <span className="text-xs text-gray-600 dark:text-gray-400 " >{session?.user?.email}</span>
        </div>
      </div>
    )
  }