import mongoose, { ObjectId, Schema } from "mongoose";

export enum EWordLevel {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
}

const wordSchema = new Schema(
  {
    content: {
      type: String,
      require: true,
    },
    level: {
      type: EWordLevel,
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
  },
  {
    collection: "words",
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

export const WordSchema = mongoose.model("Word", wordSchema);

export interface IWord {
  _id: ObjectId;
  content: string;
  level: EWordLevel;
  images: string[];
  audios: string[];
  createdAt: Date;
  updatedAt: Date;
}
