import prisma from "@/lib/prisma";
import {
  Csapat,
  Jatekos,
  Merkozes,
  FiatalJatekos,
  CsapatEredmenyek,
  JatekosCsoportositas,
  csapatGolok,
  CsapatEredmenyekGolok,
  AtlagEletkor
} from "@/app/lib/definitions";
import { revalidatePath } from "next/cache";

export async function fetch7Meccs() {
  try {
    const today = new Date();
    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(today.getDate() + 7);

    const data = await prisma.$queryRaw<Merkozes[]>`
          SELECT
            m.*,
            hcs.csapatNev AS hazaiCsapatNev,
            vcs.csapatNev AS vendegCsapatNev
          FROM Merkozes m
          LEFT JOIN Csapat hcs ON m.hazaiCsID = hcs.csapatID
          LEFT JOIN Csapat vcs ON m.vendegCsID = vcs.csapatID
          WHERE m.datumIdopont >= ${today.toISOString()}
            AND m.datumIdopont < ${sevenDaysLater.toISOString()}
          ORDER BY m.datumIdopont ASC
        `;
    // console.log("data", data);
    return data;
  } catch (error) {
    console.log("Database error:", error);
    throw new Error("Failed to fetch upcoming matches.");
  }
}

export async function fetchTop5YoungestPlayers() {
  try {
    const data = await prisma.$queryRaw<FiatalJatekos[]>`
      SELECT
        j.*, 
        c.csapatnev
      FROM Jatekos j
      JOIN Csapat c ON j.csapatID = c.csapatID
      ORDER BY j.szul_datum DESC
      LIMIT 5
    `;
    // console.log("Top 5 Youngest Players:", data);
    return data;
  } catch (error) {
    console.log("Database error:", error);
    throw new Error("Failed to fetch top 5 youngest players.");
  }
}

export async function fetchCsapatEredmenyek() {
  try {
    const now = new Date();

    const eredmenyek = await prisma.$queryRaw<CsapatEredmenyek[]>`
      SELECT
        csapatnev,
        SUM(CASE WHEN hazaiCsID = csapatID AND hazaiEredmeny > vendegEredmeny THEN 1
                WHEN vendegCsID = csapatID AND vendegEredmeny > hazaiEredmeny THEN 1
                ELSE 0 END) AS gyozelmek,
        SUM(CASE WHEN hazaiCsID = csapatID AND hazaiEredmeny < vendegEredmeny THEN 1
                WHEN vendegCsID = csapatID AND vendegEredmeny < hazaiEredmeny THEN 1
                ELSE 0 END) AS veresegek,
        SUM(CASE WHEN hazaiCsID = csapatID AND hazaiEredmeny = vendegEredmeny THEN 1
                WHEN vendegCsID = csapatID AND vendegEredmeny = hazaiEredmeny THEN 1
                ELSE 0 END) AS dontetlenek,
        SUM(CASE WHEN hazaiCsID = csapatID AND hazaiEredmeny > vendegEredmeny THEN 3
                WHEN vendegCsID = csapatID AND vendegEredmeny > hazaiEredmeny THEN 3
                WHEN hazaiCsID = csapatID AND hazaiEredmeny = vendegEredmeny THEN 1
                WHEN vendegCsID = csapatID AND vendegEredmeny = hazaiEredmeny THEN 1
                ELSE 0 END) AS pontok
      FROM Csapat
      LEFT JOIN Merkozes ON (csapatID = hazaiCsID OR csapatID = vendegCsID) AND datumIdopont < ${now}
      GROUP BY csapatnev
      ORDER BY pontok DESC
      `;

    const golok = await prisma.$queryRaw<csapatGolok[]>`
      SELECT
        csapatnev,
        (SELECT SUM(hazaiEredmeny) FROM Merkozes WHERE hazaiCsID = csapatID) AS hazaiGolok,
        (SELECT SUM(vendegEredmeny) FROM Merkozes WHERE vendegCsID = csapatID) AS vendegGolok,
        (SELECT SUM(hazaiEredmeny) FROM Merkozes WHERE hazaiCsID = csapatID) + 
        (SELECT SUM(vendegEredmeny) FROM Merkozes WHERE vendegCsID = csapatID) AS osszesGol
      FROM Csapat 
      ORDER BY osszesGol DESC;
      `;

    const data: CsapatEredmenyekGolok[] = eredmenyek.map((eredmeny) => {
      const golEredmeny = golok.find(
        (g) => g.csapatnev === eredmeny.csapatnev
      ) || { hazaiGolok: 0, vendegGolok: 0, osszesGol: 0 };

      return {
        csapatnev: eredmeny.csapatnev,
        gyozelmek: Number(eredmeny.gyozelmek),
        veresegek: Number(eredmeny.veresegek),
        dontetlenek: Number(eredmeny.dontetlenek),
        pontok: Number(eredmeny.pontok),
        hazaiGolok: Number(golEredmeny.hazaiGolok),
        vendegGolok: Number(golEredmeny.vendegGolok),
        osszesGol: Number(golEredmeny.osszesGol),
      };
    });

    return data;
  } catch (error) {
    console.log("Database error:", error);
    throw new Error("Failed to fetch team results.");
  }
}

export async function fetchLegregebbiCsapatTagjai() {
  try {
    const legregebbiCsapat = await prisma.$queryRaw<Csapat[]>`
      SELECT * FROM Csapat
      ORDER BY alapitva ASC
      LIMIT 1
    `;

    if (legregebbiCsapat.length === 0) {
      return null; // Nincs csapat az adatbázisban
    }

    const jatekosok = await prisma.$queryRaw<Jatekos[]>`
      SELECT * FROM Jatekos
      WHERE csapatID = ${legregebbiCsapat[0].csapatID}
    `;

    return {
      csapat: legregebbiCsapat[0],
      jatekosok: jatekosok,
    };
  } catch (error) {
    console.log("Database error:", error);
    throw new Error("Failed to fetch the oldest team and its players.");
  }
}

export async function fetchAtlageletkor() {
  try {
    const data = await prisma.$queryRaw<AtlagEletkor[]>`
      SELECT
        c.csapatnev,
        AVG(YEAR(CURRENT_DATE) - YEAR(j.szul_datum)) AS atlag
      FROM Csapat c
      JOIN Jatekos j ON c.csapatID = j.csapatID
      GROUP BY c.csapatnev
      ORDER BY atlag ASC
    `;
    
    const convertedData = data.map(item => ({
      ...item,
      atlag: item.atlag.toFixed(2).toString()
    }));

    return convertedData;

  } catch (error) {
    console.log("Database error:", error);
    throw new Error("Failed to fetch average age.");
  }
}
