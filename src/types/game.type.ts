export enum EPlayType {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
  SIX = 6,
}

export enum IWordType {
  TEXT = "TEXT",
  IMAGE = "IMAGE",
  AUDIO = "AUDIO",
}

export interface IGameplay {
  playType: EPlayType;
}

export interface IWordInGameplay {
  id: string;
  /**
   * content may be word or media link
   * type define how content can be identify
   */
  content: string;
  type: IWordType;
}

export interface IGameplayTypeOne extends IGameplay {
  cards: IWordInGameplay[];
}

export interface IGameplayRemainTypes extends IGameplay {
  question: string;
  questionType: IWordType;
  answer: string;
  randomWords: IWordInGameplay[];
}
