/**
 * These are the routes that are publicly accessible
 * and don't require authentication
 * @type {string[]}
 */
export const publicRoutes: string[] = ["/", "/about", "/contact"];
/**
 * These are the routes that require authentication
 * and are not publicly accessible
 * redirects them after logging to /settings
 * @type {string[]}
 */
export const authRoutes: string[] = ["/auth/sign-in", "/auth/sign-up"];
/**
 * The prefix for all API routes
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/auth";
/**
 * The default login redirect
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/settings";