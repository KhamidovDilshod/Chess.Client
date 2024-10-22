import {AfterViewInit, ChangeDetectionStrategy, Component, HostListener, inject, OnInit} from '@angular/core';
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
  styleUrl: './game.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent implements OnInit, AfterViewInit {
  gameService = inject(GameService);
  hubService = inject(HubService);
  authService = inject(AuthService);
  id: string = '';
  board: Observable<Board> = new Subject<Board>();
  player: Player = {
    gameId: '',
    userId: "",
    color: Color.White
  };
  protected readonly GameMode = GameMode;


  constructor(private activatedRoute: ActivatedRoute) {
    this.board = this.activatedRoute.paramMap
      .pipe(
        switchMap(params => {
          this.id = params.get('id') as string;
          this.gameService.tryLoadGame(this.id).subscribe(res => {
            let userId = this.authService.getCurrentUser().id;
            console.log(res);
            this.player = res.players.find(p => p.userId == userId) as Player;
          })
          return this.gameService.tryLoadBoard(this.id);
        })
      );
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnload(): void {
    this.hubService.sendMethod(SocketConstants.LEAVE_GAME, {...this.player}).finally();
  }


  ngAfterViewInit(): void {
    let player: Player = {
      color: Color.White, gameId: this.id, userId: this.authService.getCurrentUser().id

    }
    this.hubService.sendMethod(SocketConstants.JOIN_GAME, {...player}).finally();
  }

  ngOnInit(): void {
  }
}
