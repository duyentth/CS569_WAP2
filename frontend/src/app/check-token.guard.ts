import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
  createUrlTreeFromSnapshot,
} from '@angular/router';
import { UserService } from './user/user.service';

export const checkTokenGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const userService = inject(UserService);
  if (userService.state().jwt) {
    return true;
  } else {
    return createUrlTreeFromSnapshot(route, ['']);
  }
};
