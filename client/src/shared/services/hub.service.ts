import {Injectable} from '@angular/core';
import * as signalR from "@microsoft/signalr"
import {last, Observable, Subject} from "rxjs";
import {retry} from "../utils";
import {HubConnectionState} from "@microsoft/signalr";

@Injectable({
  providedIn: 'root'
})
export class HubService {

  private hubConnection: signalR.HubConnection | undefined;
  private connectionState$ = new Subject<HubConnectionState>();

  constructor() {
  }

  public StartConnection() {
    retry(async () => {
      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl("http://localhost:5000/hub")
        .build();
      await this.hubConnection.start();
      // @ts-ignore
    }).then(r => this.updateConnectionState(this.hubConnection.state))
  }


  public connectMethod(method: string): Observable<any> {
    const messages: Subject<any> = new Subject<any>();
    this.hubConnection?.on(method, (response) => {
      messages.next(response)
    });
    return messages.asObservable();
  }

  private updateConnectionState(connectionState: HubConnectionState) {
    this.connectionState$.next(connectionState);
  }

  public getConnectionState$(): Observable<HubConnectionState> {
    return this.connectionState$.asObservable();
  }
}
