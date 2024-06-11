import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from '../../services/user/user.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const userService = inject(UserService);
  const user = userService.currentUser;

  if(user.token){
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${user.token}`
      }
    })
  }

  return next(req);
};
