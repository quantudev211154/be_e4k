import {
  IRoundType1,
  IRoundType2,
  IRoundType3,
  IRoundType4,
  IRoundType5,
} from "../types";

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

export const ROUND_TYPE_2_INIT_VALUE: IRoundType2 = {
  playType: PLAY_TYPE_2,
  score: PLAY_TYPE_2_SCORE,
  correctAns: "",
  question: "",
  cards: [],
};

export const ROUND_TYPE_3_INIT_VALUE: IRoundType3 = {
  playType: PLAY_TYPE_3,
  correctAns: "",
  isAudio: false,
  question: "",
  randomWords: [],
  score: PLAY_TYPE_3_SCORE,
};

export const ROUND_TYPE_4_INIT_VALUE: IRoundType4 = {
  playType: PLAY_TYPE_4,
  score: PLAY_TYPE_4_SCORE,
  correctAns: "",
  question: "",
};

export const ROUND_TYPE_5_INIT_VALUE: IRoundType5 = {
  correctAns: "",
  cards: [],
  isAudio: true,
  playType: PLAY_TYPE_5,
  question: "",
  score: PLAY_TYPE_5_SCORE,
};
