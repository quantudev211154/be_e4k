"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROUND_TYPE_6_INIT_VALUE = exports.ROUND_TYPE_5_INIT_VALUE = exports.ROUND_TYPE_4_INIT_VALUE = exports.ROUND_TYPE_3_INIT_VALUE = exports.ROUND_TYPE_2_INIT_VALUE = exports.ROUND_TYPE_1_INIT_VALUE = exports.PLAY_TYPE_6_ALLOWED_MOVES = exports.PLAY_TYPE_6_SCORE = exports.PLAY_TYPE_5_SCORE = exports.PLAY_TYPE_4_SCORE = exports.PLAY_TYPE_3_SCORE = exports.PLAY_TYPE_2_SCORE = exports.PLAY_TYPE_1_ALLOWED_MOVES = exports.PLAY_TYPE_1_SCORE = exports.PLAY_TYPE_6 = exports.PLAY_TYPE_5 = exports.PLAY_TYPE_4 = exports.PLAY_TYPE_3 = exports.PLAY_TYPE_2 = exports.PLAY_TYPE_1 = void 0;
exports.PLAY_TYPE_1 = 1;
exports.PLAY_TYPE_2 = 2;
exports.PLAY_TYPE_3 = 3;
exports.PLAY_TYPE_4 = 4;
exports.PLAY_TYPE_5 = 5;
exports.PLAY_TYPE_6 = 6;
const BASE_PLAY_TYPE_SCORE = 10;
exports.PLAY_TYPE_1_SCORE = BASE_PLAY_TYPE_SCORE;
exports.PLAY_TYPE_1_ALLOWED_MOVES = 3;
exports.PLAY_TYPE_2_SCORE = BASE_PLAY_TYPE_SCORE * 2;
exports.PLAY_TYPE_3_SCORE = BASE_PLAY_TYPE_SCORE * 3;
exports.PLAY_TYPE_4_SCORE = BASE_PLAY_TYPE_SCORE * 4;
exports.PLAY_TYPE_5_SCORE = BASE_PLAY_TYPE_SCORE * 5;
exports.PLAY_TYPE_6_SCORE = BASE_PLAY_TYPE_SCORE * 6;
exports.PLAY_TYPE_6_ALLOWED_MOVES = 3;
exports.ROUND_TYPE_1_INIT_VALUE = {
    playType: exports.PLAY_TYPE_1,
    score: exports.PLAY_TYPE_1_SCORE,
    allowedMoves: exports.PLAY_TYPE_1_ALLOWED_MOVES,
    cards: [],
    totalPairs: 2,
    createdAt: new Date(),
};
exports.ROUND_TYPE_2_INIT_VALUE = {
    playType: exports.PLAY_TYPE_2,
    score: exports.PLAY_TYPE_2_SCORE,
    correctAns: "",
    question: "",
    cards: [],
    createdAt: new Date(),
};
exports.ROUND_TYPE_3_INIT_VALUE = {
    playType: exports.PLAY_TYPE_3,
    correctAns: "",
    isAudio: false,
    question: "",
    randomWords: [],
    score: exports.PLAY_TYPE_3_SCORE,
    createdAt: new Date(),
};
exports.ROUND_TYPE_4_INIT_VALUE = {
    playType: exports.PLAY_TYPE_4,
    score: exports.PLAY_TYPE_4_SCORE,
    correctAns: "",
    question: "",
    createdAt: new Date(),
};
exports.ROUND_TYPE_5_INIT_VALUE = {
    correctAns: "",
    cards: [],
    isAudio: true,
    playType: exports.PLAY_TYPE_5,
    question: "",
    score: exports.PLAY_TYPE_5_SCORE,
    createdAt: new Date(),
};
exports.ROUND_TYPE_6_INIT_VALUE = {
    playType: exports.PLAY_TYPE_6,
    score: exports.PLAY_TYPE_6_SCORE,
    cards: [],
    allowedMoves: exports.PLAY_TYPE_6_ALLOWED_MOVES,
    createdAt: new Date(),
};
