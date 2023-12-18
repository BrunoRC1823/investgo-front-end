import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UploadEvent } from 'primeng/fileupload';

import { User } from 'src/app/auth/interfaces/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserService } from 'src/app/dashboard/services/user.service';
import { Severity } from 'src/app/shared/enums/severity-toast.enum';
import { MyMessageService } from 'src/app/shared/services/my-message-service.service';
import { ValidatorService } from 'src/app/shared/services/validator.service';

@Component({
  selector: 'dashboard-account-user-page',
  templateUrl: './account-user-page.component.html',
  styleUrls: ['./account-user-page.component.css'],
})
export class AccountUserPageComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private myMessageService = inject(MyMessageService);
  private userService = inject(UserService);
  private validatorsService = inject(ValidatorService);

  public isEdit: boolean = false;
  public currentUser: User | null = null;
  public fullName: string | undefined;
  public fechaUser: string | null = null;

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser();
    let fechaToFormat;
    const fecha: any = this.currentUser!.auditoria!.fecha!;
    if (fecha instanceof Array) {
      const [year, month, day, hours, minutes, seconds] = fecha;
      fechaToFormat = new Date(year, month - 1, day, hours, minutes, seconds);
    } else {
      fechaToFormat = fecha;
    }
    const fechaFormant = new DatePipe('es-PE').transform(
      fechaToFormat,
      'dd/MM/yyyy'
    );
    this.fechaUser = fechaFormant!;
    const { nombre, apellidoPa, apellidoMa } = this.currentUser!;
    this.fullName = `${nombre} ${apellidoPa} ${apellidoMa}`;
    this.myForm.reset(this.currentUser);
    if (!this.router.url.includes('show')) {
      this.isEdit = true;
      return;
    }
    this.myForm.disable();
  }

  private namesValidations = [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(15),
  ];

  public myForm: FormGroup = this.fb.group({
    codigo: [this.currentUser?.codigo],
    password: ['Pass123@'],
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
    correo: ['', [Validators.required, this.validatorsService.correoIsValid]],
    telefono: [
      '',
      [Validators.required, this.validatorsService.telefonoIsValid],
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
    this.userService.update(user).subscribe({
      next: ({ mensaje }) => {
        this.myMessageService.toastBuilder(
          Severity.success,
          'Actualización exitosa!',
          mensaje
        );
        this.router.navigateByUrl('/dashboard/account-user/show');
      },
      error: (err) => {
        const { error } = err;
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
}
