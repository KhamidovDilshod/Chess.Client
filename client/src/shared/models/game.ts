import {Color, FENChar} from "../chess-logic/model";

export interface Game {
  id: string;
  date: Date;
  players: Player[]
}

export interface Player {
  userId: string;
  gameId: string;
  color: Color
}


export type Board = (FENChar | null)[][];

export enum GameMode {
  P2P,
  Online,
  Offline
}
