export interface Piece {
  type: string;
  board: Cell[][];
  color: 'white' | 'black';

  validMove(row: number, col: number): boolean;
}

export interface Cell {
  piece?: Piece;
}

export function createBoard(): Cell[][] {
  const board: Cell[][] = [];
  for (let i = 0; i < 8; i++) {
    board.push([]);
    for (let j = 0; j < 8; j++) {
      const cell: Cell = {};
      cell.piece = getStartingPiece(i, j, board);
      board[i].push(cell)
    }
  }
  return board;
}

export function getStartingPiece(row: number, col: number, board: Cell[][]) {
  const color = row <= 1 ? 'black' : 'white';

  if (row === 1 || row === 6) {
    return pawn(board, color);
  }
  if (row == 0 || row == 7) {
    switch (col) {
      case 0:
      case 7:
        return rook(board, color);
      case 1:
      case 6:
        return knight(board, color);
      case 2:
      case 5:
        return bishop(board, color);
      case 3:
        return row == 0 ?
          queen(board, color) : king(board, color);
      case 4:
        return row == 0 ?
          king(board, color) : queen(board, color);
    }
  }
  return undefined;
}

export const displayPieces: Record<string, string> = {
  'blackPawn': '♟︎',
  'blackKnight': '♞︎',
  'blackBishop': '♝︎',
  'blackRook': '♜︎',
  'blackQueen': '♛︎',
  'blackKing': '♚︎',
  'whitePawn': '♙︎',
  'whiteKnight': '♘︎',
  'whiteBishop': '♗︎',
  'whiteRook': '♖︎',
  'whiteQueen': '♕︎',
  'whiteKing': '♔︎',
}

export function pawn(board: Cell[][], color: 'white' | 'black'): Piece {
  return {
    type: 'Pawn',
    board: board,
    color: color,
    validMove(row: number, col: number): boolean {
      //TODO implement validation logic for each chess piece
      if (row === 1 || row === 6) {
        const moveDirection = color == 'white' ? 1 : -1;
        return false;
      }
      return false;
    }
  }
}

export function rook(board: Cell[][], color: 'white' | 'black'): Piece {
  return {
    type: 'Rook',
    board: board,
    color: color, validMove(row: number, col: number): boolean {
      return false;
    }
  }
}

export function knight(board: Cell[][], color: 'white' | 'black'): Piece {
  return {
    type: 'Knight',
    board: board,
    color: color, validMove(row: number, col: number): boolean {
      return false;
    }
  }
}

export function queen(board: Cell[][], color: 'white' | 'black'): Piece {
  return {
    type: 'Queen',
    board: board,
    color: color, validMove(row: number, col: number): boolean {
      return false;
    }
  }
}

export function king(board: Cell[][], color: 'white' | 'black'): Piece {
  return {
    type: 'King',
    board: board,
    color: color, validMove(row: number, col: number): boolean {
      return false;
    }
  }
}

export function bishop(board: Cell[][], color: 'white' | 'black'): Piece {
  return {
    type: 'Bishop',
    board: board,
    color: color, validMove(row: number, col: number): boolean {
      return false;
    }
  }
}

export interface Position {
  row: number;
  col: number
}
