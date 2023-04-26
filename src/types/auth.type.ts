import { JwtPayload } from "jsonwebtoken";

export type TAuthPayload = JwtPayload & {
  userId: string;
  phone: string;
  tokenVersion: number;
};
