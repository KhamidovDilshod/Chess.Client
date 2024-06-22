import {AfterViewInit, Component, inject, OnInit} from '@angular/core';
import {GameService} from "../../../shared/services/game.service";
import {ActivatedRoute} from "@angular/router";
import {ChessBoardComponent} from "../chess-board/chess-board.component";
import {Observable, Subject, switchMap} from "rxjs";
import {Board, GameMode, Player} from "../../../shared/models/game";
import {AsyncPipe, NgIf} from "@angular/common";
import {NzSpinComponent} from "ng-zorro-antd/spin";
import {HubService} from "../../../shared/services/hub.service";
import {SocketConstants} from "../../../shared/constants/socketConstants";
import {Color} from "../../../shared/chess-logic/model";
import {AuthService} from "../../auth/auth.service";

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
export class GameComponent implements OnInit, AfterViewInit {
  gameService = inject(GameService);
  hubService = inject(HubService);
  authService = inject(AuthService);
  id: string = '';
  board: Observable<Board> = new Subject<Board>();
  color!: Color;

  constructor(private activatedRoute: ActivatedRoute) {
    this.board = this.activatedRoute.paramMap
      .pipe(
        switchMap(params => {
          this.id = params.get('id') as string;
          this.gameService.tryLoadGame(this.id).subscribe(res => {
            let userId = this.authService.getCurrentUser().id;
            let player = res.players.find(p => p.userId == userId);
            this.color = player?.color ?? Color.White;
            console.log(this.color);
          })
          return this.gameService.tryLoadBoard(this.id);
        })
      );
  }

  ngAfterViewInit(): void {
    let player: Player = {
      color: Color.White, gameId: this.id, userId: this.authService.getCurrentUser().id

    }
    this.hubService.sendMethod(SocketConstants.JOIN_GAME, {...player}).finally();
  }

  ngOnInit(): void {

  }

  protected readonly GameMode = GameMode;
}
