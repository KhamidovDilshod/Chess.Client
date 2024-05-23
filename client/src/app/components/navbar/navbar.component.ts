import {Component} from '@angular/core';
import {SvgIconComponent} from "../../../shared/components/svg-icon/svg-icon.component";
import {Icon} from "../../../shared/models/icon";
import {HubConnectionState} from "@microsoft/signalr";
import {HubService} from "../../../shared/services/hub.service";
import {AsyncPipe, NgIf} from "@angular/common";
import {AuthService} from "../../auth/auth.service";
import {authConfig} from "../../app.config";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    SvgIconComponent,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  protected readonly Icon = Icon;
  isOnline: boolean = false;

  constructor(public authService: AuthService) {
    // this.hubService.getConnectionState$()
    //   .subscribe(state => {
    //     this.isOnline = state == HubConnectionState.Connected
    //     console.log(state);
    //   }
    // )
  }

  protected readonly authConfig = authConfig;
}
