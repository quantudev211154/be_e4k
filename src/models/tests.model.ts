import mongoose, { ObjectId, Schema } from "mongoose";
import { IUser } from "./user.model";
import { EASY_TEST_SCORE } from "../constants";

export enum ETestAttachmentType {
  NONE = "NONE",
  IMAGE = "IMAGE",
  AUDIO = "AUDIO",
}

export enum ETestLevel {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
}

const testSchema = new Schema(
  {
    level: {
      type: String,
      require: false,
      enum: ETestLevel,
      default: ETestLevel.EASY,
    },
    question: {
      type: String,
      require: true,
    },
    attachment: {
      type: String,
      require: false,
      default: "",
    },
    attachmentType: {
      type: String,
      require: true,
      enum: ETestAttachmentType,
    },
    correctAnswer: {
      type: String,
      require: true,
    },
    answers: [
      {
        answerId: {
          type: String,
          require: true,
        },
        content: {
          type: String,
          require: true,
        },
      },
    ],
    score: {
      type: Number,
      require: false,
      default: EASY_TEST_SCORE,
    },
    isDeleted: {
      type: Boolean,
      require: false,
      default: false,
    },
    deletedBy: {
      type: Schema.Types.ObjectId,
      require: false,
      default: null,
    },
    creator: {
      type: Schema.Types.ObjectId,
      require: true,
    },
  },
  {
    collection: "tests",
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

export const TestSchema = mongoose.model<ITest>("Tests", testSchema);

export interface ITestAnswer {
  _id: ObjectId;
  answerId: String;
  content: String;
}

export interface ITest {
  _id: ObjectId;
  level: ETestLevel;
  question: String;
  attachment: String;
  attachmentType: ETestAttachmentType;
  correctAnswer: String;
  answers: ITestAnswer[];
  score: number;
  isDeleted: boolean;
  deletedBy?: IUser;
  creator: IUser;
  createdDate: Date;
  updatedAt: Date;
}
