import bcrypt from 'bcryptjs';
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";

import type { NextAuthConfig } from "next-auth"
import { connectDb } from './lib/database/connectDb';
import User from './lib/database/models/user.model';

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
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        }
        if (!email || !password) return null;
        try {
          await connectDb();
          const user = await User.findOne({ email });
          if (!user) return null;
          const isValid = await bcrypt.compare(password, user.password);
          if (isValid) return user;
        } catch (error) {
          console.log(error);
          return null;
        }
        return null
      }
    })
  ],
} satisfies NextAuthConfig