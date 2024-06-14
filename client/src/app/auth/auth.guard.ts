import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";

export const authGuard: CanActivateFn = (route, state) => {
  console.log(state.url)
  console.log(state.root)
  let authService = inject(AuthService);
  let router = inject(Router);
  if (!authService.isLoggedIn) {
    return true;
  }
  router.navigate(['login']).finally()
  return false;
};
