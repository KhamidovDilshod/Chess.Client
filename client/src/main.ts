import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {Piece} from "./shared/chess-logic/pieces/piece";

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
