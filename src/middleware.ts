// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import envsUtils from "./utils/envs.utils";

export async function middleware(request: NextRequest) {
  const tokenCookie = request.cookies.get("onlineUser");
  const jwt = tokenCookie?.value;

  // ✅ Si el usuario ya tiene token y quiere ir al login, lo redirigimos a la home
  if (request.nextUrl.pathname === "/login" && jwt) {
    try {
      await jwtVerify(jwt, new TextEncoder().encode(envsUtils.SECRET_KEY));
      return NextResponse.redirect(new URL("/", request.url)); // o la ruta principal de tu app
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  // ✅ Para cualquier otra ruta que no sea /login, necesita el token
  if (request.nextUrl.pathname !== "/login") {
    if (!jwt) {
      console.log("No token found");
      return NextResponse.redirect(new URL("/login", request.url));
    }
    try {
      await jwtVerify(jwt, new TextEncoder().encode(envsUtils.SECRET_KEY));
    } catch (error) {
      console.error("Invalid token:", error);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
