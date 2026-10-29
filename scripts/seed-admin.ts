import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "@/models/user.model";

dotenv.config({ path: ".env.local" });

const {
  MONGODB_URI,
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  ADMIN_FNAME,
  ADMIN_LNAME,
  ADMIN_PHONE,
} = process.env;

const MIN_PASSWORD_LENGTH = 8;
const BCRYPT_ROUNDS = 12;

async function seedAdmin(): Promise<void> {
  // Validate required configuration before connecting to MongoDB.
  if (!MONGODB_URI?.trim()) {
    throw new Error(
      "MONGODB_URI is not defined. Check your .env.local file."
    );
  }

  if (!ADMIN_EMAIL?.trim()) {
    throw new Error(
      "ADMIN_EMAIL is not defined. Check your .env.local file."
    );
  }

  if (!ADMIN_PASSWORD) {
    throw new Error(
      "ADMIN_PASSWORD is not defined. Check your .env.local file."
    );
  }

  if (ADMIN_PASSWORD.length < MIN_PASSWORD_LENGTH) {
    throw new Error(
      `ADMIN_PASSWORD must be at least ${MIN_PASSWORD_LENGTH} characters long.`
    );
  }

  const email = ADMIN_EMAIL.trim().toLowerCase();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("ADMIN_EMAIL must be a valid email address.");
  }

  let connected = false;

  try {
    console.log("Connecting to MongoDB...");

    await mongoose.connect(MONGODB_URI.trim());
    connected = true;

    console.log("Connected to MongoDB.");

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      if (existingUser.role !== "admin") {
        throw new Error(
          `An account already exists for ${email}, but it is not an administrator. ` +
            "No changes have been made to the existing account."
        );
      }

      console.log(`Admin already exists: ${email}`);
      console.log("No changes have been made to the existing account.");

      return;
    }

    console.log("Creating administrator account...");

    const hashedPassword = await bcrypt.hash(
      ADMIN_PASSWORD,
      BCRYPT_ROUNDS
    );

    const admin = await User.create({
      fname: ADMIN_FNAME?.trim() || "Admin",
      lname: ADMIN_LNAME?.trim() || "User",
      email,
      password: hashedPassword,
      role: "admin",
      firstLogin: false,

      // Include the phone only when supplied.
      ...(ADMIN_PHONE?.trim()
        ? { phone: ADMIN_PHONE.trim() }
        : {}),
    });

    console.log("");
    console.log("=================================");
    console.log("Administrator created successfully");
    console.log("=================================");
    console.log(`ID:    ${admin._id.toString()}`);
    console.log(`Name:  ${admin.fname} ${admin.lname}`);
    console.log(`Email: ${admin.email}`);
    console.log(`Role:  ${admin.role}`);
    console.log("=================================");
    console.log("");
  } finally {
    if (connected) {
      await mongoose.disconnect();
      console.log("MongoDB connection closed.");
    }
  }
}

seedAdmin().catch((error: unknown) => {
  const message =
    error instanceof Error
      ? error.message
      : String(error);

  console.error("");
  console.error("=================================");
  console.error("ADMIN SEED ERROR");
  console.error("=================================");
  console.error(message);
  console.error("=================================");

  process.exitCode = 1;
});