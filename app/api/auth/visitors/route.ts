import { NextResponse, type NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/utils/db";
import User from "@/models/user.model";
import { createAuthToken, setAuthCookie, type Role } from "@/utils/auth";


const ALLOWED_ROLES: Role[] = ["pastor", "other"];


export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const secret = process.env.JWT_SECRET;
    if (!secret || secret.length < 32) {
      console.error(
        "JWT_SECRET must be configured with at least 32 characters."
      );

      return NextResponse.json(
        { error: "Authentication is temporarily unavailable." },
        { status: 500 }
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

    if (
      !body ||
      typeof body !== "object" ||
      Array.isArray(body)
    ) {
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 }
      );
    }

    const { email, password } = body as {
      email?: unknown;
      password?: unknown;
    };

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({
      email: normalizedEmail,
    }).select("+password");
    if (
      !user ||
      !(await bcrypt.compare(password, user.password))
    ) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    if (!ALLOWED_ROLES.includes(user.role as Role)) {
      return NextResponse.json(
        {
          error:
            "This sign-in is only available to pastors and other authorized visitors. Please use your regular sign-in.",
        },
        { status: 403 }
      );
    }

    if (user.firstLogin) {
      return NextResponse.json(
        {
          error:
            "Please complete your password setup before signing in.",
          code: "PASSWORD_SETUP_REQUIRED",
          redirectTo: "/setup-password",
        },
        { status: 403 }
      );
    }

    user.lastLogin = new Date();
    await user.save();
    const token = await createAuthToken({
      userId: user._id.toString(),
      role: user.role as Role,
      sessionVersion: user.sessionVersion ?? 0,
      firstLogin: user.firstLogin,
    });

    const response = NextResponse.json(
      {
        message: "Ratings sign-in successful.",
        redirectTo: "/ratings",
        user: {
          _id: user._id.toString(),
          fname: user.fname,
          lname: user.lname,
          email: user.email,
          role: user.role,
          image: user.image,
          firstLogin: user.firstLogin,
        },
      },
      { status: 200 }
    );

    setAuthCookie(response, token);

    return response;
  } catch (error: unknown) {
    console.error("RATINGS LOGIN ERROR:", error);

    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
