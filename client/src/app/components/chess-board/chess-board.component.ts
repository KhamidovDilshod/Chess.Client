import {Component} from '@angular/core';
import {ChessBoard} from "../../../shared/chess-logic/chess-board";
import {Color, Coords, FENChar, pieceImagePaths, SafeSquares, SelectedSquare} from "../../../shared/chess-logic/model";
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

  public isSquareSafeForSelectedPiece(x: number, y: number) {
    return this.pieceSafeSquares.some(coords => coords.x === x && coords.y === y);
  }

  public selectingPiece(x: number, y: number): void {
    const piece: FENChar | null = this.chessBoardView[x][y];
    if (!piece) return;
    if (this.isWrongPieceSelected(piece)) return;
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
    this.unmarkPreviouslySelectedAndSafeSquare();
  }

  private unmarkPreviouslySelectedAndSafeSquare(): void {
    this.selectedSquare = {piece: null};
    this.pieceSafeSquares = [];
  }
}
