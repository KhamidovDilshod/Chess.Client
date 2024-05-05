import {Component} from '@angular/core';
import {ChessBoard} from "../../../shared/chess-logic/chess-board";
import {Color, FENChar} from "../../../shared/chess-logic/model";
import {NgForOf} from "@angular/common";

@Component({
    selector: 'app-chess-board',
    standalone: true,
    imports: [
        NgForOf
    ],
    templateUrl: './chess-board.component.html',
    styleUrl: './chess-board.component.css'
})
export class ChessBoardComponent {
    private chessBoard = new ChessBoard();
    public chessBoardView: (FENChar | null)[][] = this.chessBoard.chessBoardView;

    public get playerColor(): Color {
        return this.chessBoard.playerColor;
    }
}
