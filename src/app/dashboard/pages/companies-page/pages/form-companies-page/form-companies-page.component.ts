import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MenuItem } from 'primeng/api';
import { Steps } from 'primeng/steps';

import { MyMessageService } from 'src/app/shared/services/my-message-service.service';
import { ValidatorService } from 'src/app/shared/services/validator.service';
import * as myPatterns from 'src/app/shared/helpers/index';
import { DatePipe } from '@angular/common';
import { CompaniesService } from '../../../../services/companies.service';
import { Severity } from 'src/app/shared/enums/severity-toast.enum';

@Component({
  selector: 'companies-form-companies-page',
  templateUrl: './form-companies-page.component.html',
  styleUrls: ['./form-companies-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormCompaniesPageComponent implements OnInit {
  @ViewChild('steps') steps!: Steps;

  private myMessageService = inject(MyMessageService);
  private companiesService = inject(CompaniesService);
  private validatorsService = inject(ValidatorService);
  private router = inject(Router);
  private datePipe = inject(DatePipe);

  public items: MenuItem[] | undefined;
  public activeIndex: number = 0;
  public maxDate = new Date();
  private namesValidations = [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(15),
  ];

  private fb = inject(FormBuilder);
  public myForm: FormGroup = this.fb.group({
    nomRepLegal: [
      '',
      [...this.namesValidations, this.validatorsService.namesIsValid],
    ],
    apeRepLegal: [
      '',
      [...this.namesValidations, this.validatorsService.namesIsValid],
    ],
    nombre: [
      '',
      [...this.namesValidations, this.validatorsService.namesIsValid],
    ],
    ruc: [, [Validators.required, this.validatorsService.rucIsValid]],
    razonSocial: [
      '',
      [Validators.required, this.validatorsService.razonSocialIsValid],
    ],
    fecIniActv: ['', Validators.required],
    direccion: ['', Validators.required],
    telefono: [
      '',
      [Validators.required, this.validatorsService.telefonoIsValid],
    ],
    correo: ['', [Validators.required, this.validatorsService.correoIsValid]],
    nroCuentaBancaria: [
      '',
      [
        Validators.required,
        Validators.pattern(myPatterns.PATTERN_NRO_CUENTA_BANCARIA),
      ],
    ],
    sector: ['', Validators.required],
  });

  ngOnInit(): void {
    this.items = [
      { label: 'Empresa' },
      { label: 'Legal' },
      { label: 'Información' },
    ];
  }

  onActiveIndexChange(event: number) {
    this.activeIndex = event;
  }

  nextStep() {
    const newIndex = this.activeIndex + 1;
    if (newIndex > 2) return;
    this.activeIndex = newIndex;
    this.steps.activeIndex = newIndex;
  }

  previousStep() {
    const newIndex = this.activeIndex - 1;
    if (newIndex < 0) return;
    this.activeIndex = newIndex;
    this.steps.activeIndex = newIndex;
  }

  isValidField(field: string): boolean | null {
    return this.validatorsService.isValidField(this.myForm, field);
  }

  getFieldError(field: string): string | null {
    return this.validatorsService.getFieldError(this.myForm, field);
  }

  clear() {
    this.myForm.reset();
  }

  formatDate() {
    const fechaInicio = this.myForm.get('fecIniActv');
    const formattedDate = this.datePipe.transform(
      fechaInicio!.value,
      'yyyy-MM-dd'
    );
    fechaInicio?.setValue(formattedDate);
  }

  formatPhone() {
    const phone = this.myForm.get('telefono');
    const value: string = phone!.value.toString().replace(/-/g, '');
    phone!.setValue(value);
  }

  formatData() {
    this.formatDate();
    this.formatPhone();
  }

  register() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.formatData();
    const account = this.myForm.value;
    this.companiesService.register(account).subscribe({
      next: ({ mensaje }) => {
        this.myMessageService.toastBuilder(
          Severity.success,
          'Registro exitoso',
          mensaje
        );
        this.myForm.reset;
        this.router.navigateByUrl('/dashboard/companies');
      },
      error: (err) => {
        console.log(err);
        const { error } = err;
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
