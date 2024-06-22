import {inject, Injectable, OnInit} from '@angular/core';
import {OAuthService} from "angular-oauth2-oidc";
import {authConfig, serverConfig} from "../app.config";
import {Router} from "@angular/router";
import {GoogleUser, User} from "../../shared/models/user";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private serverConfig = inject(serverConfig);
  private httpClient = inject(HttpClient);

  constructor(private oauthService: OAuthService, private router: Router) {
    this.initializeOAuth();
    this.oauthService.events.subscribe(event => {
      if (event.type == 'token_received') {
        this.getOrCreateUser(this.identityClaims)

      }
    })
  }

  initializeOAuth() {
    this.oauthService.configure(authConfig);
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocumentAndTryLogin().finally();
  }

  login() {
    this.oauthService.initImplicitFlow();

  }

  logout() {
    this.router.navigate(['login']).finally();
    this.oauthService.revokeTokenAndLogout().finally();
    this.oauthService.logOut();
  }

  get identityClaims(): GoogleUser {
    let claims = this.oauthService.getIdentityClaims();
    if (!localStorage.getItem('user'))
      localStorage.setItem('user', JSON.stringify(claims))
    return {
      email: claims?.['email'],
      email_verified: claims?.['email_verified'],
      name: claims?.['name'],
      picture: claims?.['picture']
    };
  }

  get isLoggedIn(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  private getOrCreateUser(user: GoogleUser) {
    const newUser: User = {
      id: '',
      username: user?.email.split('@')[0],
      logoUrl: user?.picture,
      email: user?.email
    }
    this.httpClient.post(`${this.serverConfig.url}/users`, newUser).subscribe(res => {
      this.router.navigate(['game']);
      localStorage.setItem('user', JSON.stringify(res))
    })
  }

  public getCurrentUser(): User {
    return JSON.parse(localStorage.getItem('user')!) as User;
  }

}
