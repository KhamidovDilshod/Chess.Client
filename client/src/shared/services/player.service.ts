import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Player } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private _player = new BehaviorSubject<Player | null>(null);

  setPlayer(player: Player): void {
    this._player.next(player);
  }

  getPlayer(): Observable<Player | null> {
    return this._player.asObservable();
  }

  getCurrentPlayer(): Player | null {
    return this._player.value;
  }
}
