import prisma from "@/lib/prisma";
import { Csapat } from "@/app/lib/definitions";

export async function GET(req: Request) {
  const csapatok = await prisma.$queryRaw<Csapat[]>`SELECT * FROM Csapat`;
  return new Response(JSON.stringify(csapatok));  
}