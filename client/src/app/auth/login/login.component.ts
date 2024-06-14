import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {AuthService} from "../auth.service";
import {OAuthService} from "angular-oauth2-oidc";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule
  ],
  providers: [OAuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  constructor() {
  }

   authService = inject(AuthService)

  ngOnInit(): void {
    console.log(this.authService.isLoggedIn);
  }
}
