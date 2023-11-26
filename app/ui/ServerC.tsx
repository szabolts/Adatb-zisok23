import {auth} from "@/auth";
import Nav from "./Navbar";
import  { SessionType } from "@/app/lib/definitions"


export default async function ServerComponent() {
const session = await auth();
console.log("session in RSC: ",session);
 return (
    <Nav session={session}/>
 )

}