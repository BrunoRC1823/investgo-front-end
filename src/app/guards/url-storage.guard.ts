import { CanActivateChildFn, Router } from '@angular/router';

export const urlStorageGuard: CanActivateChildFn = (route, state) => {
  localStorage.setItem('lastVisitedUrl', state.url);
  return true;
};
