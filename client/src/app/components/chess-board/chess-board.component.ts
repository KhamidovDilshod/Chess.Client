import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
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
import {GameMode, Player} from "../../../shared/models/game";
import {NzSpinComponent} from "ng-zorro-antd/spin";
import {HubService} from "../../../shared/services/hub.service";
import {SocketConstants} from "../../../shared/constants/socketConstants";
import {PlayerService} from "../../../shared/services/player.service";

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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChessBoardComponent implements OnInit {
  private _chessBoard!: ChessBoard;
  private _mode: GameMode | null = null;
  public pieceImagePaths = pieceImagePaths;
  private selectedSquare: SelectedSquare = {piece: null};
  private pieceSafeSquares: Coords[] = [];
  private lastMove: LastMove | undefined;
  private checkState!: CheckState;
  isReady: boolean = false;
  _player!: Player;

  constructor(private cdr: ChangeDetectorRef, private hub: HubService, private playerService: PlayerService) {
    this.hub.connectMethod<ChessBoard>(SocketConstants.MOVED)
      .subscribe(res => {
        if (res) {
          this._chessBoard = res;
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
      console.log(this.playerService.getCurrentPlayer())
      this._chessBoard = new ChessBoard(this._mode, this.playerService.getCurrentPlayer()?.color ?? Color.White, value);
      this.cdr.detectChanges();
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
    const piece: FENChar | null = this.chessBoardView[x][y];
    if (!piece) return;
    if (this.isWrongPieceSelected(piece)) return;

    const isSameSquaresClicked: boolean = !!this.selectedSquare.piece &&
      this.selectedSquare.x == x && this.selectedSquare.y == y;
    this.unmarkPreviouslySelectedAndSafeSquare();
    if (isSameSquaresClicked) return;

    this.selectedSquare = {piece, x, y};
    this.pieceSafeSquares = this.safeSquares.get(x + ',' + y) || [];
    this.cdr.detectChanges();
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
    this._chessBoard.move(prevX, prevY, newX, newY);
    this.cdr.detectChanges();
    this.unmarkPreviouslySelectedAndSafeSquare();

    const request = {player: {...this.playerService.getCurrentPlayer()}, prevX, prevY, newX, newY}

    this.hub.sendMethod<ChessBoard>(SocketConstants.MOVE, request).finally();
  }

  private unmarkPreviouslySelectedAndSafeSquare(): void {
    this.selectedSquare = {piece: null};
    this.pieceSafeSquares = [];
    this.cdr.detectChanges();
  }

  protected readonly Color = Color;
}
