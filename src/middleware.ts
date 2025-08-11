import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import envsUtils from "./utils/envs.utils";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("onlineUser")?.value;
  const { pathname } = request.nextUrl;

  // Rutas privadas
  const isPrivateRoute =
    pathname === "/" ||
    pathname.startsWith("/list") ||
    pathname.startsWith("/add-movie") ||
    pathname.startsWith("/edit-movie");

  // Rutas de autenticación
  const isAuthRoute = pathname === "/login" || pathname === "/register";

  // Si no hay token y la ruta es privada → redirigir a login
  if (!token && isPrivateRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Si hay token y la ruta es /login o /register → redirigir al home
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Si hay token en rutas privadas → validar JWT
  if (token && isPrivateRoute) {
    try {
      await jwtVerify(token, new TextEncoder().encode(envsUtils.SECRET_KEY));
      return NextResponse.next();
    } catch (error: any) {
      console.error("Invalid token:", error);

      // Si el token expiró → eliminar cookie y redirigir
      if (error.code === "ERR_JWT_EXPIRED") {
        console.warn("Token expirado. Redirigiendo a /login...");
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("onlineUser");
        return response;
      }

      // Otros errores → redirigir sin borrar cookie
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Si no se cumple ningún caso, continuar
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/list",
    "/add-movie/:path*",
    "/edit-movie/:path*",
    // "/login", // Login público
    // "/register", // Registro público
  ],
};
