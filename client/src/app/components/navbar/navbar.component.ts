import {Component, inject} from '@angular/core';
import {SvgIconComponent} from "../../../shared/components/svg-icon/svg-icon.component";
import {Icon} from "../../../shared/models/icon";
import {HubConnectionState} from "@microsoft/signalr";
import {HubService} from "../../../shared/services/hub.service";
import {AsyncPipe, NgIf} from "@angular/common";
import {AuthService} from "../../auth/auth.service";
import {authConfig} from "../../app.config";
import {NzDropDownDirective, NzDropdownMenuComponent} from "ng-zorro-antd/dropdown";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzMenuDirective, NzMenuItemComponent} from "ng-zorro-antd/menu";
import {GameService} from "../../../shared/services/game.service";
import {switchMap} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    SvgIconComponent,
    AsyncPipe,
    NgIf,
    NzDropDownDirective,
    NzIconDirective,
    NzDropdownMenuComponent,
    NzMenuItemComponent,
    NzMenuDirective
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  protected readonly Icon = Icon;
  isOnline: boolean = false;
  gameService = inject(GameService)
  router = inject(Router);

  constructor(public authService: AuthService) {
    // this.hubService.getConnectionState$()
    //   .subscribe(state => {
    //     this.isOnline = state == HubConnectionState.Connected
    //     console.log(state);
    //   }
    // )
  }

  protected readonly authConfig = authConfig;

  join() {
    this.gameService.join()
      .subscribe(res => this.router.navigate([`game/${res.id}`]).finally())
  }
}
