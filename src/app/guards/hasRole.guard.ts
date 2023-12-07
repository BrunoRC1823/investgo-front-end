import { inject } from '@angular/core';
import { Router, type CanMatchFn } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

export const hasRoleGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const role = authService.getUserRole();
  if (!role) {
    authService.logout();
    return false;
  }
  if (!(role === 'ROLE_ADMIN')) {
    router.navigateByUrl('/page-404');
    return false;
  }
  return true;
};
