import {Injectable} from '@angular/core';
import * as signalR from "@microsoft/signalr"

@Injectable({
  providedIn: 'root'
})
export class HubService {

  private hubConnection: signalR.HubConnection | undefined;

  constructor() {
  }

  public StartConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5000/hub")
      .build();

    this.hubConnection.start()
      .then(r => console.log('client connected to server'))
      .catch(err => console.log('Error while starting connection: ' + err))

    this.hubConnection.on("onConnected", (res) => {
      console.log(res)
    })
  }
}
