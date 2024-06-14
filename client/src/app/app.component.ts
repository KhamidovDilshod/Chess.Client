import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';

import {HubService} from "../shared/services/hub.service";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {ChessBoardComponent} from "./components/chess-board/chess-board.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, ChessBoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(public hubService: HubService) {
    this.hubService.startConnection();
    this.hubService.connectMethod("notification").subscribe()
  }
}
