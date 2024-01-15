import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-chess-piece',
  standalone: true,
  imports: [],
  templateUrl: './chess-piece.component.html',
  styles: `./chess-piece.component.css`
})
export class ChessPieceComponent {
  @Input() piece: string | undefined;

  get pieceSymbol(): string {
    const pieceSymbols = {
      Pawn: '♟',
      Knight: '♞',
      Bishop: '♝',
      Rook: '♜',
      Queen: '♛',
      King: '♚'
    };
    // @ts-ignore
    return pieceSymbols[this.piece?.type];
  }
}
