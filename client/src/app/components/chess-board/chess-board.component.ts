import {Component} from '@angular/core';
import {ChessBoard} from "../../../shared/chess";
import {JsonPipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-chess-board',
  standalone: true,
  imports: [
    NgForOf,
    JsonPipe
  ],
  templateUrl: './chess-board.component.html',
  styleUrl: './chess-board.component.css'
})
export class ChessBoardComponent {
  chessBoard: ChessBoard = new ChessBoard();
  constructor() {
    console.log(this.chessBoard)
  }
}
