export enum ChessType {
  Pawn,
  Knight,
  Bishop,
  Rook,
  Queen,
  King
}

export class ChessPiece {
  constructor(public type: string, public color: string) {
  }
}

export class ChessSquare {
  piece: ChessPiece | null = null;
}

export class ChessBoard {
  public squares: ChessSquare[][] = [];

  constructor() {
    for (let row = 0; row < 8; row++) {
      this.squares[row] = [];
      for (let col = 0; col < 8; col++) {
        this.squares[row][col] = new ChessSquare();
      }
    }
  }
}

export class ChessPlayer {
  capturedPieces: ChessPiece[] = [];
  moveHistory: string[] = [];

  constructor(public name: string, public color: string) {
  }

  move(move: string) {
    this.moveHistory.push(move);
  }

  capturePiece(piece: ChessPiece) {
    this.capturedPieces.push(piece);
  }
}
