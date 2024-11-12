import {GameMode} from "./models/game";
import {Piece} from "./chess-logic/pieces/piece";
import {Rook} from "./chess-logic/pieces/rook";
import {Color, FENChar} from "./chess-logic/model";
import {Knight} from "./chess-logic/pieces/knight";
import {Bishop} from "./chess-logic/pieces/bishop";
import {Queen} from "./chess-logic/pieces/queen";
import {King} from "./chess-logic/pieces/king";
import {Pawn} from "./chess-logic/pieces/pawn";

export async function retry<T>(action: () => Promise<T>, maxAttempts: number = 10, delayMs: number = 300) {
  let attempts: number = 0;
  while (attempts < maxAttempts) {
    try {
      return await action();
    } catch (e) {
      attempts++;
      if (attempts < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      } else {
        throw new Error("Retry limit reached");
      }
    }
  }
  throw new Error("Retry logic reached an unexpected state.");
}

export function loadBoard(mode: GameMode, boardView: (FENChar | null)[][] = []): (Piece | null)[][] {
  switch (mode) {
    case GameMode.Offline:
      return blankBoard;
    case GameMode.P2P:
      return loadChessBoard(boardView);
    case GameMode.Online:
      return loadChessBoard(boardView);
  }
}

export function loadChessBoard(view: (FENChar | null)[][]): any {
  let result: (Piece | null)[][] = [];
  for (let i = 0; i < view.length; i++) {
    result.push([]);
    for (let j = 0; j < view[i].length; j++) {
      let char = view[i][j];
      result[i].push(charToPiece(char));
    }
  }

  return result;
}

const blankBoard = [
  [
    new Rook(Color.White), new Knight(Color.White), new Bishop(Color.White), new Queen(Color.White),
    new King(Color.White), new Bishop(Color.White), new Knight(Color.White), new Rook(Color.White)
  ],
  [
    new Pawn(Color.White), new Pawn(Color.White), new Pawn(Color.White), new Pawn(Color.White),
    new Pawn(Color.White), new Pawn(Color.White), new Pawn(Color.White), new Pawn(Color.White)
  ],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [
    new Pawn(Color.Black), new Pawn(Color.Black), new Pawn(Color.Black), new Pawn(Color.Black),
    new Pawn(Color.Black), new Pawn(Color.Black), new Pawn(Color.Black), new Pawn(Color.Black)
  ],
  [
    new Rook(Color.Black), new Knight(Color.Black), new Bishop(Color.Black), new Queen(Color.Black),
    new King(Color.Black), new Bishop(Color.Black), new Knight(Color.Black), new Rook(Color.Black)
  ],
];

function charToPiece(char: FENChar | null): Piece | null {
  switch (char) {
    case FENChar.WhiteRook :
      return new Rook(Color.White)
    case FENChar.WhiteKnight:
      return new Knight(Color.White);
    case FENChar.WhiteBishop :
      return new Bishop(Color.White);
    case FENChar.WhiteQueen:
      return new Queen(Color.White);
    case FENChar.WhiteKing:
      return new King(Color.White);
    case FENChar.WhitePawn:
      return new Pawn(Color.White);
    case FENChar.NiggaRook :
      return new Rook(Color.Black)
    case FENChar.NiggaKnight:
      return new Knight(Color.Black);
    case FENChar.NiggaBishop :
      return new Bishop(Color.Black);
    case FENChar.NiggaQueen:
      return new Queen(Color.Black);
    case FENChar.NiggaKing:
      return new King(Color.Black);
    case FENChar.NiggaPawn:
      return new Pawn(Color.Black)
    default:
      return null;
  }
}
