import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import envsUtils from "./utils/envs.utils";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("onlineUser")?.value;

  if (!token) {
    console.log("No token found");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(envsUtils.SECRET_KEY)
    );
    console.log("🚀 ~ payload:", payload);
    return NextResponse.next();
  } catch (error) {
    console.error("Invalid token:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/",
    "/list",
    "/add-movie",
    "/add-movie/:path*",
    "/edit-movie/:path*",
  ],
};
