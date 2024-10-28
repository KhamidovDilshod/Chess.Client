import {Color, FENChar} from "../chess-logic/model";

export interface Game {
  id: string;
  date: Date;
  players: Player[]
}

export interface Player {
  userId: string;
  gameId: string | null;
  color: Color
}


export type Board = (FENChar | null)[][];

export enum GameMode {
  P2P,
  Online,
  Offline
}

export interface GameState {
  board: Board;
  color: Color;
}

export interface Move {
  id: string,
  gameId: string,
  userId: string,
  number: number,
  notation: string
}
