import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import {AuthConfig, OAuthModule, OAuthService, provideOAuthClient} from "angular-oauth2-oidc";
import {AuthService} from "./auth/auth.service";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";

export const appConfig: ApplicationConfig = {
  providers: [
    AuthService,
    provideHttpClient(),
    provideRouter(routes),
    provideOAuthClient(),
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
