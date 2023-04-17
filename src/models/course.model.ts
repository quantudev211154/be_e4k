import mongoose, { ObjectId, Schema } from "mongoose";
import { IUser } from "./user.model";

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
  },
  {
    collection: "courses",
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

export const CourseSchema = mongoose.model("Course", courseSchema);

export interface ICourse {
  _id: ObjectId;
  title: string;
  description?: string;
  creator: IUser;
  createdAt: Date;
  updatedAt: Date;
}
