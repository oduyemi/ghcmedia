import { NextResponse } from "next/server";
import { protectRoute } from "@/utils/routeguard";
export async function proxy(request) {
    const pathname = request.nextUrl.pathname;
    if (pathname.startsWith("/admin")) {
        return protectRoute(request, ["admin"]);
    }
    if (pathname.startsWith("/portal")) {
        return protectRoute(request, ["member"]);
    }
    return NextResponse.next();
}
export const config = {
    matcher: ["/portal/:path*", "/admin/:path*"],
};