import NextAuth, { type DefaultSession } from "next-auth"

export type ExtendedUser = DefaultSession["user"] & {
    email: string
    name: string
    image: string
    id: string
    role: "ADMIN" | "USER";
}

declare module "next-auth" {
    interface Session {
        user: ExtendedUser
    }
}

import { JWT } from '@auth/core/jwt';

declare module "@auth/core/jwt" {
    interface JWT {
        role?: "ADMIN" | "USER";
    }
}