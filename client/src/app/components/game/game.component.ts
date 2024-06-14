import {Component, inject, OnInit} from '@angular/core';
import {GameService} from "../../../shared/services/game.service";
import {ActivatedRoute} from "@angular/router";
import {ChessBoardComponent} from "../chess-board/chess-board.component";
import {Observable, Subject, switchMap} from "rxjs";
import {Board, GameMode} from "../../../shared/models/game";
import {AsyncPipe, NgIf} from "@angular/common";
import {NzSpinComponent} from "ng-zorro-antd/spin";

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    ChessBoardComponent,
    AsyncPipe,
    ChessBoardComponent,
    NgIf,
    NzSpinComponent
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit {
  gameService = inject(GameService);
  id: string = '';
  board: Observable<Board> = new Subject<Board>();

  constructor(private activatedRoute: ActivatedRoute) {
    this.board = this.activatedRoute.paramMap
      .pipe(
        switchMap(params => {
          this.id = params.get('id') as string;
          return this.gameService.tryLoadBoard(this.id);
        })
      );
    this.board.subscribe();
  }

  ngOnInit(): void {
    this.gameService.tryLoadGame(this.id).subscribe(res => console.log(res));
  }

  protected readonly GameMode = GameMode;
}
