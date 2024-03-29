import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    const { pathname, origin } = req.nextUrl;
    if (
      req.nextUrl.pathname.includes("/admin") &&
      req.nextauth.token?.role !== "ADMIN"
    ) {
      return NextResponse.redirect(new URL(`/`));
    }
  },
  {
    callbacks: {
      authorized: (params) => {
        let { token } = params;
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/app/:path*"],
};
