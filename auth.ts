import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import authConfig from '@/auth.config';
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { getUserById } from "./lib/actions/helper";
import { UserRole } from "@prisma/client";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    adapter: PrismaAdapter(db),
    session: { strategy: 'jwt' },
    ...authConfig,
    callbacks: {
        async jwt({ token }) {
            if (!token.sub) return null;
            const existingUser = await getUserById(token.sub);
            token.role = existingUser.role;
            return token
        },
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
        async signIn({ user, account }) {
            if (account?.provider !== 'credentials') return true;
            const existingUser = await getUserById(user.id as string);
            if (!existingUser || !existingUser.emailVerified) return false;
            //    TODO Add 2FA
            return true;
        },
    },
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: '/auth/sign-in',
        error: '/auth/error',
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() },
            })
        }
    },
} satisfies NextAuthConfig)