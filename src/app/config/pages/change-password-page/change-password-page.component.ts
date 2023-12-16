import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ConfirmationService, ConfirmEventType } from 'primeng/api';

import { Severity } from 'src/app/shared/enums/severity-toast.enum';
import { MyMessageService } from 'src/app/shared/services/my-message-service.service';
import * as myPatterns from 'src/app/shared/helpers/index';
import { ValidatorService } from 'src/app/shared/services/validator.service';
import { UserService } from 'src/app/dashboard/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pages-change-password-page',
  templateUrl: './change-password-page.component.html',
  styleUrls: ['./change-password-page.component.css'],
})
export class ChangePasswordPageComponent {
  private confirmationService = inject(ConfirmationService);
  private myMessageService = inject(MyMessageService);
  private validatorsService = inject(ValidatorService);
  private userService = inject(UserService);
  private router = inject(Router);



  private fb = inject(FormBuilder);
  public myForm: FormGroup = this.fb.group({
    passwordActual: ['', Validators.required],
    passwordNuevo: [
      '',
      [Validators.required, Validators.pattern(myPatterns.PATTERN_PASSWORD)],
    ],
  });

  isValidField(field: string): boolean | null {
    return this.validatorsService.isValidField(this.myForm, field);
  }

  getFieldError(field: string): string | null {
    return this.validatorsService.getFieldError(this.myForm, field);
  }

  changePassword() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    const req = this.myForm.value;
    this.userService.changePassword(req).subscribe({
      next: ({ mensaje }) => {
        this.myMessageService.toastBuilder(
          Severity.success,
          'Operación exitosa!',
          mensaje
        );
        this.myForm.reset;
        this.router.navigateByUrl('/dashboard/home');
      },
      error: ({ error }) => {
        if (error.mensaje) {
          if (typeof error.mensaje === 'string') {
            this.myMessageService.toastBuilder(
              Severity.error,
              'Error',
              error.mensaje
            );
            return;
          }
          error.mensaje.forEach((mensaje: string) => {
            this.myMessageService.toastBuilder(Severity.warn, 'Error', mensaje);
          });
          return;
        }
        this.myMessageService.toastBuilder(
          Severity.warn,
          'Formulario inválido',
          'Fallaron las validaciones!'
        );
      },
    });
  }

  confirm() {
    this.confirmationService.confirm({
      accept: () => {
        this.changePassword();
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.myMessageService.toastBuilder(
              Severity.info,
              'Operación cancelada!',
              'Se canceló el cambio de contraseña'
            );
            break;
        }
      },
    });
  }
}
