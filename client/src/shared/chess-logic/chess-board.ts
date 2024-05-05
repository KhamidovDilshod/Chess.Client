import {Piece} from "./pieces/piece";
import {Color, FENChar} from "./model";
import {Rook} from "./pieces/rook";
import {Knight} from "./pieces/knight";
import {Bishop} from "./pieces/bishop";
import {Queen} from "./pieces/queen";
import {Pawn} from "./pieces/pawn";
import {King} from "./pieces/king";

export class ChessBoard {
    private chessBoard: (Piece | null)[][];
    private _playerColor = Color.White;

    constructor() {
        this.chessBoard = [
            [
                new Rook(Color.White), new Knight(Color.White), new Bishop(Color.White), new Queen(Color.White),
                new King(Color.White), new Bishop(Color.White), new Knight(Color.White), new Rook(Color.White)
            ],
            [
                new Pawn(Color.White), new Pawn(Color.White), new Pawn(Color.White), new Pawn(Color.White),
                new Pawn(Color.White), new Pawn(Color.White), new Pawn(Color.White), new Pawn(Color.White)
            ],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [
                new Pawn(Color.Nigga), new Pawn(Color.Nigga), new Pawn(Color.Nigga), new Pawn(Color.Nigga),
                new Pawn(Color.Nigga), new Pawn(Color.Nigga), new Pawn(Color.Nigga), new Pawn(Color.Nigga)
            ],
            [
                new Rook(Color.Nigga), new Knight(Color.Nigga), new Bishop(Color.Nigga), new Queen(Color.Nigga),
                new King(Color.Nigga), new Bishop(Color.Nigga), new Knight(Color.Nigga), new Rook(Color.Nigga)
            ],
        ];
    }

    public get playerColor(): Color {
        return this._playerColor;
    }

    public get chessBoardView(): (FENChar | null)[][] {
        return this.chessBoard.map(row =>
            row.map(piece => piece instanceof Piece ? piece?.FENChar : null)
        )
    }
}