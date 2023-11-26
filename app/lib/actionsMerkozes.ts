"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import prisma from "@/lib/prisma";

const MerkozesSchema = z.object({
  palya: z.string(),
  datumIdopont: z.string(),
  hazaiCsapatNev: z.string(),
  vendegCsapatNev: z.string(),
  hazaiEredmeny: z.number(),
  vendegEredmeny: z.number(),
});

export async function createMerkozes(formData: FormData) {
  // console.log("formData: ", formData);

  const hazaiCsapatNev = formData.get("hazaiCsapatNev");
  const vendegCsapatNev = formData.get("vendegCsapatNev");
  // console.log("hazaiCsapatNev: ", hazaiCsapatNev);
  // console.log("vendegCsapatNev: ", vendegCsapatNev);
  // Csapatok lekérése a nevük alapján
  const hazaiCsapat: { csapatID?: number }[] =
    await prisma.$queryRaw`SELECT csapatID FROM Csapat WHERE csapatnev = ${hazaiCsapatNev}`;

  // console.log("hazaiCsapat: ", hazaiCsapat);

  const vendegCsapat: { csapatID?: number }[] =
    await prisma.$queryRaw`SELECT csapatID FROM Csapat WHERE csapatnev = ${vendegCsapatNev}`;

  const hazaiCsapatID = hazaiCsapat[0]?.csapatID;
  const vendegCsapatID = vendegCsapat[0]?.csapatID;

  const { palya, datumIdopont, hazaiEredmeny, vendegEredmeny } =
    MerkozesSchema.parse({
      palya: formData.get("palya"),
      datumIdopont: formData.get("datumIdopont"),
      hazaiEredmeny: Number(formData.get("hazaiEredmeny")),
      vendegEredmeny: Number(formData.get("vendegEredmeny")),
      hazaiCsapatNev: hazaiCsapatNev,
      vendegCsapatNev: vendegCsapatNev,
    });

  try {
    await prisma.$queryRaw`
      INSERT INTO Merkozes (palya, datumIdopont, hazaiCsID, vendegCsID, hazaiEredmeny, vendegEredmeny)
      VALUES ( ${palya}, ${datumIdopont}, ${hazaiCsapatID}, ${vendegCsapatID}, ${hazaiEredmeny}, ${vendegEredmeny})
      `;
  } catch (error) {
    throw error;
  }

  revalidatePath("/dashboard");
}

export async function updateMerkozes(id: number, formData: FormData) {
  const hazaiCsapatNev = formData.get("hazaiCsapatNev");
  const vendegCsapatNev = formData.get("vendegCsapatNev");

  const hazaiCsapat: { csapatID?: number }[] =
    await prisma.$queryRaw`SELECT csapatID FROM Csapat WHERE csapatnev = ${hazaiCsapatNev}`;

  const vendegCsapat: { csapatID?: number }[] =
    await prisma.$queryRaw`SELECT csapatID FROM Csapat WHERE csapatnev = ${vendegCsapatNev}`;

  const hazaiCsapatID = hazaiCsapat[0]?.csapatID;
  const vendegCsapatID = vendegCsapat[0]?.csapatID;

  const { palya, datumIdopont, hazaiEredmeny, vendegEredmeny } =
    MerkozesSchema.parse({
      palya: formData.get("palya"),
      datumIdopont: formData.get("datumIdopont"),
      hazaiEredmeny: Number(formData.get("hazaiEredmeny")),
      vendegEredmeny: Number(formData.get("vendegEredmeny")),
      hazaiCsapatNev: hazaiCsapatNev,
      vendegCsapatNev: vendegCsapatNev,
    });

  await prisma.$queryRaw`
    UPDATE Merkozes
    SET
      palya = ${palya},
      datumIdopont = ${datumIdopont},
      hazaiCsID = ${hazaiCsapatID},
      vendegCsID = ${vendegCsapatID},
      hazaiEredmeny = ${hazaiEredmeny},
      vendegEredmeny = ${vendegEredmeny}
    WHERE merkozesID = ${id}
  `;

  revalidatePath('/dashboard');
}

export async function deleteMerkozes(id: number) {
  await prisma.$queryRaw`
  DELETE FROM Merkozes
  WHERE merkozesID = ${id}
  `;
  revalidatePath('/dashboard');
}


// export async function createProbaMerkozesek(csapatNevek: string[]) {
//   try {
//     // Lekérdezzük a kiválasztott csapatokat a nevük alapján
//     const lekerdezettCsapatok = await prisma.$queryRaw<{ csapatID: number }[]>`
//       SELECT csapatID FROM Csapat WHERE csapatnev IN (${Prisma.join(csapatNevek)})
//     `;

//     // Az összes csapatpárosítás létrehozása
//     for (let i = 0; i < lekerdezettCsapatok.length; i++) {
//       for (let j = i + 1; j < lekerdezettCsapatok.length; j++) {
//         const hazaiCsapatID = lekerdezettCsapatok[i].csapatID;
//         const vendegCsapatID = lekerdezettCsapatok[j].csapatID;

//         // Mérkőzés létrehozása az adatbázisban
//         await prisma.$queryRaw`
//           INSERT INTO Merkozes (hazaiCsID, vendegCsID)
//           VALUES (${hazaiCsapatID}, ${vendegCsapatID})
//         `;
//       }
//     }
//   } catch (error) {
//     throw new Error(`Hiba a próba mérkőzések létrehozásakor: ${error.message}`);
//   }
// }