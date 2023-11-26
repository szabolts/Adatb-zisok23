'use server'
import { signIn } from '@/auth';
import { z } from 'zod';
import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";
import cuid from 'cuid';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signOut } from "@/auth";
import { auth } from '@/auth';


const UserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  password2: z.string().min(6)
})
.refine((data) => data.password === data.password2, {
  message: "Passwords don't match",
  path: ["confirm"],
});



const CreateUser = UserSchema;
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', Object.fromEntries(formData));
    return 'Success';
  } catch (error) {
    if ((error as Error).message.includes('CredentialsSignin')) {
      return 'CredentialSignin';
    }
    throw error;
  }
}

export async function createUser ( formData: FormData) {
  const { name, email, password, password2 } = CreateUser.parse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    password2: formData.get('password2')
  })
  
  // console.log(password)
  const bPassword = await bcrypt.hash(password, 10)
  // console.log(bPassword)

  try {
    await prisma.$queryRaw`
    INSERT INTO User (id, email, password, name)
    VALUES (${cuid()}, ${email}, ${bPassword}, ${name})
    `;
  // return { success: true };
  redirect('/dashboard');
  
  } catch (error) {
    return { success: false, message: "Hiba történt a regisztráció során." };
  }
}

export async function logOut() {
  await signOut();
}

const CsapatSchema = z.object({
  csapatNev: z.string(),
  varos: z.string(),
  alapitva: z.number().int().gte(1900).lte(2023),
})

export async function createCsapat(formData: FormData) {
  // console.log("formData: ", formData)
  const { csapatNev, varos, alapitva} = CsapatSchema.parse({
    csapatNev: formData.get('csapatNev'),
    varos: formData.get('varos'),
    alapitva: Number(formData.get('alapitva')), 
  })

  try {
    // Csapat beszúrása
    const csapatResult = await prisma.$queryRaw<{ f0: number }[]>`INSERT INTO Csapat (csapatNev, varos, alapitva) VALUES (${csapatNev}, ${varos}, ${alapitva}) RETURNING csapatID as f0`;
    // console.log("csapatResult: ", csapatResult);
    const csapatID = csapatResult[0].f0;
    // console.log("Csapat beszúrva, csapatID:", csapatID);

    // Jatekosok frissítése
    const jatekosIDk = [...formData.getAll('kapus'), ...formData.getAll('vedo'), ...formData.getAll('kozeppalyas'), ...formData.getAll('tamado')]
    .map(id => Number(id));

  // Frissítés külön update parancsokkal
  for (const jatekosID of jatekosIDk) {
    await prisma.$queryRaw`UPDATE Jatekos SET csapatID = ${csapatID} WHERE jatekosID = ${jatekosID}`;
  }
    
    
    } catch (error) {
       throw error;
      }

    revalidatePath('/dashboard');

}  

export async function updateCsapat(id: number, formData: FormData) {
  const { csapatNev, varos, alapitva} = CsapatSchema.parse({
    csapatNev: formData.get('csapatNev'),
    varos: formData.get('varos'),
    alapitva: Number(formData.get('alapitva')) 
  });

  const jatekosok = {
    kapus: formData.getAll('kapus').map(id => Number(id)),
    vedo: formData.getAll('vedo').map(id => Number(id)),
    kozeppalyas: formData.getAll('kozeppalyas').map(id => Number(id)),
    tamado: formData.getAll('tamado').map(id => Number(id)),
  };

  try {
    // Csapat frissítése
    await prisma.$queryRaw`
      UPDATE Csapat
      SET csapatNev = ${csapatNev}, varos = ${varos}, alapitva = ${alapitva}
      WHERE csapatID = ${id}
    `;

    // Összes játékos csapatID-jének NULL-ra állítása
    await prisma.$queryRaw`
      UPDATE Jatekos
      SET csapatID = NULL
      WHERE csapatID = ${id}
    `;

    // Frissített adatok alapján csak azoknak a játékosoknak az id-jét állítjuk vissza, akik a kapusok között szerepelnek
    for (const jatekosID of jatekosok.kapus) {
      await prisma.$queryRaw`
        UPDATE Jatekos
        SET csapatID = ${id}
        WHERE jatekosID = ${jatekosID}
      `;
    }

    for (const jatekosID of jatekosok.vedo) {
      await prisma.$queryRaw`
        UPDATE Jatekos
        SET csapatID = ${id}
        WHERE jatekosID = ${jatekosID}
      `;
    }

    for (const jatekosID of jatekosok.kozeppalyas) {
      await prisma.$queryRaw`
        UPDATE Jatekos
        SET csapatID = ${id}
        WHERE jatekosID = ${jatekosID}
      `;
    }

    for (const jatekosID of jatekosok.tamado) {
      await prisma.$queryRaw`
        UPDATE Jatekos
        SET csapatID = ${id}
        WHERE jatekosID = ${jatekosID}
      `;
    }


    revalidatePath('/dashboard');
  } catch (error) {
    throw error;
  }
}

export async function deleteCsapat(id: number) {
  await prisma.$queryRaw`
  DELETE FROM Csapat
  WHERE csapatID = ${id}
  `;
  revalidatePath('/dashboard');
}

const JatekosSchema = z.object({
  jatekosNev: z.string(),
  szulDatum: z.string(),
  allampolgarsag: z.string(),
  poszt: z.string()
})

export async function createJatekos(formData: FormData) {

  const { jatekosNev, szulDatum, allampolgarsag, poszt} = JatekosSchema.parse({
    jatekosNev: formData.get('jatekosNev'),
    szulDatum: formData.get('szul_datum'),
    allampolgarsag: formData.get('allampolgarsag'),
    poszt: formData.get('poszt')
  })

  try {
    await prisma.$queryRaw`
    INSERT INTO Jatekos (jatekosnev, szul_datum, allampolgarsag, poszt)
    VALUES ( ${jatekosNev}, ${szulDatum}, ${allampolgarsag}, ${poszt})
    `;
    } catch (error) {
       throw error;
      }

    revalidatePath('/dashboard');
}

export async function updateJatekos(id: number, formData: FormData) {
  // console.log("formData: ",  formData)
  // console.log("jatekosNev: ", formData.get('jatekosnev'))
  const { jatekosNev, szulDatum, allampolgarsag, poszt} = JatekosSchema.parse({
    jatekosNev: formData.get('jatekosnev'),
    szulDatum: formData.get('szul_datum'),
    allampolgarsag: formData.get('allampolgarsag'),
    poszt: formData.get('poszt') 
  });

  await prisma.$queryRaw`
  UPDATE Jatekos
  SET jatekosnev = ${jatekosNev}, szul_datum = ${szulDatum}, allampolgarsag = ${allampolgarsag}, poszt = ${poszt}
  WHERE jatekosID = ${id}
  `;
  revalidatePath('/dashboard');
}


export async function deleteJatekos(id: number) {
  await prisma.$queryRaw`
  DELETE FROM Jatekos
  WHERE jatekosID = ${id}
  `;
  revalidatePath('/dashboard');
}