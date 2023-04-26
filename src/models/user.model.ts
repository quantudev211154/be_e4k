import mongoose, { ObjectId, Schema } from "mongoose";

export enum EUserRole {
  ADMIN = "ADMIN",
  PLAYER = "PLAYER",
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
    level: {
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
  level?: number;
  tokenVersion?: number;
  registerDate: Date;
  updatedAt: Date;
}
