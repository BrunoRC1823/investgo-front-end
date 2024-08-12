import {
  Directive,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, distinctUntilChanged, map, of, tap } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Directive({
  selector: '[showForRoles]',
})
export class ShowForRolesDirective implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private router = inject(Router);
  private viewContainerRe = inject(ViewContainerRef);
  private templateRef = inject(TemplateRef<any>);
  private sub?: Subscription;

  ngOnInit(): void {
    this.sub = this.isAdmin()
      .pipe(
        distinctUntilChanged(),
        tap((isAdmin) => {
          isAdmin
            ? this.viewContainerRe.createEmbeddedView(this.templateRef)
            : this.viewContainerRe.clear();
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  isAdmin() {
    const role = this.authService.getUserRole();
    if (role == null || (!(role.codigo! === 'ROLE_ADMIN'))) {
      return of(false);
    }
    return of(true);
  }
}
