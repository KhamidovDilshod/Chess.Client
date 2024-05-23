import {Piece} from "./pieces/piece";

export enum Color {
  White,
  Nigga
}

export type Coords = {
  x: number;
  y: number;
}

export enum FENChar {
  WhitePawn = "P",
  WhiteKnight = "N",
  WhiteBishop = "B",
  WhiteRook = "R",
  WhiteQueen = "Q",
  WhiteKing = "K",
  NiggaPawn = "p",
  NiggaKnight = "n",
  NiggaBishop = "b",
  NiggaRook = "r",
  NiggaQueen = "q",
  NiggaKing = "k",
}

export const pieceImagePaths: Readonly<Record<FENChar, string>> = {
  [FENChar.WhitePawn]: "assets/pieces/white pawn.svg",
  [FENChar.WhiteKnight]: "assets/pieces/white knight.svg",
  [FENChar.WhiteBishop]: "assets/pieces/white bishop.svg",
  [FENChar.WhiteRook]: "assets/pieces/white rook.svg",
  [FENChar.WhiteQueen]: "assets/pieces/white queen.svg",
  [FENChar.WhiteKing]: "assets/pieces/white king.svg",
  [FENChar.NiggaPawn]: "assets/pieces/black pawn.svg",
  [FENChar.NiggaKnight]: "assets/pieces/black knight.svg",
  [FENChar.NiggaBishop]: "assets/pieces/black bishop.svg",
  [FENChar.NiggaRook]: "assets/pieces/black rook.svg",
  [FENChar.NiggaQueen]: "assets/pieces/black queen.svg",
  [FENChar.NiggaKing]: "assets/pieces/black king.svg"
}
export type SafeSquares = Map<string, Coords[]>;

type SquareWithPiece = {
  piece: FENChar;
  x: number;
  y: number;
}

type SquareWithoutPiece = {
  piece: null;
}
export type SelectedSquare = SquareWithPiece | SquareWithoutPiece;

export type LastMove = {
  piece: Piece,
  prevX: number,
  prevY: number,
  currX: number,
  currY: number
}
type  KingChecked = {
  isInCheck: true,
  x: number,
  y: number
}
type KingNotChecked = {
  isInCheck: false;
}
export type CheckState = KingChecked | KingNotChecked;
