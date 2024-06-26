/**
 * These are the routes that are publicly accessible
 * and don't require authentication
 * @type {string[]}
 */
export const publicRoutes: string[] = [
    "/",
    "/about",
    "/contact",
    "/auth/new-verification",
    "/products"
];

/**
 * The prefix for all admin routes
 * @type {string}
 */
export const adminRoute: string = "/admin";

/**
 * These are the routes that require authentication
 * and are not publicly accessible
 * redirects them after logging to /settings
 * @type {string[]}
 */
export const authRoutes: string[] = [
    "/auth/sign-in",
    "/auth/reset",
    "/auth/sign-up",
    "/auth/error",
    "/auth/new-password",
];
/**
 * The prefix for all API routes
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/auth";

/**
 * The prefix for uplaodthing route
 *  @type {string}
 * */
export const apiUploadPrefix: string = "/api/uploadthing";
/**
 * The default login redirect
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/profile";
