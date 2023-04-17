import mongoose, { ObjectId, Schema } from "mongoose";
import { ICourse } from "./course.model";

const LESSION_STANDART_SCORE = 100;

const lessionSchema = new Schema(
  {
    course: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "Course",
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
  },
  {
    collection: "lessions",
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

export const LessionSchema = mongoose.model("Lession", lessionSchema);

export interface ILession {
  _id: ObjectId;
  course: ICourse;
  description: string;
  score: number;
  createdAt: Date;
  updatedAt: Date;
}
