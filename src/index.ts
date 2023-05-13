import express from "express";
import cookieParser from "cookie-parser";
import {
  corsConfig,
  dbConfigAndConnect,
  routesConfig,
  swaggerConfig,
  sys,
} from "./configs";
import * as dotenv from "dotenv";
import { importEnglishDataToDB } from "./utils/dic.util";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

dotenv.config();

const server = app.listen(process.env.API_PORT, () => {
  sys.log(
    `API Server listening at ${process.env.BASE_URL}:${process.env.API_PORT}/api`
  );
  corsConfig(app);
  dbConfigAndConnect();
  swaggerConfig(app);
  routesConfig(app);

  importEnglishDataToDB();
});
