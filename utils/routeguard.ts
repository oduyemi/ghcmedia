import { NextResponse, type NextRequest } from "next/server";
import { verifyToken, clearAuthCookie } from "@/utils/auth";

export type ProtectedRole = "member" | "admin";

export async function protectRoute(
  request: NextRequest,
  allowedRoles: ProtectedRole[]
) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  const payload = await verifyToken(token);

  if (!payload) {
    const response = NextResponse.redirect(
      new URL("/login", request.url)
    );

    clearAuthCookie(response);

    return response;
  }

  if (payload.firstLogin) {
    return NextResponse.redirect(
      new URL("/setup-password", request.url)
    );
  }

  if (!allowedRoles.includes(payload.role)) {
    const destination =
      payload.role === "admin" ? "/admin" : "/portal";

    return NextResponse.redirect(
      new URL(destination, request.url)
    );
  }

  return NextResponse.next();
}
