export interface IBaseRound {
  playType: number;
  score: number;
}

export interface IBaseCard {
  cardId: string; // unique
}

/**
 * ROUND TYPE 1
 */

export interface IType1Card extends IBaseCard {
  pairId: string; // at least two card must have the same pairId
  imageUrl: string;
  word: string;
}

export interface IRoundType1 extends IBaseRound {
  cards: IType1Card[];
  totalPairs: number;
  allowedMoves: number; // BE defines this prop
}

/**
 * ROUND TYPE 2
 */

export interface IType2Card extends IBaseCard {
  imageUrl: string;
  word: string;
}

export interface IRoundType2 extends IBaseRound {
  question: string; // may be english, vietnamese, audio,
  correctAns: string;
  cards: IType2Card[];
}

/**
 * ROUND TYPE 3
 */

export interface IRoundType3 extends IBaseRound {
  question: string; // may be english, vietnamese, audio
  isAudio: boolean;
  correctAns: string; //
  randomWords: string[];
}

/**
 * ROUND TYPE 4
 */

export interface IRoundType4 extends IBaseRound {
  question: string; // has 1 unfill position
  isAudio: boolean;
  correctAns: string;
}

/**
 * ROUND TYPE 5
 */

export interface IType5Card extends IBaseCard {
  word: string;
}

export interface IRoundType5 extends IBaseRound {
  question: string; // only ENGLISH audio
  isAudio: boolean;
  correctAns: string;
  cards: IType5Card[];
}

/**
 * ROUND TYPE 6
 */

export interface IType6Card extends IBaseCard {
  answer: string; // may be english word, vietnamese word or ENGLISH audio
  isAudio: boolean;
  pairId: string;
}

export interface IRoundType6 extends IBaseRound {
  cards: IType6Card[]; // even position: isAudio = false, odd position: isAudio = true
}
