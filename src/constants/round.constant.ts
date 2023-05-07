import { IRoundType1 } from "../types";

export const PLAY_TYPE_1 = 1;
export const PLAY_TYPE_2 = 2;
export const PLAY_TYPE_3 = 3;
export const PLAY_TYPE_4 = 4;
export const PLAY_TYPE_5 = 5;
export const PLAY_TYPE_6 = 6;

const BASE_PLAY_TYPE_SCORE = 10;

export const PLAY_TYPE_1_SCORE = BASE_PLAY_TYPE_SCORE;
export const PLAY_TYPE_1_ALLOWED_MOVES = 3;

export const PLAY_TYPE_2_SCORE = BASE_PLAY_TYPE_SCORE * 2;
export const PLAY_TYPE_3_SCORE = BASE_PLAY_TYPE_SCORE * 3;
export const PLAY_TYPE_4_SCORE = BASE_PLAY_TYPE_SCORE * 4;
export const PLAY_TYPE_5_SCORE = BASE_PLAY_TYPE_SCORE * 5;
export const PLAY_TYPE_6_SCORE = BASE_PLAY_TYPE_SCORE * 6;

export const ROUND_TYPE_1_INIT_VALUE: IRoundType1 = {
  playType: PLAY_TYPE_1,
  score: PLAY_TYPE_1_SCORE,
  allowedMoves: PLAY_TYPE_1_ALLOWED_MOVES,
  cards: [],
  totalPairs: 2,
};
