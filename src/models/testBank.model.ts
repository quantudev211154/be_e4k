import mongoose, { ObjectId, Schema } from "mongoose";
import { IUser } from "./user.model";

const testBankSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      require: true,
    },
    round: {
      type: Object,
      require: true,
    },
  },
  {
    collection: "test-bank",
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

export const TestBankSchema = mongoose.model<ITestBank>(
  "TestBank",
  testBankSchema
);

export interface ITestBank {
  _id: ObjectId;
  creator: IUser;
  round: any;
  createdDate: Date;
  updatedAt: Date;
}
