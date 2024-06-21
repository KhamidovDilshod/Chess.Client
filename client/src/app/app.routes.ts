import {Routes} from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {ChessBoardComponent} from "./components/chess-board/chess-board.component";
import {MainComponent} from "./components/main/main.component";
import {authGuard} from "./auth/auth.guard";
import {GameComponent} from "./components/game/game.component";

export const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {
    path: 'game',
    component: MainComponent,
    children: [
      {
        path: '',
        component: ChessBoardComponent
      },
      {
        path: ":id",
        component: GameComponent
      }
    ],
    // canActivate: [authGuard]
  }
];
