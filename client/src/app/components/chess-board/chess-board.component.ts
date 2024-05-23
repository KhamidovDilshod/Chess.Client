import {Component} from '@angular/core';
import {ChessBoard} from "../../../shared/chess-logic/chess-board";
import {
  CheckState,
  Color,
  Coords,
  FENChar,
  LastMove,
  pieceImagePaths,
  SafeSquares,
  SelectedSquare
} from "../../../shared/chess-logic/model";
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-chess-board',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    NgIf,
    NgOptimizedImage
  ],
  templateUrl: './chess-board.component.html',
  styleUrl: './chess-board.component.css'
})
export class ChessBoardComponent {
  private chessBoard = new ChessBoard();
  public chessBoardView: (FENChar | null)[][] = this.chessBoard.chessBoardView;
  public pieceImagePaths = pieceImagePaths;
  private selectedSquare: SelectedSquare = {piece: null};
  private pieceSafeSquares: Coords[] = [];
  private lastMove: LastMove | undefined = this.chessBoard.lastMove;
  private checkState: CheckState = this.chessBoard.checkState;

  public get playerColor(): Color {
    return this.chessBoard.playerColor;
  }

  public get safeSquares(): SafeSquares {
    return this.chessBoard.safeSquares;
  }

  public isSquareDark(x: number, y: number): boolean {
    return ChessBoard.isSquareDark(x, y);
  }

  public isSquareSelected(x: number, y: number): boolean {
    if (!this.selectedSquare.piece) return false;
    return this.selectedSquare.x === x && this.selectedSquare.y === y;
  }

  public isSquareLastMove(x: number, y: number) {
    if (!this.lastMove) return false;
    const {prevX, prevY, currX, currY} = this.lastMove;
    return x === prevX && y === prevY || x === currX && y == currY;
  }

  public isSquareChecked(x: number, y: number): boolean {
    return this.checkState.isInCheck && this.checkState.x === x && this.checkState.y === y;
  }

  public isSquareSafeForSelectedPiece(x: number, y: number) {
    return this.pieceSafeSquares.some(coords => coords.x === x && coords.y === y);
  }

  public selectingPiece(x: number, y: number): void {
    const piece: FENChar | null = this.chessBoardView[x][y];
    if (!piece) return;
    if (this.isWrongPieceSelected(piece)) return;

    const isSameSquaresClicked: boolean = !!this.selectedSquare.piece &&
      this.selectedSquare.x == x && this.selectedSquare.y == y;
    this.unmarkPreviouslySelectedAndSafeSquare();
    if (isSameSquaresClicked) return;

    this.selectedSquare = {piece, x, y};
    this.pieceSafeSquares = this.safeSquares.get(x + "," + y) || [];
  }

  public move(x: number, y: number) {
    this.selectingPiece(x, y);
    this.placingPiece(x, y);
  }

  private isWrongPieceSelected(piece: FENChar): boolean {
    const isWhitePieceSelected: boolean = piece === piece.toUpperCase();
    return isWhitePieceSelected && this.playerColor == Color.Nigga || !isWhitePieceSelected && this.playerColor == Color.White;
  }

  private placingPiece(newX: number, newY: number): void {
    if (!this.selectedSquare.piece) return;
    if (!this.isSquareSafeForSelectedPiece(newX, newY)) return;

    const {x: prevX, y: prevY} = this.selectedSquare;
    this.chessBoard.move(prevX, prevY, newX, newY);
    this.chessBoardView = this.chessBoard.chessBoardView;

    this.checkState = this.chessBoard.checkState;
    this.lastMove = this.chessBoard.lastMove;

    this.unmarkPreviouslySelectedAndSafeSquare();
  }

  private unmarkPreviouslySelectedAndSafeSquare(): void {
    this.selectedSquare = {piece: null};
    this.pieceSafeSquares = [];
  }
}
