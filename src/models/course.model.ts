import mongoose, { ObjectId, Schema } from "mongoose";
import { IUser } from "./user.model";
import { CourseConstant } from "../constants";

//round : score , 10, 15, 20
//reward

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
            score: {
              type: Number,
              require: false,
              default: CourseConstant.LESSION_STANDART_SCORE,
            },
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

export interface IRound {
  _id: ObjectId;
  title: string;
  playType: CourseConstant.ERoundPlayType;
  score: number;
}

/**
 * Ech object children in Array will be allocated a _id
 */
export interface ILession {
  _id: ObjectId;
  title: string;
  description: string;
  creator: IUser;
  rounds: IRound[];
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
