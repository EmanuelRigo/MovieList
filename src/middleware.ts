import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import envsUtils from "./utils/envs.utils";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("onlineUser")?.value;
  const { pathname } = request.nextUrl;

  // Si no hay token y la ruta es privada → redirigir a /login
  const isPrivateRoute =
    pathname === "/" ||
    pathname.startsWith("/list") ||
    pathname.startsWith("/add-movie") ||
    pathname.startsWith("/edit-movie");

  if (!token && isPrivateRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Si hay token y la ruta es /login o /register → redirigir al home
  const isAuthRoute = pathname === "/login" || pathname === "/register";
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Si hay token en rutas privadas → validar JWT
  if (token && isPrivateRoute) {
    try {
      await jwtVerify(token, new TextEncoder().encode(envsUtils.SECRET_KEY));
      return NextResponse.next();
    } catch (error) {
      console.error("Invalid token:", error);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Si no se cumple ningún caso, continuar
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/", // Home privado
    "/list",
    "/add-movie/:path*",
    "/edit-movie/:path*",
    "/login", // Login público
    "/register", // Registro público
  ],
};
