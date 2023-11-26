import Nav from "@/app/ui/Navbar";
import LogInOutButton from "./LogInOutButton";
import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";

export default function Header() {
  return (
    
        <Navbar isBordered className="w-auto" >
            <Nav/>
            <NavbarContent justify="end">
                <NavbarItem>
                <LogInOutButton/>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
      
    
  );
}