import { Request, Response } from "express";
import { HelperUtil } from "../utils";
import { EUserRole, IUser, UserSchema } from "../models";
import { APIMessage } from "../constants";
import { removePlayerSensitiveAttributes } from "../utils/auth.util";
import {
  GOLD_FOR_BUY_3_HEARTS,
  GOLD_FOR_BUY_5_HEARTS,
  MAXIMUM_HEARTS,
  MINIMUM_HEARTS_BUY_QTY,
} from "../constants/user.constant";
import { hash, verify } from "argon2";

export async function register(req: Request, res: Response) {
  try {
    const { phone, username } = req.body;

    if (!phone || !username)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_MISSING_PARAMS);

    const existUser = await UserSchema.findOne({
      phone,
    });

    if (existUser)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_EXISTED_USER);

    const newUser = await new UserSchema({
      phone,
      username,
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

export async function findPlayerByPhone(req: Request, res: Response) {
  try {
    const phone = req.params.phone as string;

    if (!phone)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_MISSING_PARAMS);

    const existUser = await UserSchema.findOne({ phone });

    if (!existUser)
      return HelperUtil.returnErrorResult(
        res,
        APIMessage.ERR_NOT_FOUND_USER_BY_PHONE_NUMBER
      );

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

export async function updateUsernameForPlayer(req: Request, res: Response) {
  try {
    const { username, userId } = req.body;

    if (!username || !userId)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_MISSING_PARAMS);

    const existUser = await UserSchema.findById(userId);

    if (!existUser)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_NO_USER_FOUND);

    existUser.username = username;

    const updatedUser = await existUser.save();

    removePlayerSensitiveAttributes(updatedUser);

    return HelperUtil.returnSuccessfulResult(res, { updatedUser });
  } catch (error) {
    HelperUtil.returnErrorResult(res, error);
  }
}

export async function getUserInfo(req: Request, res: Response) {
  try {
    const { userId } = req.body;

    if (!userId)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_MISSING_PARAMS);

    const user = await UserSchema.findById(userId);

    if (!user)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_NO_USER_FOUND);

    removePlayerSensitiveAttributes(user);

    return HelperUtil.returnSuccessfulResult(res, { user });
  } catch (error) {
    return HelperUtil.returnErrorResult(res, error);
  }
}

export async function buyHearts(req: Request, res: Response) {
  try {
    const { userId } = req.body;
    const hearts = parseInt(req.body.hearts);

    if (!hearts || !userId)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_MISSING_PARAMS);

    const existUser = await UserSchema.findById(userId);

    if (!existUser)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_NO_USER_FOUND);

    if (existUser.hearts === 5)
      return HelperUtil.returnErrorResult(
        res,
        "Hearts of this user is hit maximum. Can not buy more."
      );

    let updatedUser;

    const userGolds = existUser.golds as number;
    const userHearts = existUser.hearts as number;

    if (hearts === MINIMUM_HEARTS_BUY_QTY) {
      if (userGolds < GOLD_FOR_BUY_3_HEARTS) {
        return HelperUtil.returnErrorResult(
          res,
          "No enough golds to buy hearts."
        );
      }

      const userUpdater = {
        hearts:
          MINIMUM_HEARTS_BUY_QTY + userHearts > MAXIMUM_HEARTS
            ? MAXIMUM_HEARTS
            : MINIMUM_HEARTS_BUY_QTY + userHearts,
        golds: userGolds - GOLD_FOR_BUY_3_HEARTS,
      };
      updatedUser = await UserSchema.findByIdAndUpdate(userId, userUpdater, {
        new: true,
      });
    } else if (hearts === MAXIMUM_HEARTS) {
      if (userGolds < GOLD_FOR_BUY_5_HEARTS)
        return HelperUtil.returnErrorResult(
          res,
          "No enough golds to buy hearts."
        );

      const userUpdater = {
        hearts: MAXIMUM_HEARTS,
        golds: userGolds - GOLD_FOR_BUY_5_HEARTS,
      };
      updatedUser = await UserSchema.findByIdAndUpdate(userId, userUpdater, {
        new: true,
      });
    }

    removePlayerSensitiveAttributes(updatedUser as IUser);

    return HelperUtil.returnSuccessfulResult(res, { updatedUser });
  } catch (error) {
    return HelperUtil.returnErrorResult(res, error);
  }
}

export async function updateGolds(req: Request, res: Response) {
  try {
    const { userId } = req.body;
    const golds = parseInt(req.body.golds);

    if (!userId || !golds)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_MISSING_PARAMS);

    const existUser = await UserSchema.findById(userId);

    if (!existUser)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_NO_USER_FOUND);

    const updater = {
      golds: existUser.golds ? existUser.golds + golds : golds,
    };
    const updatedUser = await UserSchema.findByIdAndUpdate(userId, updater, {
      new: true,
    });

    removePlayerSensitiveAttributes(updatedUser as IUser);

    return HelperUtil.returnSuccessfulResult(res, { updatedUser });
  } catch (error) {
    return HelperUtil.returnErrorResult(res, error);
  }
}

export async function getScoreboard(req: Request, res: Response) {
  try {
    const players = await UserSchema.find({
      role: EUserRole.PLAYER,
      isDeleted: false,
    })
      .select(["_id", "username", "phone", "weeklyScore", "golds", "hearts"])
      .sort({ weeklyScore: -1 });

    return HelperUtil.returnSuccessfulResult(res, { players });
  } catch (error) {
    return HelperUtil.returnErrorResult(res, error);
  }
}

export async function changePasswordForPlayer(req: Request, res: Response) {
  try {
    const { userId, oldPassword, newPassword } = req.body;

    if (!userId || !oldPassword || !newPassword)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_MISSING_PARAMS);

    const existUser = await UserSchema.findById(userId);

    if (!existUser)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_NO_USER_FOUND);

    const isValidPassword = await verify(
      existUser.password as string,
      oldPassword
    );

    if (!isValidPassword)
      return HelperUtil.returnErrorResult(
        res,
        APIMessage.ERR_OLD_PASSWORD_INCORRECT
      );

    const hashedNewPassword = await hash(newPassword);

    const updatedUser = await UserSchema.findByIdAndUpdate(
      userId,
      { password: hashedNewPassword },
      { new: true }
    );

    if (updatedUser) removePlayerSensitiveAttributes(updatedUser);

    return HelperUtil.returnSuccessfulResult(res, { updatedUser });
  } catch (error) {
    return HelperUtil.returnErrorResult(res, error);
  }
}
