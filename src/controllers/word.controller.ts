import { Request, Response } from "express";
import { HelperUtil } from "../utils";
import { WordSchema } from "../models";
import { APIMessage } from "../constants";

export async function getAllWords(req: Request, res: Response) {
  try {
    const words = await WordSchema.find({});

    return HelperUtil.returnSuccessfulResult(res, { words });
  } catch (error) {
    return HelperUtil.returnErrorResult(res, error);
  }
}

export async function addNewWord(req: Request, res: Response) {
  try {
    const { engVer, vieVers, images, audios, userId } = req.body;

    if (!engVer || !vieVers || vieVers.length === 0)
      return HelperUtil.returnErrorResult(res, APIMessage.ERR_MISSING_PARAMS);

    const newWord = await new WordSchema({
      engVer,
      vieVers,
      creator: userId,
      ...(images ? { images } : {}),
      ...(audios ? { audios } : {}),
    }).save();

    return HelperUtil.returnSuccessfulResult(res, { newWord });
  } catch (error) {
    return HelperUtil.returnErrorResult(res, error);
  }
}
