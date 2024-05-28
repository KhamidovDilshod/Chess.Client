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
  url: 'http://localhost:5000'
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
  clientId: '1081035074588-edo27atkbl88j435pjk40vdpq6uoa60d.apps.googleusercontent.com',
  redirectUri: window.location.origin + "/main",
  scope: 'openid profile email',
  issuer: 'https://accounts.google.com',
  responseType: 'token id_token',
  strictDiscoveryDocumentValidation: false,
};

