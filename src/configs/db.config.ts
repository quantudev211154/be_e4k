import mongoose from "mongoose";
import { DB_MAX_POOL_SIZE } from "../constants/db.constant";
import { sys } from ".";

export default function () {
  mongoose
    .connect(process.env.DB_URL as string, {
      maxPoolSize: DB_MAX_POOL_SIZE,
      dbName: "e4k",
    })
    .then(() => {
      sys.log("Connected to Mongo Database");
    })
    .catch((err) => sys.warn(err));
}
