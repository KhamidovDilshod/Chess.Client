import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {ChessBoard} from '../shared/chess'
import {ChessPieceComponent} from "./components/chess-piece/chess-piece.component";
import {HubService} from "../shared/services/hub.service";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {ChessBoardComponent} from "./components/chess-board/chess-board.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ChessPieceComponent, NavbarComponent, ChessBoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public chessBoard: ChessBoard = new ChessBoard();

  constructor(private hubService: HubService) {
    this.hubService.StartConnection();

    this.hubService.connectMethod("notification").subscribe(msg => console.log(msg))
  }
}
