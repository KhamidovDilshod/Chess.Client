import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
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
import {JsonPipe, NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {Piece} from "../../../shared/chess-logic/pieces/piece";
import {GameMode, Moved} from "../../../shared/models/game";
import {NzSpinComponent} from "ng-zorro-antd/spin";
import {HubService} from "../../../shared/services/hub.service";
import {SocketConstants} from "../../../shared/constants/socketConstants";
import {PlayerService} from "../../../shared/services/player.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'chess-board',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    NgIf,
    NgOptimizedImage,
    JsonPipe,
    NzSpinComponent
  ],
  templateUrl: './chess-board.component.html',
  styleUrl: './chess-board.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})

export class ChessBoardComponent implements OnInit, OnDestroy {
  private _chessBoard!: ChessBoard;
  private _mode: GameMode | undefined;
  public pieceImagePaths = pieceImagePaths;
  private selectedSquare: SelectedSquare = {piece: null};
  private pieceSafeSquares: Coords[] = [];
  private lastMove: LastMove | undefined;
  private checkState!: CheckState;
  isReady: boolean = false;
  private connection$: Subscription | undefined = undefined;

  constructor(private cdr:ChangeDetectorRef,private hub: HubService, private playerService: PlayerService) {
    this.connection$ = this.hub.connectMethod<Moved>(SocketConstants.MOVED)
      .subscribe(res => {
        if (res) {
          console.log(res);
          this._chessBoard.move(res.prevX,res.prevY,res.newX,res.newY);
          console.log(this.chessBoardView);
          this.cdr.detectChanges();
        }
      })
  }

  ngOnInit(): void {
  }

  @Input() set mode(value: GameMode) {
    this._mode = value;
  }

  @Input() set state(value: any) {
    if (this._mode != null) {
      this._chessBoard = new ChessBoard(this._mode, this.playerService.getCurrentPlayer()?.color ?? Color.White, value);
      this.isReady = true;
      this.checkState = this._chessBoard.checkState;
    } else {
      throw new Error('Failed to load board');
    }
  }

  public get chessBoardView(): (FENChar | null)[][] {
    return this._chessBoard.chessBoardView;
  }

  public get playerColor(): Color {
    return this._chessBoard.playerColor;
  }

  public get safeSquares(): SafeSquares {
    return this._chessBoard.safeSquares;
  }

  public isSquareDark(x: number, y: number): boolean {
    return ChessBoard.isSquareDark(x, y);
  }

  public get attackedPieces(): Piece[] {
    return this._chessBoard.attackedPieces;
  }

  public isSquareSelected(x: number, y: number): boolean {
    if (!this.selectedSquare.piece) return false;
    return this.selectedSquare.x === x && this.selectedSquare.y === y;
  }

  public isSquareLastMove(x: number, y: number): boolean {
    if (!this.lastMove) return false;
    const {prevX, prevY, currX, currY} = this.lastMove;
    return x === prevX && y === prevY || x === currX && y === currY;
  }

  public isSquareChecked(x: number, y: number): boolean {
    return this.checkState.isInCheck && this.checkState.x === x && this.checkState.y === y;
  }

  public isSquareSafeForSelectedPiece(x: number, y: number): boolean {
    return this.pieceSafeSquares.some(coords => coords.x === x && coords.y === y);
  }

  public selectingPiece(x: number, y: number): void {
    const piece = this.chessBoardView[x][y];
    if (!piece || this.isWrongPieceSelected(piece)) return;
    if (this.isSameSquareClicked(x, y)) {
      this.resetSelection();
      return;
    }

    this.updateSelection(piece, x, y);
    this.highlightSafeSquares(x, y);
  }

  private isSameSquareClicked(x: number, y: number): boolean | null {
    return this.selectedSquare.piece && this.selectedSquare.x === x && this.selectedSquare.y === y;
  }

  private resetSelection(): void {
    this.selectedSquare = {piece: null};
    this.pieceSafeSquares = [];
  }

  private updateSelection(piece: FENChar, x: number, y: number): void {
    this.selectedSquare = {piece, x, y};
  }

  private highlightSafeSquares(x: number, y: number): void {
    this.pieceSafeSquares = this.safeSquares.get(`${x},${y}`) || [];
  }

  public move(x: number, y: number) {
    this.selectingPiece(x, y);
    this.placingPiece(x, y);
  }

  private isWrongPieceSelected(piece: FENChar): boolean {
    const isWhitePieceSelected: boolean = piece === piece.toUpperCase();
    return isWhitePieceSelected && this.playerColor == Color.Black || !isWhitePieceSelected && this.playerColor == Color.White;
  }

  private placingPiece(newX: number, newY: number): void {
    if (!this.selectedSquare.piece) return;
    if (!this.isSquareSafeForSelectedPiece(newX, newY)) return;

    const {x: prevX, y: prevY} = this.selectedSquare;
    this._chessBoard.move(prevX, prevY, newX, newY);
    this.unmarkPreviouslySelectedAndSafeSquare();

    const request: Moved = {player: this.playerService.getCurrentPlayer(), prevX, prevY, newX, newY}

    this.hub.sendMethod<ChessBoard>(SocketConstants.MOVE, request).finally();
  }

  private unmarkPreviouslySelectedAndSafeSquare(): void {
    this.selectedSquare = {piece: null};
    this.pieceSafeSquares = [];
  }

  protected readonly Color = Color;

  trackByRow(index: number, item: (FENChar | null)[]): number {
    return index;
  }

  trackByPiece(index: number, item: FENChar | null): number {
    return index
  }

  ngOnDestroy(): void {
    this.connection$?.unsubscribe();
  }
}
