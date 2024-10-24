import {Injectable} from '@angular/core';
import * as signalR from "@microsoft/signalr"
import {HubConnectionState} from "@microsoft/signalr"
import {Observable, Subject} from "rxjs";
import {retry} from "../utils";
import {SocketConstants} from "../constants/socketConstants";
import {Game} from "../models/game";

@Injectable({
  providedIn: 'root'
})
export class HubService {

  private hubConnection: signalR.HubConnection | undefined;
  private connectionState$ = new Subject<HubConnectionState>();

  constructor() {
  }

  public startConnection() {
    retry(async () => {
      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(`https://api-chess.azurewebsites.net//${SocketConstants.GAME}`)
        .build();
      await this.hubConnection.start();
      // @ts-ignore
    }).then(r => this.updateConnectionState(this.hubConnection.state));

    this.hubConnection?.on(SocketConstants.JOIN_GAME, (game: Game) => {
      console.log('Received game state:', game);
    });
  }


  public connectMethod<T>(method: string): Observable<T> {
    const messages: Subject<T> = new Subject<T>();
    this.hubConnection?.on(method, (response) => {
      messages.next(response)
    });
    return messages.asObservable();
  }

  public sendMethod<T>(method: string, data: object): Promise<T> {
    return retry(() => {
      return this.hubConnection?.invoke(method, data) as Promise<T>;
    })
  }

  private updateConnectionState(connectionState: HubConnectionState) {
    this.connectionState$.next(connectionState);
  }

  public getConnectionState$(): Observable<HubConnectionState> {
    return this.connectionState$.asObservable();
  }
}
