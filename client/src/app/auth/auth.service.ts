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
    this.oauthService.loadDiscoveryDocumentAndTryLogin().finally();
  }

  login() {
    this.oauthService.initImplicitFlow()
    this.router.navigate(['main']).finally();
  }

  logout() {
    this.router.navigate(['login']).finally();
    this.oauthService.revokeTokenAndLogout().finally();
    this.oauthService.logOut();
  }

  get identityClaims() {
    let claims = this.oauthService.getIdentityClaims();
    if (!localStorage.getItem('user'))
      localStorage.setItem('user', JSON.stringify(claims))
    return claims;
  }

  get isLoggedIn(): boolean {
    return this.oauthService.hasValidAccessToken();
  }
}
