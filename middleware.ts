import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname.startsWith("/auth");

    // Redirect root path to analytics for authenticated users
    if (req.nextUrl.pathname === "/" && isAuth) {
      return NextResponse.redirect(new URL("/analytics", req.url));
    }

    // Protect admin routes
    if (req.nextUrl.pathname.startsWith("/settings/users") && token?.role !== "Admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    
    // Redirect to dashboard if authenticated and trying to access auth page
    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/analytics", req.url)); // Changed from "/" to "/analytics"
      }
      // Allow unauthenticated users to access auth pages
      return null;
    }

    // For all other routes, user must be authenticated
    return null;
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

// Fix the matcher to EXCLUDE auth routes
export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|public|auth).*)",
  ],
};