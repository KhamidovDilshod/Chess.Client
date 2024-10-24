import {ApplicationConfig, importProvidersFrom, InjectionToken} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import {AuthConfig, OAuthModule, OAuthService, provideOAuthClient} from "angular-oauth2-oidc";
import {AuthService} from "./auth/auth.service";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {en_US, provideNzI18n} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule} from '@angular/forms';

registerLocaleData(en);
export const serverConfig = new InjectionToken<AppConfig>('SERVER_CONFIG')
export const ServerConfig: AppConfig = {
  url: 'https://api-chess.scm.azurewebsites.net/'
}

export interface AppConfig {
  url: string
}

export const appConfig: ApplicationConfig = {
  providers: [
    AuthService,
    provideHttpClient(),
    provideRouter(routes),
    provideOAuthClient(),
    provideNzI18n(en_US),
    importProvidersFrom(FormsModule),
    provideAnimationsAsync(),
    provideHttpClient(),
    {provide: serverConfig, useValue: ServerConfig}
  ]
};

export const authConfig: AuthConfig = {
  clientId: '549704308150-33fudgiud9pb8p3b77on11s896cotou6.apps.googleusercontent.com',
  redirectUri: window.location.origin + "/game",
  scope: 'openid profile email',
  issuer: 'https://accounts.google.com',
  responseType: 'token id_token',
  strictDiscoveryDocumentValidation: false,
};

