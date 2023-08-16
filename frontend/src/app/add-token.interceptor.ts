import { HttpInterceptorFn } from '@angular/common/http';
import { UserService } from './user/user.service';
import { inject } from '@angular/core';

export const addTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const state = inject(UserService);

  const token = state.state().jwt;

  if (token) {
    const req_with_token = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token),
    });

    return next(req_with_token);
  } else {
    return next(req);
  }
};
