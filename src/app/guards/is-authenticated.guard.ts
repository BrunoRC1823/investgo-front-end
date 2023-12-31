import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { AuthStatus } from '../auth/enums/auth-status.enum';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.authStatus() === AuthStatus.authenticated) return true;
  authService.logout();
  router.navigateByUrl('/auth/login');
  return false;
};
