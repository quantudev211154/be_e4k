import { Response } from "express";
import { IUser } from "../models";
import { Secret, sign } from "jsonwebtoken";

export function createToken(type: "accessToken" | "refreshToken", user: IUser) {
  return sign(
    {
      userId: user._id,
      phone: user.phone,
      role: user.role,
      ...(type === "refreshToken" ? { tokenVersion: user.tokenVersion } : {}),
    },
    type === "accessToken"
      ? (process.env.E4K_ACCESS_TOKEN_SECRET as Secret)
      : (process.env.E4K_REFRESH_TOKEN_SECRET as Secret),
    { expiresIn: type === "accessToken" ? "1d" : "3d" }
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
      sameSite: "none",
    }
  );
}

export function removeAdminSensitiveAttributes(admin: IUser) {
  admin.password = undefined;
  admin.isDeleted = undefined;
  admin.tokenVersion = undefined;
  admin.updatedAt = undefined;
  admin.weeklyScore = undefined;
}

export function removePlayerSensitiveAttributes(player: IUser) {
  player.password = undefined;
  player.isDeleted = undefined;
  player.tokenVersion = undefined;
  player.updatedAt = undefined;
  player.role = undefined;
}
