import { Component } from '@angular/core';
import {ChessBoardComponent} from "../chess-board/chess-board.component";
import {NavbarComponent} from "../navbar/navbar.component";
import {RouterOutlet} from "@angular/router";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzDividerComponent} from "ng-zorro-antd/divider";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    ChessBoardComponent,
    NavbarComponent,
    RouterOutlet,
    NzRowDirective,
    NzColDirective,
    NzDividerComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
