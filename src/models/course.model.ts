import mongoose, { ObjectId, Schema } from "mongoose";
import { IUser } from "./user.model";
import { CourseConstant } from "../constants";
import { IWord } from "./word.model";

/**
 * Course, lession and round status use one enum (same properties): Published (player can play) or draft
 */
export enum ECLRStatus {
  PUBLISHED = "PUBLISHED",
  DRAFT = "DRAFT",
}

const courseSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: false,
      default: "",
    },
    creator: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    type: {
      type: String,
      enum: ECLRStatus,
      require: false,
      default: ECLRStatus.DRAFT,
    },
    lessions: [
      {
        title: {
          type: String,
          require: false,
          default: "",
        },
        description: {
          type: String,
          require: false,
          default: "",
        },
        type: {
          type: String,
          enum: ECLRStatus,
          require: false,
          default: ECLRStatus.DRAFT,
        },
        rounds: [
          {
            title: {
              type: String,
              require: true,
            },
            playType: {
              type: Number,
              require: true,
              enum: CourseConstant.ERoundPlayType,
            },
            type: {
              type: String,
              enum: ECLRStatus,
              require: false,
              default: ECLRStatus.DRAFT,
            },
            score: {
              type: Number,
              require: false,
              default: CourseConstant.LESSION_STANDART_SCORE,
            },
            audio: [
              {
                url: {
                  type: String,
                  require: true,
                },
              },
            ],
            images: [
              {
                url: {
                  type: String,
                  require: true,
                },
              },
            ],
            word: [
              {
                content: {
                  type: String,
                  require: true,
                },
                word: {
                  type: Schema.Types.ObjectId,
                  require: true,
                  ref: "Word",
                },
              },
            ],
          },
        ],
        creator: {
          type: Schema.Types.ObjectId,
          require: true,
          ref: "User",
        },
      },
    ],
    isDeleted: {
      type: Boolean,
      require: false,
      default: false,
    },
    deletedBy: {
      type: Schema.Types.ObjectId,
      require: false,
      ref: "User",
      default: null,
    },
  },
  {
    collection: "courses",
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

export const CourseSchema = mongoose.model<ICourse>("Course", courseSchema);

export interface IRoundAudio {
  _id: ObjectId;
  url: string;
}

export interface IRoundImage {
  _id: ObjectId;
  url: string;
}

export interface IRoundWord {
  _id: ObjectId;
  content: string;
  word: IWord;
}

export interface IRound {
  _id: ObjectId;
  title: string;
  type: ECLRStatus;
  playType: CourseConstant.ERoundPlayType;
  score: number;
  audio: IRoundAudio[];
  images: IRoundImage[];
  words: IRoundWord[];
}

/**
 * Ech object children in Array will be allocated a _id
 */
export interface ILession {
  _id: ObjectId;
  title: string;
  type: ECLRStatus;
  description: string;
  creator: IUser;
  rounds: IRound[];
}

export interface ICourse {
  _id: ObjectId;
  title: string;
  description?: string;
  creator: IUser;
  type: ECLRStatus;
  lessions: ILession[];
  isDeleted?: boolean;
  deletedBy?: IUser;
  createdAt: Date;
  updatedAt: Date;
}
