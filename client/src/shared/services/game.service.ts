import {inject, Injectable} from "@angular/core";
import {serverConfig} from "../../app/app.config";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Board, Game, Player} from "../models/game";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private serverConfig = inject(serverConfig);
  private httpClient = inject(HttpClient);

  tryLoadGame(id: string): Observable<Game> {
    return this.httpClient.get<Game>(`${this.serverConfig.url}/game/${id}`);
  }

  tryLoadBoard(id: string): Observable<Board> {
    return this.httpClient.get<Board>(`${this.serverConfig.url}/game/${id}/board`)
  }

  join(players: Player[]): Observable<Game> {
    return this.httpClient.post<Game>(`${this.serverConfig.url}/game/init`, {...players})
  }
}
