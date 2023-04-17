import { Express, Request, Response } from "express";

export default function (app: Express) {
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
