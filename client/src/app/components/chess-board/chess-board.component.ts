import {Component} from '@angular/core';
import {JsonPipe, NgForOf} from "@angular/common";
import {Cell, createBoard, displayPieces, Piece, Position} from "../../../shared/chess";
import {CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-chess-board',
  standalone: true,
  imports: [
    NgForOf,
    JsonPipe,
    CdkDrag,
    CdkDropList,
    CdkDropListGroup
  ],
  templateUrl: './chess-board.component.html',
  styleUrl: './chess-board.component.css'
})
export class ChessBoardComponent {
  board: Cell[][] = createBoard();

  constructor() {

    console.log(createBoard())
  }

  displayPieces(row: number, col: number): string {
    const p = this.board[row][col].piece;
    return p ? displayPieces[`${p?.color}${p?.type}`] : '';
  }

  getPieceColor(row: number, col: number) {
    return this.board[row][col].piece?.color;
  }

  move(event: CdkDragDrop<any, Position, Position>) {
    const oldPos = event.item.data;
    const newPos = event.container.data;

    const piece = this.board[oldPos.row][oldPos.col];

    if (piece.piece?.validMove(newPos.row, newPos.col)) {
      this.board[oldPos.row][oldPos.col] = {};
      this.board[newPos.row][newPos.col] = piece;
    }
  }
}
