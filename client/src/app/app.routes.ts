import {Routes} from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {ChessBoardComponent} from "./components/chess-board/chess-board.component";
import {MainComponent} from "./components/main/main.component";
import {authGuard} from "./auth/auth.guard";

export const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'main', component: MainComponent, canActivate: [authGuard]}
];
