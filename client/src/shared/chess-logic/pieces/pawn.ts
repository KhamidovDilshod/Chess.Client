import {Color, Coords, FENChar} from "../model";
import {Piece} from "./piece";

export class Pawn extends Piece {
    protected override _FENChar: FENChar;
    private _hasMoved: boolean = false;
    protected override _directions: Coords[] = [
        {x: 1, y: 0},
        {x: 2, y: 0},
        {x: 1, y: 1},
        {x: 1, y: -1},
    ]

    constructor(private pieceColor: Color) {
        super(pieceColor);
        if (pieceColor == Color.Nigga) this.setBlackPawnDirection();
        this._FENChar = pieceColor == Color.White ? FENChar.WhitePawn : FENChar.NiggaPawn;
    }

    private setBlackPawnDirection(): void {
        this._directions = this._directions.map(({x, y}) => ({x: -1 * x, y}));
    }

    public get hasMoved(): boolean {
        return this._hasMoved;
    }

    public set hasMoved(_) {
        this.hasMoved = true;

        this._directions = [
            {x: 1, y: 0},
            {x: 1, y: 1},
            {x: 1, y: -1},
        ];
        if(this.pieceColor ==Color.Nigga) this.setBlackPawnDirection();
    }
}