import {Component, HostBinding, Input} from '@angular/core';
import {Icon} from "../../models/icon";

@Component({
  selector: 'app-svg-icon',
  standalone: true,
  imports: [],
  template: ``,
  styles: [
    `
      :host {
        height: 30px;
        width: 20px;
        cursor: pointer;
        background-color: black;
        -webkit-mask-size: contain;
        -webkit-mask-position: center;
        -webkit-mask-repeat: no-repeat;
      }
    `]
})
export class SvgIconComponent {
  @HostBinding('style.background-color')
  private _color: string = '';
  @HostBinding('style.-webkit-mask-image')
  private _path: string = ''

  @Input()
  public set path(path: string) {
    this._path = `url(${path})`;
  }

  @Input()
  public set color(color: Icon) {
    switch (color) {
      case Icon.customRed:
        this._color = `#FE0101`;
        break
      default:
        this._color = Icon[color];

    }
  }
}
