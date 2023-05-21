import mongoose, { ObjectId, Schema } from "mongoose";
import { IUser } from "./user.model";
import { ICourse } from "./course.model";

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
            rounds: [
              {
                roundId: {
                  type: String,
                  require: true,
                },
                score: {
                  type: Number,
                  require: true,
                },
                playedAt: {
                  type: Date,
                  require: false,
                  default: Date.now(),
                },
              },
            ],
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
    collection: "diaries",
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

export const DiarySchema = mongoose.model<IDiary>("Diary", diarySchema);

export interface IDiaryLessionRound {
  _id?: ObjectId;
  roundId: string;
  score: number;
  playedAt?: Date;
}

export interface IDiaryLession {
  _id?: ObjectId;
  lession: ObjectId;
  rounds: IDiaryLessionRound[];
  isCompleted: boolean;
}

export interface IDiaryCourse {
  _id: ObjectId;
  course: ICourse | string;
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
