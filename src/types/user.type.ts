import { IUser } from "../models";

export type TPublicUser = Pick<IUser, "_id" | "phone" | "username">;
