// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  
  
 if ( request.nextUrl.pathname.includes('/login') ) {
  console.log("🚀 ~ request:", request.cookies.get("mode"))
 }
  
  return NextResponse.next() 
}

