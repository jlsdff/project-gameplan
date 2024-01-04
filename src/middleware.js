import { NextResponse } from "next/server";
import { auth } from "@/lib/firebase/firebase";

export async function middleware(req, event) {
  const { pathname, searchParams } = req.nextUrl;

  console.log({ pathname, sort: searchParams.get("sort") });
  
}

export const config = {
  matcher: "/admin/:path*",
};
