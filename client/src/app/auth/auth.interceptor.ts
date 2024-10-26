import {HttpInterceptorFn} from '@angular/common/http';
import {Inject} from "@angular/core";
import {AuthService} from "./auth.service";
import {Keys} from "../../shared/constants/keys";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService: AuthService = Inject(AuthService);
  const token = localStorage.getItem(Keys.TOKEN) as string;
  if (authService.isLoggedIn) {
    const tokenRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(tokenRequest)
  }
  return next(req);
};
