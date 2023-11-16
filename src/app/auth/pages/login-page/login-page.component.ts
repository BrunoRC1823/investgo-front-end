import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../interfaces/login-request.interface';
import { MyMessageService } from 'src/app/shared/services/my-message-service.service';
import { Severity } from 'src/app/shared/enums/severity-toast.enum';
import { ValidatorService } from 'src/app/shared/services/validator.service';
import { UserService } from 'src/app/dashboard/services/user.service';

@Component({
  selector: 'auth-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private myMessageService = inject(MyMessageService);
  private validatorsService = inject(ValidatorService);

  public myForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  isValidField(field: string): boolean | null {
    return this.validatorsService.isValidField(this.myForm, field);
  }

  getFieldError(field: string): string | null {
    return this.validatorsService.getFieldError(this.myForm, field);
  }

  login() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    const { username, password } = this.myForm.value;
    const loginRequest: LoginRequest = { username, password };
    this.authService.login(loginRequest).subscribe({
      next: (mensaje) => {
        this.myMessageService.toastBuilder(
          Severity.success,
          'Inicio de sesión exitoso',
          mensaje
        );
        this.myForm.reset;
        this.router.navigateByUrl('/dashboard/home');
        
      },
      error: ({ error }) => {
        const { error: err, mensaje } = error;
        if (err && mensaje) {
          return this.myMessageService.toastBuilder(
            Severity.error,
            err,
            mensaje
          );
        }
        return this.myMessageService.toastBuilder(
          Severity.error,
          'Error',
          'Algo salido mal, inténtelo más tarde'
        );
      },
    });
  }
}
