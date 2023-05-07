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
      require: true,
    },
    level: {
      type: Number,
      require: false,
      default: null,
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
        level: {
          type: Number,
          require: false,
          default: null,
        },
        rounds: {
          type: [Object],
          require: false,
          default: [],
        },
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

/**
 * Ech object children in Array will be allocated a _id
 */
export interface ILession {
  _id: ObjectId;
  title: string;
  type: ECLRStatus;
  level: number;
  description: string;
  creator: IUser;
  rounds: any[];
}

export interface ICourse {
  _id: ObjectId;
  title: string;
  description?: string;
  creator: IUser;
  type: ECLRStatus;
  level: number;
  lessions: ILession[];
  isDeleted?: boolean;
  deletedBy?: IUser;
  createdAt: Date;
  updatedAt: Date;
}
