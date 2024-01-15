import {Component} from '@angular/core';
import {SvgIconComponent} from "../../../shared/components/svg-icon/svg-icon.component";
import {Icon} from "../../../shared/models/icon";
import {HubConnectionState} from "@microsoft/signalr";
import {HubService} from "../../../shared/services/hub.service";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    SvgIconComponent,
    AsyncPipe
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  protected readonly Icon = Icon;
  isOnline: boolean = false;

  constructor(public hubService: HubService) {
    this.hubService.getConnectionState$()
      .subscribe(state => {
        this.isOnline = state == HubConnectionState.Connected
        console.log(state);
      }
    )
  }
}
