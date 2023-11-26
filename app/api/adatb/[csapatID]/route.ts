import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { JatekosCsoportositas } from "@/app/lib/definitions";

export async function GET(
  req: NextRequest,
  { params }: { params: { csapatID: string } }
) {
  const csapatID = parseInt(params.csapatID);
  console.log("csapatID: ", csapatID);

  try {
    const jatekosokStatisztika = await prisma.$queryRaw<JatekosCsoportositas[]>`
      SELECT j.allampolgarsag, COUNT(*) as darab
      FROM Jatekos j
      WHERE j.csapatID = ${csapatID}
      GROUP BY j.allampolgarsag
    `;

    // Saját szerializáló függvény, ami kezeli a BigInt típusokat
    const serializedData = JSON.stringify(jatekosokStatisztika, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    );

    return new Response(serializedData, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Server error", error }), { status: 500 });
  }
}
