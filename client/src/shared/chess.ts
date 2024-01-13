export enum ChessType {
  Pawn = "Pawn",
  Knight = "Knight",
  Bishop = "Bishop",
  Rook = "Rook",
  Queen = "Queen",
  King = "King"
}

export class ChessPiece {
  constructor(public type: ChessType, public color: string) {
  }
}

export class ChessSquare {
  piece: ChessPiece | null = null;

  constructor() {
  }
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
    this.initializeBoard();
  }

  private initializeBoard() {
    // Initial setup for a standard chessboard
    this.placePiece(0, 0, new ChessPiece(ChessType.Rook, 'white'));
    this.placePiece(0, 1, new ChessPiece(ChessType.Knight, 'white'));
    this.placePiece(0, 2, new ChessPiece(ChessType.Bishop, 'white'));
    this.placePiece(0, 3, new ChessPiece(ChessType.Queen, 'white'));
    this.placePiece(0, 4, new ChessPiece(ChessType.King, 'white'));
    this.placePiece(0, 5, new ChessPiece(ChessType.Bishop, 'white'));
    this.placePiece(0, 6, new ChessPiece(ChessType.Knight, 'white'));
    this.placePiece(0, 7, new ChessPiece(ChessType.Rook, 'white'));

    for (let col = 0; col < 8; col++) {
      this.placePiece(1, col, new ChessPiece(ChessType.Pawn, 'white'));
    }

    for (let row = 2; row < 6; row++) {
      for (let col = 0; col < 8; col++) {
        this.squares[row][col] = new ChessSquare();
      }
    }

    for (let col = 0; col < 8; col++) {
      this.placePiece(6, col, new ChessPiece(ChessType.Pawn, 'black'));
    }

    this.placePiece(7, 0, new ChessPiece(ChessType.Rook, 'black'));
    this.placePiece(7, 1, new ChessPiece(ChessType.Knight, 'black'));
    this.placePiece(7, 2, new ChessPiece(ChessType.Bishop, 'black'));
    this.placePiece(7, 3, new ChessPiece(ChessType.Queen, 'black'));
    this.placePiece(7, 4, new ChessPiece(ChessType.King, 'black'));
    this.placePiece(7, 5, new ChessPiece(ChessType.Bishop, 'black'));
    this.placePiece(7, 6, new ChessPiece(ChessType.Knight, 'black'));
    this.placePiece(7, 7, new ChessPiece(ChessType.Rook, 'black'));
  }

  private placePiece(row: number, col: number, piece: ChessPiece) {
    this.squares[row][col] = new ChessSquare();
    this.squares[row][col].piece = piece;
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
