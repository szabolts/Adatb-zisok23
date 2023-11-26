import { auth } from "@/auth";
import SideNav from "./SideNav";


export default async function ServerSideNavComponent() {
  const session = await auth();
  console.log("session in SIDENAV: ", session);
  return <SideNav session={session} />;
}
