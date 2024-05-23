import {Injectable} from '@angular/core';
import {OAuthService} from "angular-oauth2-oidc";
import {authConfig} from "../app.config";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private oauthService: OAuthService, private router: Router) {
    this.initializeOAuth()
  }

  initializeOAuth() {
    this.oauthService.configure(authConfig);
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  login() {
    this.oauthService.initImplicitFlow()
    this.router.navigate(['main'])
  }

  logout() {
    this.router.navigate(['login'])
    this.oauthService.revokeTokenAndLogout().finally();
    this.oauthService.logOut();
  }

  get identityClaims() {
    let claims = this.oauthService.getIdentityClaims();
    localStorage.setItem('user', JSON.stringify(claims))
    return claims;
  }

  get isLoggedIn(): boolean {
    return this.oauthService.hasValidAccessToken();
  }
}
