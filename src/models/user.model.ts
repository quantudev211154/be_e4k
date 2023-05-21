import mongoose, { ObjectId, Schema } from "mongoose";

export enum EUserRole {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  PLAYER = "PLAYER",
}

export enum EUserIsDeleted {
  FALSE = 0,
  TRUE = 1,
}

export enum EUserLevel {
  NEWBIE = "NEWBIE",
  STARTER = "STARTER",
}

const userSchema = new Schema(
  {
    phone: {
      type: String,
      require: true,
    },
    username: {
      type: String,
      require: true,
    },
    /**
     * Only for admin
     */
    password: {
      type: String,
      require: false,
      default: null,
    },
    weeklyScore: {
      type: Number,
      require: false,
      default: 0,
    },
    tokenVersion: {
      type: Number,
      require: false,
      default: 0,
    },
    role: {
      type: String,
      require: false,
      enum: EUserRole,
      default: EUserRole.PLAYER,
    },
    level: {
      type: String,
      require: true,
      enum: EUserLevel,
    },
    isDeleted: {
      type: Boolean,
      require: false,
      enum: EUserIsDeleted,
      default: EUserIsDeleted.FALSE,
    },
    golds: {
      type: Number,
      require: false,
      default: 0,
    },
    hearts: {
      type: Number,
      require: false,
      default: 0,
    },
    lastClaimdDate: {
      type: Date,
      require: false,
      default: "",
    },
    claimCount: {
      type: Number,
      require: false,
      default: 0,
    },
  },
  {
    collection: "users",
    timestamps: { createdAt: "registerDate", updatedAt: "updatedAt" },
  }
);

export const UserSchema = mongoose.model<IUser>("User", userSchema);

export interface IUser {
  _id: ObjectId;
  phone: string;
  username: string;
  password?: string;
  weeklyScore?: number;
  tokenVersion?: number;
  role?: EUserRole;
  level: EUserLevel;
  isDeleted?: EUserIsDeleted;
  golds?: number;
  hearts?: number;
  lastClaimdDate?: Date;
  claimCount?: number;
  registerDate?: Date;
  updatedAt?: Date;
}
