import mongoose, { ObjectId, Schema } from "mongoose";

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
      type: String,
      require: true,
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
  images: string[];
  audios: string[];
  creator: string;
  createdAt: Date;
  updatedAt: Date;
}
