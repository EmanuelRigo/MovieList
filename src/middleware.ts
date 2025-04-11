import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import envsUtils from "./utils/envs.utils";

// Función personalizada para leer la cookie de manera asincrónica
async function getTokenCookie(request: NextRequest): Promise<string | undefined> {
  return new Promise(resolve => {
    setTimeout(() => {
      const tokenCookie = request.cookies.get("onlineUser");
      resolve(tokenCookie?.value);
    }, 0); // Simula una operación asincrónica
  });
}

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const jwt = await getTokenCookie(request); // Ahora usamos await
  console.log("🚀 ~ middleware ~ jwt:", jwt);

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

  // ✅ Si el usuario ya tiene token y quiere ir al login, lo redirigimos a la home
  if (request.nextUrl.pathname === "/login" && jwt) {
    try {
      await jwtVerify(jwt, new TextEncoder().encode(envsUtils.SECRET_KEY));
      return NextResponse.redirect(new URL("/", request.url)); // Ruta principal de tu app
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};