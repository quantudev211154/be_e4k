import mongoose, { ObjectId, Schema } from "mongoose";
import { IUser } from "./user.model";

export enum EWordLevel {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
}

const wordSchema = new Schema(
  {
    engVer: {
      type: String,
      require: true,
    },
    vieVers: {
      type: [String],
      require: true,
    },
    level: {
      type: String,
      enum: EWordLevel,
      require: false,
      default: EWordLevel.EASY,
    },
    images: {
      type: [String],
      require: false,
      default: [],
    },
    audios: {
      type: [String],
      require: false,
      default: [],
    },
    creator: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
  },
  {
    collection: "words",
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

export const WordSchema = mongoose.model<IWord>("Word", wordSchema);

export interface IWord {
  _id: ObjectId;
  engVer: string;
  vieVers: string[];
  level: EWordLevel;
  images: string[];
  audios: string[];
  creator: IUser;
  createdAt: Date;
  updatedAt: Date;
}
