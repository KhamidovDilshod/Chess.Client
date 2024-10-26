import {inject, Injectable} from '@angular/core';
import {OAuthService} from "angular-oauth2-oidc";
import {authConfig, serverConfig} from "../app.config";
import {Router} from "@angular/router";
import {GoogleUser, User} from "../../shared/models/user";
import {HttpClient} from "@angular/common/http";
import {Keys} from "../../shared/constants/keys";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private serverConfig = inject(serverConfig);
  private httpClient = inject(HttpClient);
  private _token: string | null = null;

  constructor(private oauthService: OAuthService, private router: Router) {
    this.initializeOAuth();
    this.oauthService.events.subscribe(event => {
      if (event.type == 'token_received') {
        this.getOrCreateUser(this.identityClaims)

      }
    })
  }

  get token(): string {
    return this._token ?? this.setToken(localStorage.getItem(Keys.TOKEN) as string);
  }

  setToken(value: string): string {
    this._token = value;
    return value;
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
    localStorage.setItem(Keys.TOKEN, this.oauthService.getIdToken())
    if (!localStorage.getItem(Keys.USER))
      localStorage.setItem(Keys.USER, JSON.stringify(claims))
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
      localStorage.setItem(Keys.USER, JSON.stringify(res))
    })
  }

  public getCurrentUser(): User {
    return JSON.parse(localStorage.getItem(Keys.USER)!) as User;
  }

}
