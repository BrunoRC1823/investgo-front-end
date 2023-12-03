import {
  ChangeDetectorRef,
  Component,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Bank, Company, Currency } from 'src/app/dashboard/interfaces';
import { CompaniesService } from 'src/app/dashboard/services/companies.service';
import { MyMessageService } from 'src/app/shared/services/my-message-service.service';
import { Severity } from 'src/app/shared/enums/severity-toast.enum';
import { ValidatorService } from 'src/app/shared/services/validator.service';
import { AutoComplete, AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { BillService } from 'src/app/dashboard/services/bill.service';
import { DatePipe } from '@angular/common';
import { tap, switchMap } from 'rxjs';
import { Bill } from 'src/app/dashboard/interfaces/bill.interface';

@Component({
  selector: 'dashboard-bills',
  templateUrl: './bills-page.component.html',
  styleUrls: ['./bills-page.component.css'],
})
export class BillsPageComponent {
  private router = inject(Router);
  private datePipe = inject(DatePipe);
  private activatedRoute = inject(ActivatedRoute);

  private myMessageService = inject(MyMessageService);
  private companiesService = inject(CompaniesService);
  private billService = inject(BillService);
  private validatorsService = inject(ValidatorService);

  public maxDate = new Date();
  public title: string = 'Registrar facturas.';
  public filteredCompanies: Company[] = [];
  public selectedCompany: Company | undefined;
  public isEdit: boolean = false;
  public enableButtonSave: boolean = false;
  public labelDisabledButton: string = 'Activar formulario';
  private fb = inject(FormBuilder);
  public myForm: FormGroup = this.fb.group({
    codigo: [''],
    empresa: [null, [Validators.required]],
    monto: [null, [Validators.required]],
    fechaEmision: [null, [Validators.required]],
    descripcion: [null, [Validators.required]],
  });

  ngOnInit(): void {
    if (this.router.url.includes('company')) {
      this.activatedRoute.params
        .pipe(
          tap(({ codigo }) => codigo),
          switchMap(({ codigo }) =>
            this.companiesService.getCompanyByCode(codigo)
          )
        )
        .subscribe((company) => {
          if (!company) return this.router.navigateByUrl('/dashboard/bills');
          const empresaCtrl = this.myForm.controls['empresa'];
          empresaCtrl.setValue(company);
          this.selectedCompany = company;
          return;
        });
    } else if (this.router.url.includes('show')) {
      this.title = 'Ver factura.';
      this.isEdit = true;
      this.activatedRoute.params
        .pipe(
          tap(({ codigo }) => codigo),
          switchMap(({ codigo }) => this.billService.getBillByCode(codigo))
        )
        .subscribe((bill) => {
          if (!bill) return this.router.navigateByUrl('/dashboard/bills');
          const { fechaEmision, empresa } = bill as Bill;
          this.selectedCompany = empresa;
          const fechaFormant = new DatePipe('es-PE').transform(
            fechaEmision,
            'dd/MM/yyyy'
          );
          bill.fechaEmision = fechaFormant!;
          this.myForm.reset(bill);
          this.myForm.disable();
          this.enableButtonSave = true;
          return;
        });
    }
  }

  isValidField(field: string): boolean | null {
    return this.validatorsService.isValidField(this.myForm, field);
  }

  getFieldError(field: string): string | null {
    return this.validatorsService.getFieldError(this.myForm, field);
  }

  clear(auto: AutoComplete) {
    auto.clear();
    this.myForm.reset();
    const descripcionCtrl = this.myForm.controls['empresa'];
    descripcionCtrl.markAsPristine();
  }

  onSelect(event: any) {
    this.selectedCompany = event.value;
  }

  filterCompanies(event: AutoCompleteCompleteEvent) {
    if (event) {
      this.listCompanies(event.query);
    }
    return;
  }

  toggleForm() {
    if (!this.myForm.disabled) {
      this.myForm.disable();
      this.title = 'Ver empresa.';
      this.labelDisabledButton = 'Activar Formulario';
      this.enableButtonSave = true;
    } else {
      this.myForm.enable();
      this.title = 'Editar empresa';
      this.labelDisabledButton = 'Desactivar Formulario';
      this.enableButtonSave = false;
    }
  }

  listCompanies(rz: string) {
    this.companiesService.getCompaniesByRZContains(rz).subscribe({
      next: (list) => {
        this.filteredCompanies = list;
      },
      error: () => {
        this.myMessageService.toastBuilder(
          Severity.warn,
          'Atención!',
          'No se pudieron cargar las empresas'
        );
      },
    });
  }

  formatDate() {
    const fechaEmision = this.myForm.get('fechaEmision');
    const dateValue = new Date(fechaEmision!.value);
    if (!isNaN(dateValue.getTime())) {
      const formattedDate = this.datePipe.transform(dateValue, 'dd/MM/yyyy');
      fechaEmision?.setValue(formattedDate);
    } else {
      return;
    }
  }

  formatData() {
    this.formatDate();
    const {
      empresa: { codigo },
      ...rest
    } = this.myForm.value;

    return {
      ...rest,
      empresa: { codigo },
    };
  }
  register() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    const bill = this.formatData();
    const { codigo, empresa } = bill;
    let messageSuccess: any;
    if (codigo) {
      messageSuccess = {
        message: 'Actualización exitosa',
        severity: Severity.info,
      };
    } else {
      messageSuccess = {
        message: 'Registro exitoso',
        severity: Severity.success,
      };
    }
    this.billService.register(bill).subscribe({
      next: ({ mensaje }) => {
        this.myMessageService.toastBuilder(
          messageSuccess.severity,
          messageSuccess.message,
          mensaje
        );
        this.myForm.reset;
        this.router.navigateByUrl(
          `/dashboard/companies/show-company/${empresa.codigo}`
        );
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
