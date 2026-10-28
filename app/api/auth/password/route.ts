
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/user.model";
import { dbConnect } from "@/utils/db";
import { createAuthToken, getCurrentUser, setAuthCookie } from "@/utils/auth";



export async function PATCH(req: NextRequest) {
  try {
    await dbConnect();
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 }
      );
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "A valid JSON request body is required." },
        { status: 400 }
      );
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 }
      );
    }

    const { currentPassword, newPassword } = body as {
      currentPassword?: unknown;
      newPassword?: unknown;
    };

    if (
      typeof currentPassword !== "string" ||
      typeof newPassword !== "string" ||
      !currentPassword ||
      !newPassword
    ) {
      return NextResponse.json(
        {
          error:
            "Current password and new password are required.",
        },
        { status: 400 }
      );
    }

    if (newPassword.length < 8 || newPassword.length > 72) {
      return NextResponse.json(
        {
          error:
            "The new password must contain between 8 and 72 characters.",
        },
        { status: 400 }
      );
    }

    const user = await User.findById(
      currentUser._id
    ).select("+password");

    if (!user) {
      return NextResponse.json(
        { error: "User not found." },
        { status: 404 }
      );
    }

    const passwordMatches = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!passwordMatches) {
      return NextResponse.json(
        { error: "Your current password is incorrect." },
        { status: 400 }
      );
    }

    const samePassword = await bcrypt.compare(
      newPassword,
      user.password
    );

    if (samePassword) {
      return NextResponse.json(
        {
          error:
            "Your new password must be different from your current password.",
        },
        { status: 400 }
      );
    }

    const secret = process.env.JWT_SECRET;

    if (!secret || secret.length < 32) {
      console.error("JWT_SECRET is not configured correctly.");

      return NextResponse.json(
        { error: "Authentication is temporarily unavailable." },
        { status: 500 }
      );
    }

    user.password = await bcrypt.hash(newPassword, 12);
    user.sessionVersion = (user.sessionVersion ?? 0) + 1;

    // Completing a successful password change also completes first login.
    user.firstLogin = false;
    await user.save();
    const token = await createAuthToken({
      userId: user._id.toString(),
      role: user.role,
      sessionVersion: user.sessionVersion,
      firstLogin: false,
    });

    const response = NextResponse.json({
      message: "Password updated successfully.",
    });

    setAuthCookie(response, token);

    return response;
  } catch (error) {
    console.error("UPDATE PASSWORD ERROR:", error);

    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
