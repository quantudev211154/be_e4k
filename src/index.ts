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
import { UserScheduled } from "./schedule";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

dotenv.config();

const PORT = process.env.PORT || process.env.API_PORT;
const URL = process.env.URL || process.env.BASE_URL;

const server = app.listen(PORT, () => {
  sys.log(`API Server listening at ${URL}:${PORT}/api`);
  corsConfig(app);
  dbConfigAndConnect();
  swaggerConfig(app);
  routesConfig(app);

  UserScheduled.resetUserScroreAndClaimCount();
});
