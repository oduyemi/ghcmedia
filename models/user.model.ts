import mongoose, { Document, Schema, Types } from "mongoose";

export type UserRole = "member" | "admin";

export interface IUser extends Document {
  _id: Types.ObjectId;
  fname: string;
  lname: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
  image?: string | null;
  imagePublicId?: string | null;
  sessionVersion: number;
  firstLogin: boolean;
  lastLogin?: Date | null;
  setupTokenHash?: string | null;
  setupTokenExpiresAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    fname: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    lname: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      maxlength: 254,
      match: [
        /^\S+@\S+\.\S+$/,
        "Please use a valid email address",
      ],
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
    role: {
      type: String,
      enum: ["member", "admin"],
      default: "member",
      required: true,
    },
    image: {
      type: String,
      default: null,
      trim: true,
    },
    imagePublicId: {
      type: String,
      default: null,
      trim: true,
    },
    sessionVersion: {
      type: Number,
      default: 0,
      min: 0,
      required: true,
    },
    firstLogin: {
      type: Boolean,
      default: true,
      required: true,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
    setupTokenHash: {
      type: String,
      default: null,
      select: false,
    },
    setupTokenExpiresAt: {
      type: Date,
      default: null,
      select: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.index(
  { email: 1 },
  { unique: true, name: "unique_user_email" }
);

const User =
  mongoose.models.User ||
  mongoose.model<IUser>("User", userSchema);

export default User;
