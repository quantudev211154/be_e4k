import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AuthType } from "../types";
import { HelperUtil } from "../utils";
import { UserSchema } from "../models";
import { APIMessage } from "../constants";

export async function checkAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return HelperUtil.returnUnauthorizedResult(
      res,
      APIMessage.ERR_AUTH_TOKEN_NOT_FOUND
    );

  try {
    const { userId, phone } = verify(
      token,
      process.env.E4K_ACCESS_TOKEN_SECRET as string
    ) as AuthType.TAuthPayload;

    const existUser = await UserSchema.findById(userId);

    if (!existUser || existUser.phone !== phone)
      return HelperUtil.returnUnauthorizedResult(res);

    req.body.userId = userId;

    return next();
  } catch (error) {
    console.log(error);
    return HelperUtil.returnUnauthorizedResult(res);
  }
}
