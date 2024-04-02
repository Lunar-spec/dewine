import NextAuth from "next-auth"
import authConfig from "./auth.config"
export const { auth } = NextAuth(authConfig);

import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    apiUploadPrefix,
    authRoutes,
    publicRoutes
} from '@/routes'

export default auth((req) => {
    // console.log(req);
    
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    // console.log(nextUrl.pathname);
    const isUploadThingRoute = nextUrl.pathname.startsWith(apiUploadPrefix);
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute || isUploadThingRoute) {
        return;
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        };
        return;
    }
    if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL("/", nextUrl));
        //     let callbackUrl = nextUrl.pathname;
        //     if (nextUrl.search) {
        //         callbackUrl += nextUrl.search;
        //     }

        //     const encodedCallbackUrl = encodeURIComponent(callbackUrl);

        //     return Response.redirect(new URL(
        //         `/auth/login?callbackUrl=${encodedCallbackUrl}`,
        //         nextUrl
        //     ));
    }

    return;
})

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"]
}