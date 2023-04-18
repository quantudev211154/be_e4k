import mongoose, { ObjectId, Schema } from "mongoose";
import { IUser } from "./user.model";

const LESSION_STANDART_SCORE = 100;

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
        score: {
          type: Number,
          require: false,
          default: LESSION_STANDART_SCORE,
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

export const CourseSchema = mongoose.model("Course", courseSchema);

/**
 * Ech object children in Array will be allocated a _id
 */
export interface ILession {
  _id: ObjectId;
  title: string;
  description: string;
  score: number;
  creator: IUser;
}

export interface ICourse {
  _id: ObjectId;
  title: string;
  description?: string;
  creator: IUser;
  lessions: ILession[];
  isDeleted?: boolean;
  deletedBy?: IUser;
  createdAt: Date;
  updatedAt: Date;
}
