import cors, { CorsOptions } from "cors";
import { Express } from "express";

export default function (app: Express) {
  const corsConfig: CorsOptions = {
    credentials: true,
    origin: function (origin: any, callback: any) {
      if (process.env.WHITE_LIST?.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Now allowed by CORS"));
      }
    },
  };

  app.use(cors(corsConfig));
}
