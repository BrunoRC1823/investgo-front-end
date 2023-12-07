import {
  Component,
  OnDestroy,
  OnInit,
  computed,
  effect,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { AuthStatus } from './auth/enums/auth-status.enum';
import { AuthService } from './auth/services/auth.service';
import { UserService } from './dashboard/services/user.service';
import { MyMessageService } from './shared/services/my-message-service.service';
import { Severity } from './shared/enums/severity-toast.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private myMessageService = inject(MyMessageService);

  private primeNGConfig = inject(PrimeNGConfig);
  private router = inject(Router);

  ngOnInit() {
    this.primeNGConfig.ripple = true;
  }
  public finishedAuthCheck = computed<boolean>(() => {
    if (this.authService.authStatus() === AuthStatus.checking) return false;
    if (this.authService.authStatus() === AuthStatus.authenticated) {
      this.userService.getCurrentWallet().subscribe({
        next: () => {},
        error: ({ error }) => {
          const { mensaje } = error;
          return this.myMessageService.toastBuilder(
            Severity.error,
            'Atención',
            mensaje
          );
        },
      });
    }
    return true;
  });

  public authStatusChangedEffect = effect(() => {
    switch (this.authService.authStatus()) {
      case AuthStatus.checking:
        return;
      case AuthStatus.authenticated:
        const lastUrl = localStorage.getItem('lastVisitedUrl');
        if (!lastUrl || lastUrl === '') {
          this.router.navigateByUrl('/dashboard/home');
          return;
        }
        return;
      case AuthStatus.notAuthenticated:
        this.router.navigateByUrl('/auth/login');
        return;
    }
  });
}
