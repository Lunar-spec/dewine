import type { NextAuthConfig } from "next-auth"
import NextAuth from "next-auth"
import authConfig from '@/auth.config'
import { getUserById } from "./lib/actions/users.action";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "./lib/db";
import User from "./lib/database/models/user.model";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    ...authConfig,
    adapter: MongoDBAdapter(clientPromise, {
        databaseName: 'dewine',
    }),
    events: {
        async linkAccount({ user }) {
            // console.log(user)
            const userId = {
                _id: user.id
            }
            const verifyAccount = {
                emailVerified: new Date(),
            }
            const opts = { new: true, upsert: true }
            const res = await User.findOneAndUpdate(userId, verifyAccount, opts);
            // console.log(res)
        }
    },
    session: { strategy: 'jwt' },
    callbacks: {
        // async signIn({ profile, account, user }) {
        //     return true
        // },
        async jwt({ token }) {
            // console.log(token);
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
                session.user.role = token.role!;
            }
            return session
        },
    },
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: '/auth/sign-in',
        error: '/auth/error',
    },
} satisfies NextAuthConfig)