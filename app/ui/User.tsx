

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/ui/sheet";
import { Avatar } from "@nextui-org/react";
import { auth } from "@/auth";
import LogoutButton from "./LogInOutButton";

export default async function UserComponent() {
  const session = await auth();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Avatar as="button" isBordered size="md" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <Avatar as="button" isBordered size="md" />
            <span>{session?.user?.name}</span>
            <span>{session?.user?.email}</span>
          </SheetTitle>
        </SheetHeader>
      </SheetContent>
    
    </Sheet>
  );
}
