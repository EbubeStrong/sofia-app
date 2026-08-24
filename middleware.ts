import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// List of public paths that don't require authentication
const publicPaths = [
  "/auth/sign-in",
  "/auth/sign-up",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/auth/verify-otp",
  "/auth/verify-email",
  // "/auth/licensing",
  // "/auth/department",
  // "/auth/compliance",
  // "/auth/technology",
  // "/auth/onboarding-completion",
  "/pricing",
  "/invite",
  // Add any other public routes here
];

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  // Redirect from / to /auth/sigin
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  // Redirect from /settings to /settings/general
  if (pathname === "/settings") {
    return NextResponse.redirect(new URL("/settings/general", request.url));
  }

  // Redirect from /settings/configuration to /settings/configuration/department
  if (pathname === "/settings/configuration") {
    return NextResponse.redirect(
      new URL("/settings/configuration/department", request.url)
    );
  }

  // Check if current path is public
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

  // CASE 1: Logged out and on a protected route → redirect with `redirect` param
  if (!token && !isPublicPath) {
    const url = new URL("/auth/sign-in", request.url);

    // Only add redirect if it's not already there
    if (!searchParams.has("redirect")) {
      url.searchParams.set("redirect", pathname);
    }

    return NextResponse.redirect(url);
  }

  // CASE 2: Logged out and already on a public path with stale redirect → clean it
  if (!token && isPublicPath && searchParams.has("redirect")) {
    const cleanUrl = new URL(pathname, request.url); // Remove query params
    return NextResponse.redirect(cleanUrl);
  }

  return NextResponse.next();
}

// Run middleware on all paths except:
// - _next/static (static files)
// - _next/image (image optimization files)
// - favicon.ico (favicon file)
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
