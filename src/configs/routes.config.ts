import { Express, Request, Response } from "express";
import {
  AuthRouter,
  CourseRouter,
  DiaryRouter,
  LessionRouter,
  RoundRouter,
  TestRouter,
  UserRouter,
  WordRouter,
} from "../routes";

export default function (app: Express) {
  app.use("/api/auth", AuthRouter);
  app.use("/api/course", CourseRouter);
  app.use("/api/lession", LessionRouter);
  app.use("/api/round", RoundRouter);
  app.use("/api/diary", DiaryRouter);
  app.use("/api/user", UserRouter);
  app.use("/api/word", WordRouter);
  app.use("/api/test", TestRouter);
  app.use("/api", (req: Request, res: Response) => {
    return res.send(`<center><h1>Welcome to E4K back-end</h1></center>`);
  });

  app.use("*", (req: Request, res: Response) => {
    return res
      .status(404)
      .send(
        `<center><h1>ERROR 404: URL" ${req.originalUrl}" not found</h1></center>`
      );
  });
}
