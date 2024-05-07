import {Color, Coords, FENChar} from "../model";
import {Piece} from "./piece";

export class King extends Piece {
    protected override _FENChar: FENChar;
    private _hasMoved: boolean = false;
    protected override _directions: Coords[] = [
        {x: 0, y: 1},
        {x: 0, y: -1},
        {x: 1, y: 0},
        {x: 1, y: -1},
        {x: 1, y: 1},
        {x: -1, y: 0},
        {x: -1, y: 1},
        {x: -1, y: -1}
    ]

    constructor(private pieceColor: Color) {
        super(pieceColor);
        this._FENChar = pieceColor == Color.White ? FENChar.WhiteKing : FENChar.NiggaKing;
    }

    public get hasMoved(): boolean {
        return this._hasMoved;
    }

    public set hasMoved(_) {
        this._hasMoved = true;
    }
}
