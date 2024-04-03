import bcrypt from 'bcryptjs';
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth"
import { loginUserSchema } from './lib/validator';
import { getUserByEmail } from './lib/actions/helper';

export default {
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
          // console.log(user);
          if (!user || !user.password) return null;

          const isValid = await bcrypt.compare(password, user.password);
          if (isValid) return user;
        }
        return null;
      }
    })
  ],
} satisfies NextAuthConfig