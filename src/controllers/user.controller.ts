import { Request, Response } from "express";
import { HelperUtil } from "../utils";
import { EUserRole, IUser, UserSchema } from "../models";
import { APIMessage } from "../constants";
import {
  removeAdminSensitiveAttributes,
  removePlayerSensitiveAttributes,
} from "../utils/auth.util";
import {
  GOLD_FOR_BUY_3_HEARTS,
  GOLD_FOR_BUY_5_HEARTS,
  MAXIMUM_HEARTS,
  MINIMUM_HEARTS_BUY_QTY,
} from "../constants/user.constant";
import { hash, verify } from "argon2";

export async function register(req: Request, res: Response) {
  try {
    const { phone, username, role } = req.body;

    if (!phone || !username || !role)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_MISSING_PARAMS);

    const existUser = await UserSchema.findOne({
      phone,
    });

    if (existUser)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_EXISTED_USER);

    const hashedPassword = await hash(phone);

    const newUser = await new UserSchema({
      phone,
      username,
      role,
      password: hashedPassword,
    }).save();

    newUser.password = undefined;

    return HelperUtil.returnSuccessfulResult(
      res,
      { newUser },
      APIMessage.SUC_NEW_USER_CREATED
    );
  } catch (error: any) {
    return HelperUtil.returnErrorResult(res, error);
  }
}

export async function findUserByPhone(req: Request, res: Response) {
  try {
    const phone = req.params.phone as string;

    if (!phone)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_MISSING_PARAMS);

    const existUser = await UserSchema.findOne({ phone });

    if (!existUser)
      return HelperUtil.returnSuccessfulResult(res, { user: null });

    existUser.password = undefined;

    return HelperUtil.returnSuccessfulResult(
      res,
      { user: existUser },
      APIMessage.SUC_NEW_USER_CREATED
    );
  } catch (error) {
    HelperUtil.returnErrorResult(res, error);
  }
}

export async function updateUserInfo(req: Request, res: Response) {
  try {
    const { phone, username, password } = req.body;

    if (!phone)
      return HelperUtil.returnErrorResult(
        res,
        APIMessage.ERR_MISSING_USER_PHONE
      );

    if (!username && !password)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_MISSING_PARAMS);

    const existUser = await UserSchema.findOne({ phone });

    if (!existUser)
      return HelperUtil.returnErrorResult(
        res,
        APIMessage.ERR_NOT_FOUND_USER_BY_PHONE_NUMBER
      );

    const updater = {
      ...(username ? { username } : {}),
      ...(password ? { password } : {}),
    };

    const updatedUser = await UserSchema.findOneAndUpdate({ phone }, updater);

    return HelperUtil.returnSuccessfulResult(
      res,
      { updatedUser },
      APIMessage.SUC_UPDATED_USER
    );
  } catch (error) {
    HelperUtil.returnErrorResult(res, error);
  }
}

export async function getAllUsers(req: Request, res: Response) {
  try {
    const userFilter = {
      $or: [{ role: EUserRole.ADMIN }, { role: EUserRole.MANAGER }],
      isDeleted: false,
    };
    const users = await UserSchema.find(userFilter).select([
      "-password",
      "-weeklyScore",
      "-tokenVersion",
      "-level",
      "-isDeleted",
      "-golds",
      "-hearts",
      "-lastClaimdDate",
      "-claimCount",
    ]);

    return HelperUtil.returnSuccessfulResult(res, { users });
  } catch (error) {
    HelperUtil.returnErrorResult(res, error);
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id)
      return HelperUtil.returnErrorResult(
        res,
        APIMessage.ERR_MISSING_USER_PHONE
      );

    const existUser = await UserSchema.findById(id);

    if (!existUser)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_NO_USER_FOUND);

    if (existUser.role !== EUserRole.ADMIN)
      return HelperUtil.returnErrorResult(
        res,
        APIMessage.ERR_USER_HAS_NO_PERMISSION
      );

    const userUpdater = {
      isDeleted: true,
    };
    const updatedUser = await UserSchema.findByIdAndUpdate(id, userUpdater, {
      new: true,
    });

    removeAdminSensitiveAttributes(updatedUser as IUser);

    return HelperUtil.returnSuccessfulResult(res, { updatedUser });
  } catch (error) {
    HelperUtil.returnErrorResult(res, error);
  }
}

export async function searchUserByNameOrPhone(req: Request, res: Response) {
  try {
    const { keyword } = req.query;

    if (!keyword)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_MISSING_PARAMS);

    const filter = {
      $and: [
        { $or: [{ role: EUserRole.ADMIN }, { role: EUserRole.MANAGER }] },
        {
          $or: [
            { phone: { $regex: ".*" + keyword + ".*", $options: "i" } },
            { username: { $regex: ".*" + keyword + ".*", $options: "i" } },
          ],
        },
      ],
    };

    const users = await UserSchema.find(filter)
      .limit(5)
      .select([
        "-password",
        "-weeklyScore",
        "-tokenVersion",
        "-level",
        "-isDeleted",
        "-golds",
        "-hearts",
        "-lastClaimdDate",
        "-claimCount",
      ]);

    return HelperUtil.returnSuccessfulResult(res, { users });
  } catch (error) {
    HelperUtil.returnErrorResult(res, error);
  }
}

export async function changePassword(req: Request, res: Response) {
  try {
    const { oldPassword, newPassword, userId } = req.body;

    if (!oldPassword || !newPassword)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_MISSING_PARAMS);

    let existUser = await UserSchema.findById(userId);

    if (!existUser)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_NO_USER_FOUND);

    const isOldPasswordValid = await verify(
      existUser.password as string,
      oldPassword
    );

    if (!isOldPasswordValid)
      return HelperUtil.returnErrorResult(res, "Old password does not match");

    const hashed = await hash(newPassword);

    const newUser = await UserSchema.findByIdAndUpdate(userId, {
      password: hashed,
    });

    removeAdminSensitiveAttributes(newUser as IUser);

    return HelperUtil.returnSuccessfulResult(res, { newUser });
  } catch (error) {
    HelperUtil.returnErrorResult(res, error);
  }
}
