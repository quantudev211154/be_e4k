import mongoose, { ObjectId, Schema } from "mongoose";
import { IUser } from "./user.model";
import { ICourse, ILession } from "./course.model";

const diarySchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    courses: [
      {
        course: {
          type: Schema.Types.ObjectId,
          require: true,
          ref: "Course",
        },
        isCompleted: {
          type: Boolean,
          require: false,
          default: false,
        },
        lessions: [
          {
            lession: {
              type: Schema.Types.ObjectId,
              require: true,
            },
            rounds: {
              type: [Schema.Types.ObjectId],
              require: false,
              default: [],
            },
            isCompleted: {
              type: Boolean,
              require: false,
              default: false,
            },
          },
        ],
      },
    ],
  },
  {
    collection: "diarys",
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

export const DiarySchema = mongoose.model<IDiary>("Diary", diarySchema);

export interface IDiaryLession {
  _id: ObjectId;
  lession: ObjectId;
  rounds: ObjectId[];
  score: number;
  isCompleted: false;
}

export interface IDiaryCourse {
  _id: ObjectId;
  course: ICourse;
  isCompleted: boolean;
  lessions: IDiaryLession[];
}

export interface IDiary {
  _id: ObjectId;
  user: IUser;
  courses: IDiaryCourse[];
  createdAt: Date;
  updatedAt: Date;
}
