import { ActivatedRouteSnapshot, CanActivateFn, Route, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { inject } from '@angular/core';



export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state:RouterStateSnapshot) => {

  const userService = inject(UserService);
  const router = inject(Router);

  if(userService.currentUser.token) return true;

  router.navigate(['/login'], {queryParams: {returnUrl: state.url}});

  return false;
};
