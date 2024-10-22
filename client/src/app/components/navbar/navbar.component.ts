import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {SvgIconComponent} from "../../../shared/components/svg-icon/svg-icon.component";
import {Icon} from "../../../shared/models/icon";
import {AsyncPipe, NgIf} from "@angular/common";
import {AuthService} from "../../auth/auth.service";
import {authConfig} from "../../app.config";
import {NzDropDownDirective, NzDropdownMenuComponent} from "ng-zorro-antd/dropdown";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzMenuDirective, NzMenuItemComponent} from "ng-zorro-antd/menu";
import {GameService} from "../../../shared/services/game.service";
import {Router} from "@angular/router";
import {Player} from "../../../shared/models/game";
import {Color} from "../../../shared/chess-logic/model";

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
  styleUrl: './navbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  protected readonly Icon = Icon;
  isOnline: boolean = false;
  gameService = inject(GameService);
  authService = inject(AuthService);
  router = inject(Router);

  constructor() {
    // this.hubService.getConnectionState$()
    //   .subscribe(state => {
    //     this.isOnline = state == HubConnectionState.Connected
    //     console.log(state);
    //   }
    // )
  }

  protected readonly authConfig = authConfig;

  join() {
    let player: Player = {
      color: Color.White, gameId: null, userId: this.authService.getCurrentUser().id

    }
    console.log(player)
    this.gameService.join([player])
      .subscribe(res => this.router.navigate([`game/${res.id}`]).finally())
  }
}
