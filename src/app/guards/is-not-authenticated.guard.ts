import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { AuthStatus } from '../auth/enums/auth-status.enum';

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router = inject(Router);
  if (authService.authStatus() === AuthStatus.authenticated) {
    const lastUrl = localStorage.getItem('lastVisitedUrl');
    if (!lastUrl || lastUrl === '') {
      router.navigateByUrl('/dashboard');
      return false;
    }
    router.navigate([lastUrl]);
    return false;
  }
  return true;
};
