import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify, errors } from "jose";
import envsUtils from "./utils/envs.utils";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("onlineUser")?.value;
  const { pathname } = request.nextUrl;

  const isPrivateRoute =
    pathname === "/" ||
    pathname.startsWith("/list") ||
    pathname.startsWith("/add-movie") ||
    pathname.startsWith("/edit-movie");

  const isAuthRoute = pathname === "/login" || pathname === "/register";

  if (!token && isPrivateRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (token && isPrivateRoute) {
    try {
      await jwtVerify(token, new TextEncoder().encode(envsUtils.SECRET_KEY));
      return NextResponse.next();
    } catch (error: unknown) {
      if (error instanceof errors.JWTExpired) {
        console.warn("Token expirado. Redirigiendo a /login...");
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("onlineUser");
        return response;
      }

      console.error("Invalid token:", error);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/list", "/add-movie/:path*", "/edit-movie/:path*"],
};
