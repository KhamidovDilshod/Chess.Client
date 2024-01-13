import {Injectable, signal, WritableSignal} from '@angular/core';
import * as signalR from "@microsoft/signalr"
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {retry} from "../utils";

@Injectable({
  providedIn: 'root'
})
export class HubService {

  private hubConnection: signalR.HubConnection | undefined;

  constructor() {
  }

  public StartConnection() {
    retry(async () => {
      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl("http://localhost:5000/hub")
        .build();
      await this.hubConnection.start();
    }).then(r =>r)
   }

  public connectMethod(method: string): Observable<any> {
    const messages: Subject<any> = new Subject<any>();
    this.hubConnection?.on(method, (response) => {
      messages.next(response)
    });
    return messages.asObservable();
  }
}
