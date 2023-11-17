import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { MyMessageService } from 'src/app/shared/services/my-message-service.service';
import { Severity } from 'src/app/shared/enums/severity-toast.enum';
import { ValidatorService } from 'src/app/shared/services/validator.service';
import * as myPatterns from 'src/app/shared/helpers/index';
@Component({
  selector: 'auth-register',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],

})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private myMessageService = inject(MyMessageService);
  private validatorsService = inject(ValidatorService);

  private namesValidations = [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(15),
  ];
  public myForm: FormGroup = this.fb.group({
    nombre: [
      '',
      [...this.namesValidations, this.validatorsService.namesIsValid],
    ],
    apellidoMa: [
      '',
      [...this.namesValidations, this.validatorsService.namesIsValid],
    ],
    apellidoPa: [
      '',
      [...this.namesValidations, this.validatorsService.namesIsValid],
    ],
    dni: ['', [Validators.required, this.validatorsService.dniIsValid]],
    correo: [
      '',
      [Validators.required, this.validatorsService.correoIsValid],
    ],
    telefono: [
      '',
      [Validators.required, this.validatorsService.telefonoIsValid],
    ],
    password: [
      '',
      [Validators.required, Validators.pattern(myPatterns.PATTERN_PASSWORD)],
    ],
    username: ['', this.namesValidations],
  });

  isValidField(field: string): boolean | null {
    return this.validatorsService.isValidField(this.myForm, field);
  }

  getFieldError(field: string): string | null {
    return this.validatorsService.getFieldError(this.myForm, field);
  }

  register() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    const user = this.myForm.value;
    this.authService.register(user).subscribe({
      next: ({ mensaje }) => {
        this.myMessageService.toastBuilder(
          Severity.success,
          'Registro exitoso',
          mensaje
        );
        this.myForm.reset;
        this.router.navigateByUrl('/auth/login');
      },
      error: ({ error }) => {
        if (error.mensaje) {
          error.mensaje.forEach((mensaje: string) => {
            this.myMessageService.toastBuilder(
              Severity.error,
              'Error',
              mensaje
            );
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
}
