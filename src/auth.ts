import { MongoDBAdapter } from '@auth/mongodb-adapter';
import type { NextAuthConfig } from "next-auth"
import NextAuth from "next-auth"
import authConfig from '@/auth.config'
import clientPromise from './lib/db';

export const {
    handlers: { GET, POST },
    auth,
} = NextAuth({
    adapter: MongoDBAdapter(clientPromise),
    session: { strategy: 'jwt' },
    ...authConfig
} satisfies NextAuthConfig)