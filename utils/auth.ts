import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import { jwtVerify, SignJWT } from "jose";
import bcrypt from "bcryptjs";
import User from "@/models/user.model";


export type Role = "member" | "admin" | "pastor" | "other";

export interface AuthTokenPayload {
  userId: string;
  role: Role;
  sessionVersion: number;
  firstLogin: boolean;
}
const TOKEN_COOKIE = "token";
const TOKEN_MAX_AGE = 60 * 60 * 24 * 7;
const JWT_ALGORITHM = "HS256";


function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error(
      "JWT_SECRET must be configured with at least 32 characters."
    );
  }

  return new TextEncoder().encode(secret);
}


export async function createAuthToken(
  payload: AuthTokenPayload
): Promise<string> {
  return new SignJWT({
    userId: payload.userId,
    role: payload.role,
    sessionVersion: payload.sessionVersion,
    firstLogin: payload.firstLogin,
  })
    .setProtectedHeader({ alg: JWT_ALGORITHM })
    .setSubject(payload.userId)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getJwtSecret());
}


export async function verifyToken(
  token: string
): Promise<AuthTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getJwtSecret(), {
      algorithms: [JWT_ALGORITHM],
    });

    const allowedRoles: Role[] = [
      "member",
      "admin",
      "pastor",
      "other",
    ];
    
    if (
      typeof payload.userId !== "string" ||
      payload.sub !== payload.userId ||
      typeof payload.role !== "string" ||
      !allowedRoles.includes(payload.role as Role)
    ) {
      return null;
    }

    const sessionVersion = payload.sessionVersion ?? 0;
    if (
      typeof sessionVersion !== "number" ||
      !Number.isInteger(sessionVersion) ||
      sessionVersion < 0
    ) {
      return null;
    }

    if (
      payload.firstLogin !== undefined &&
      typeof payload.firstLogin !== "boolean"
    ) {
      return null;
    }

    return {
      userId: payload.userId,
      role: payload.role as Role,
      sessionVersion,
      firstLogin: payload.firstLogin === true,
    };
  } catch {
    return null;
  }
}

export async function getCurrentUser() {
  const headerList = await headers();
  const authorization = headerList.get("authorization");

  let token: string | undefined;

  if (authorization?.startsWith("Bearer ")) {
    token = authorization.slice(7).trim();
  }

  if (!token) {
    token = (await cookies()).get(TOKEN_COOKIE)?.value;
  }

  if (!token) {
    return null;
  }

  const decoded = await verifyToken(token);

  if (!decoded) {
    return null;
  }

  const user = await User.findById(decoded.userId).select(
    "-password"
  );

  if (!user) {
    return null;
  }

  if (user.role !== decoded.role) {
    return null;
  }

  const currentVersion = user.sessionVersion ?? 0;

  if (currentVersion !== decoded.sessionVersion) {
    return null;
  }

  return user;
}

export function requireRole(
  user: { role: string } | null | undefined,
  roles: Role[]
) {
  if (!user || !roles.includes(user.role as Role)) {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }

  return null;
}

export function setAuthCookie(
  response: NextResponse,
  token: string
) {
  response.cookies.set(TOKEN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: TOKEN_MAX_AGE,
    path: "/",
  });
}

export function clearAuthCookie(response: NextResponse) {
  response.cookies.set(TOKEN_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    expires: new Date(0),
    path: "/",
  });
}

export async function handleLogin(req: Request) {
  try {
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
      !("email" in body) ||
      !("password" in body)
    ) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const { email, password } = body as {
      email: unknown;
      password: unknown;
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

    user.lastLogin = new Date();
    await user.save();

    const token = await createAuthToken({
      userId: user._id.toString(),
      role: user.role,
      sessionVersion: user.sessionVersion ?? 0,
      firstLogin: user.firstLogin,
    });

    const response = NextResponse.json({
      message: "Login successful.",
      user: {
        _id: user._id.toString(),
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        role: user.role,
        image: user.image,
        firstLogin: user.firstLogin,
      },
      firstLogin: user.firstLogin,
    });

    setAuthCookie(response, token);

    return response;
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
