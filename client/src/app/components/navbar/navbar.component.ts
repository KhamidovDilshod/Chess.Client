import { Component } from '@angular/core';
import {SvgIconComponent} from "../../../shared/components/svg-icon/svg-icon.component";
import {Icon} from "../../../shared/models/icon";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    SvgIconComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  protected readonly Icon = Icon;
}
