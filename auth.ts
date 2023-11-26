import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { User } from "@/app/lib/definitions"
import prisma from "@/lib/prisma";


async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await prisma.$queryRaw<User[]>`SELECT * from User where email=${email}`;
    // console.log(user)
    return user[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
 
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          // console.log("USERACT:" ,user)
          // console.log(password, user?.password)
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }
        console.log(credentials);
        console.log(parsedCredentials)
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});