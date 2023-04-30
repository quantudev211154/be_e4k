import { Express } from "express";
import * as swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { sys } from ".";

export default function (app: Express) {
  const serverPort = process.env.API_PORT;
  const host = process.env.BASE_URL;

  const swaggerOptions: swaggerJSDoc.Options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "E4K API Documentation",
        version: "1.0.0",
        description:
          "API Documentation of English For Kids project of Q.Tu and C.Hieu",
      },
      servers: [
        {
          url: `${host}:${serverPort}/api`,
        },
      ],
    },
    apis: ["src/routes/*.route.ts"],
  };

  const specs = swaggerJSDoc(swaggerOptions);

  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
  sys.log(`API Docs has already on ${host}:${serverPort}/api-docs`);
}
