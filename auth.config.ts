import bcrypt from 'bcryptjs';
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth"
import { loginUserSchema } from './lib/validator';
import { getUserByEmail } from './lib/actions/helper';
import { UserRole } from '@prisma/client';

export default {
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email!;
        session.user.name = token.name!;
        session.user.image = token.picture!;
        session.user.id = token.sub!;
        session.user.role = token.role as UserRole;
      }
      return session;
    },
  },
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        const validatedFields = loginUserSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;
          const isValid = await bcrypt.compare(password, user.password);
          if (isValid) return user;
        }
        return null;
      }
    })
  ],
} satisfies NextAuthConfig