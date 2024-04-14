import NextAuth from "next-auth"
import authConfig from "./auth.config"
export const { auth } = NextAuth(authConfig);

import {
    DEFAULT_LOGIN_REDIRECT,
    adminRoute,
    apiAuthPrefix,
    apiUploadPrefix,
    authRoutes,
    publicRoutes
} from '@/routes';

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const isAdmin = req.auth?.user.role === "ADMIN";

    const isUploadThingRoute = nextUrl.pathname.startsWith(apiUploadPrefix);
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    const isAdminRoute = nextUrl.pathname.startsWith(adminRoute);

    // TODO Add stripe payment in here as we need it to be open for only registered users
    if (isApiAuthRoute || isUploadThingRoute) {
        return;
    }

    if (isAdminRoute) {
        if (!isLoggedIn) {
            return Response.redirect(new URL("/auth/sign-in", nextUrl));
        }
        else if (!isAdmin) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return;
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        };
        return;
    }

    if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL("/auth/sign-in", nextUrl));
    }
    return;
})

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"]
}