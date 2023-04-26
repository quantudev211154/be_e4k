import mongoose from "mongoose";
import { sys } from ".";
import { DBConstant } from "../constants";

export default function () {
  mongoose
    .connect(process.env.DB_URL as string, {
      maxPoolSize: DBConstant.DB_MAX_POOL_SIZE,
      dbName: "e4k",
    })
    .then(() => {
      sys.log("Connected to Mongo Database");
    })
    .catch((err) => sys.warn(err));
}
