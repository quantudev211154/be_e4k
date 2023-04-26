import { Response } from "express";
import { IUser } from "../models";
import { Secret, sign } from "jsonwebtoken";

export function createToken(type: "accessToken" | "refreshToken", user: IUser) {
  return sign(
    {
      userId: user._id,
      ...(type === "refreshToken" ? { tokenVersion: user.tokenVersion } : {}),
    },
    type === "accessToken"
      ? (process.env.E4K_ACCESS_TOKEN_SECRET as Secret)
      : (process.env.E4K_REFRESH_TOKEN_SECRET as Secret),
    { expiresIn: type === "accessToken" ? "30min" : "3d" }
  );
}

export function sendRefreshToken(res: Response, user: IUser) {
  return res.cookie(
    process.env.E4K_REFRESH_TOKEN_NAME as string,
    createToken("refreshToken", user),
    {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    }
  );
}
