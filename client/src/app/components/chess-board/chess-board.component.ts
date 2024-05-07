import {Component} from '@angular/core';
import {ChessBoard} from "../../../shared/chess-logic/chess-board";
import {Color, Coords, FENChar, pieceImagePaths, SelectedSquare} from "../../../shared/chess-logic/model";
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
    private pieceSageSquares: Coords[] = [];

    public get playerColor(): Color {
        return this.chessBoard.playerColor;
    }

    public isSquareDark(x: number, y: number): boolean {
        return ChessBoard.isSquareDark(x, y);
    }

    public selectingPiece(x: number, y: number): void {
        const piece: FENChar | null = this.chessBoardView[x][y];
        if (!piece) return;
        this.selectedSquare = {piece, x, y};
    }
}
