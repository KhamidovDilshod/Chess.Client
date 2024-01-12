import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {ChessBoard} from '../shared/chess'
import {ChessPieceComponent} from "./components/chess-piece/chess-piece.component";
import {HubService} from "../shared/services/hub.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ChessPieceComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public chessBoard: ChessBoard = new ChessBoard();

  constructor(private hubService: HubService) {
    this.hubService.StartConnection();
  }
}
