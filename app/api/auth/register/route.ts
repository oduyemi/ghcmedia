import { NextRequest, NextResponse } from "next/server";
import { createHash, randomBytes } from "node:crypto";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/utils/db";
import User from "@/models/user.model";
import { getCurrentUser } from "@/utils/auth";
import { sendOnboardingMail } from "@/helper/sendOnboardingMail";



type Role = "member" | "admin" | "pastor" | "other";


const VALID_ROLES: readonly Role[] = [
  "member",
  "admin",
  "pastor",
  "other",
];

const SETUP_TOKEN_TTL_MS = 30 * 60 * 1000;
const BCRYPT_ROUNDS = 12;
const ROLE_LABELS: Record<Role, string> = {
  member: "Member",
  admin: "Administrator",
  pastor: "Pastor",
  other: "Other",
};

function hashSetupToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

function isDuplicateKeyError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === 11000
  );
}

function isValidRole(value: unknown): value is Role {
  return (
    typeof value === "string" &&
    VALID_ROLES.includes(value as Role)
  );
}

function isValidEmail(email: string): boolean {
  return /^\S+@\S+\.\S+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== "admin") {
      return NextResponse.json(
        {
          error: "Forbidden. Only administrators can create accounts.",
        },
        { status: 403 }
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

    const {
      fname,
      lname,
      email,
      role,
      phone,
    } = body as {
      fname?: unknown;
      lname?: unknown;
      email?: unknown;
      role?: unknown;
      phone?: unknown;
    };

    if (
      typeof fname !== "string" ||
      typeof lname !== "string" ||
      typeof email !== "string" ||
      typeof phone !== "string" ||
      !fname.trim() ||
      !lname.trim() ||
      !email.trim() ||
      !phone.trim()
    ) {
      return NextResponse.json(
        {
          error:
            "First name, last name, email and phone are required.",
        },
        { status: 400 }
      );
    }

    const firstName = fname.trim();
    const lastName = lname.trim();
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPhone = phone.trim();
    if (
      firstName.length > 80 ||
      lastName.length > 80 ||
      normalizedEmail.length > 254 ||
      normalizedPhone.length > 80
    ) {
      return NextResponse.json(
        {
          error: "One or more fields exceed the allowed length.",
        },
        { status: 400 }
      );
    }

    if (!isValidEmail(normalizedEmail)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Default to member when role is omitted.
    let requestedRole: Role = "member";
    if (role !== undefined) {
      if (!isValidRole(role)) {
        return NextResponse.json(
          {
            error:
              "Invalid role. Role must be member, admin, pastor, or other.",
          },
          { status: 400 }
        );
      }

      requestedRole = role;
    }

    const existingUser = await User.findOne({
      email: normalizedEmail,
    }).select("_id");

    if (existingUser) {
      return NextResponse.json(
        {
          error: "An account with this email already exists.",
        },
        { status: 409 }
      );
    }

    // Generate a cryptographically secure, single-use setup token.
    // Only its SHA-256 hash is stored in the database.
    const setupToken = randomBytes(48).toString("hex");
    const setupTokenHash = hashSetupToken(setupToken);

    const setupTokenExpiresAt = new Date(
      Date.now() + SETUP_TOKEN_TTL_MS
    );

    // Generate an initial password the recipient does not know.
    // The recipient must set their own password through onboarding.
    const unusableInitialPassword = randomBytes(48).toString("hex");

    const hashedInitialPassword = await bcrypt.hash(
      unusableInitialPassword,
      BCRYPT_ROUNDS
    );

    let newUser;

    try {
      newUser = await User.create({
        fname: firstName,
        lname: lastName,
        email: normalizedEmail,
        phone: normalizedPhone,
        password: hashedInitialPassword,
        role: requestedRole,
        firstLogin: true,
        setupTokenHash,
        setupTokenExpiresAt,
        sessionVersion: 0,
      });
    } catch (error: unknown) {
      // The unique database index handles concurrent registrations
      // attempting to create accounts with the same email.
      if (isDuplicateKeyError(error)) {
        return NextResponse.json(
          {
            error: "An account with this email already exists.",
          },
          { status: 409 }
        );
      }

      throw error;
    }

    // Send the onboarding invitation.
    try {
      await sendOnboardingMail(
        newUser.email,
        setupToken,
        newUser.role,
        newUser.fname
      );
    } catch (emailError: unknown) {
      // Do not log or return the raw setup token.
      console.error("ONBOARDING EMAIL ERROR:", emailError);

      return NextResponse.json(
        {
          message:
            "The account was created, but the invitation email could not be sent. Please resend the invitation.",
          emailSent: false,
          user: {
            _id: newUser._id.toString(),
            fname: newUser.fname,
            lname: newUser.lname,
            email: newUser.email,
            phone: newUser.phone,
            role: newUser.role,
            firstLogin: newUser.firstLogin,
          },
        },
        { status: 201 }
      );
    }

    return NextResponse.json(
      {
        message: `${ROLE_LABELS[requestedRole]} account created successfully. An invitation email has been sent.`,
        emailSent: true,
        user: {
          _id: newUser._id.toString(),
          fname: newUser.fname,
          lname: newUser.lname,
          email: newUser.email,
          phone: newUser.phone,
          role: newUser.role,
          firstLogin: newUser.firstLogin,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("REGISTER ERROR:", error);

    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
