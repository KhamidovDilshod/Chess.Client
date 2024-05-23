import { Component } from '@angular/core';
import {ChessBoardComponent} from "../chess-board/chess-board.component";
import {NavbarComponent} from "../navbar/navbar.component";

@Component({
  selector: 'app-main',
  standalone: true,
    imports: [
        ChessBoardComponent,
        NavbarComponent
    ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}