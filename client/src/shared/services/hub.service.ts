import {inject, Inject, Injectable} from '@angular/core';
import * as signalR from "@microsoft/signalr"
import {HubConnectionState} from "@microsoft/signalr"
import {Observable, Subject} from "rxjs";
import {retry} from "../utils";
import {SocketConstants} from "../constants/socketConstants";
import {Game} from "../models/game";
import {AppConfig, serverConfig} from "../../app/app.config";

@Injectable({
  providedIn: 'root'
})
export class HubService {

  private hubConnection: signalR.HubConnection | undefined;
  private connectionState$ = new Subject<HubConnectionState>();
  private serverConfig: AppConfig = inject(serverConfig);

  constructor() {
  }

  public startConnection() {
    retry(async () => {
      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(`${this.serverConfig.url}/${SocketConstants.GAME}`)
        .build();
      await this.hubConnection.start();
      // @ts-ignore
    }).then(r => this.updateConnectionState(this.hubConnection.state));
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
