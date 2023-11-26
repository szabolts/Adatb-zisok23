import prisma from "@/lib/prisma";
import { Csapat, Jatekos, Merkozes } from "@/app/lib/definitions";
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchCsapat() {
    noStore();
  try {
    const data = await prisma.$queryRaw<Csapat[]>`SELECT * FROM Csapat`;
    // console.log("Csapat data:", data);
    return data;
  } catch (error) {
    console.log("Database error:", error);
    throw new Error("Failed to fetch Csapat data.");
  }
}

export async function fetchJatekos() {
    noStore();
  try {
    const data = await prisma.$queryRaw<Jatekos[]>`SELECT * FROM Jatekos`;
    const formattedData = data.map((jatekos) => ({
      ...jatekos,
      szul_datum: jatekos.szul_datum?.toISOString().split("T")[0],
    }));

    //   console.log("Jatekos data:", formattedData);
    return formattedData;
  } catch (error) {
    console.log("Database error:", error);
    throw new Error("Failed to fetch Jatekos data.");
  }
}

export const posztok = [
  { label: "Kapus", value: "Kapus" },
  { label: "Védő", value: "Védő" },
  { label: "Középpályás", value: "Középpályás" },
  { label: "Támadó", value: "Támadó" },
];

export async function fetchJatekosokByPoszt(poszt: string) {
    noStore();
    try {
      const data = await prisma.$queryRaw<Jatekos[]>`
        SELECT * FROM Jatekos WHERE poszt = ${poszt}
      `;
      return data;
    } catch (error) {
      console.log("Database error:", error);
      throw new Error(`Failed to fetch ${poszt} data.`);
    }
  }

export async function fetchMerkozes() {
    noStore();
  try {
    const data = await prisma.$queryRaw<Merkozes[]>`
        
      SELECT
        m.*,
        hcs.csapatNev AS hazaiCsapatNev,
        vcs.csapatNev AS vendegCsapatNev
      FROM Merkozes m
      LEFT JOIN Csapat hcs ON m.hazaiCsID = hcs.csapatID
      LEFT JOIN Csapat vcs ON m.vendegCsID = vcs.csapatID
    `;
    // console.log("Merkozes data:", data);
    return data;

  } catch (error) {
    console.log("Database error:", error);
    throw new Error("Failed to fetch Merkozes data.");
  }
}


