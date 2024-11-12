import {AfterViewInit, ChangeDetectionStrategy, Component, HostListener, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {catchError, Observable, of, Subject, switchMap, tap} from 'rxjs';
import {AsyncPipe, NgIf} from '@angular/common';
import {ChessBoardComponent} from '../chess-board/chess-board.component';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {GameService} from '../../../shared/services/game.service';
import {HubService} from '../../../shared/services/hub.service';
import {AuthService} from '../../auth/auth.service';
import {PlayerService} from '../../../shared/services/player.service';
import {Board, GameMode, Player} from '../../../shared/models/game';
import {SocketConstants} from '../../../shared/constants/socketConstants';
import {Color} from "../../../shared/chess-logic/model";

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    ChessBoardComponent,
    AsyncPipe,
    NgIf,
    NzSpinComponent
  ],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, AfterViewInit {
  private gameService = inject(GameService);
  private hubService = inject(HubService);
  private authService = inject(AuthService);
  private playerService = inject(PlayerService);
  private activatedRoute = inject(ActivatedRoute);

  id: string = '';
  board$: Observable<Board> = new Subject<Board>();
  player: Player | null = null;
  protected readonly GameMode = GameMode;


  constructor() {

  }

  ngOnInit(): void {
    this.board$ = this.activatedRoute.paramMap.pipe(
      switchMap(params => {
        this.id = params.get('id') as string;
        return this.gameService.tryLoadGame(this.id)
          .pipe(
            tap(game => this.setPlayerFromGame(game)),
            switchMap(() => this.gameService.tryLoadBoard(this.id)),
            catchError(() => of({} as Board)));
      })
    );
    this.hubService.connectMethod(SocketConstants.JOINED).subscribe();
  }

  private setPlayerFromGame(game: any): void {
    const userId = this.authService.getCurrentUser().id;
    const player = game.players.find((p: Player) => p.userId === userId) as Player;
    this.player = player;
    if (player)
      this.playerService.setPlayer(player);
  }

  @HostListener('window:beforeunload')
  beforeUnload(): void {
    this.hubService.sendMethod(SocketConstants.LEAVE_GAME, {...this.player}).finally();
  }

  ngAfterViewInit(): void {
    let player: Player = {
      color: Color.White, gameId: this.id, userId: this.authService.getCurrentUser().id
    }
    this.hubService.sendMethod(SocketConstants.JOIN_GAME, {...player}).finally();
  }
}
