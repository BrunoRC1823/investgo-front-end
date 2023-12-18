import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MenuItem } from 'primeng/api';
import { Steps } from 'primeng/steps';

import { switchMap, tap } from 'rxjs';

import { MyMessageService } from 'src/app/shared/services/my-message-service.service';
import { ValidatorService } from 'src/app/shared/services/validator.service';
import * as myPatterns from 'src/app/shared/helpers/index';

import { Bill } from 'src/app/dashboard/interfaces/bill.interface';
import { BillService } from 'src/app/dashboard/services/bill.service';
import { CompaniesService } from '../../../../services/companies.service';
import {
  Company,
  ListResponse,
  PaginatorRequest,
} from 'src/app/dashboard/interfaces';
import { EnableValue } from 'src/app/auth/enums/enable-value.enum';
import { Severity } from 'src/app/shared/enums/severity-toast.enum';
import { TableConfig } from 'src/app/shared/interfaces/table-config.interface';
import { TableHelpersService } from 'src/app/dashboard/services/tableHelpers.service';

@Component({
  selector: 'companies-form-companies-page',
  templateUrl: './form-companies-page.component.html',
  styleUrls: ['./form-companies-page.component.css'],
})
export class FormCompaniesPageComponent implements OnInit {
  @ViewChild('steps') steps!: Steps;

  private myMessageService = inject(MyMessageService);
  private companiesService = inject(CompaniesService);
  private validatorsService = inject(ValidatorService);
  private billService = inject(BillService);
  private tableHelpers = inject(TableHelpersService);

  private router = inject(Router);
  private datePipe = inject(DatePipe);
  private activatedRoute = inject(ActivatedRoute);

  public items: MenuItem[] | undefined;
  public activeIndex: number = 0;
  public maxDate = new Date();
  private namesValidations = [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(15),
  ];

  public title: string = 'Agregar empresa.';
  public codeCompany: string | undefined;
  public activeIndexTab = 0;
  public showBills: boolean = false;
  public disabledButton: boolean = false;
  public labelDisabledButton: string | undefined;
  public tableNoData: boolean = true;
  public configTable: TableConfig = {
    totalElements: 0,
    data: [],
    loading: true,
    columns: [
      { head: 'Codigo', name: 'codigo', value: '' },
      { head: 'Descripcion', name: 'descripcion', value: '' },
      { head: 'Monto', name: 'monto', value: '' },
      { head: 'Fecha', name: 'fechaEmision', value: '' },
      {
        head: 'Estado',
        name: 'auditoria',
        value: 'enable',
        boolean: true,
      },
      {
        head: 'Acciones',
        buttons: [
          {
            icon: 'pi pi-eye',
            severity: 'help',
            routerLink: '/dashboard/bills/show-bill/',
          },
          {
            icon: 'pi pi-trash',
            severity: 'danger',
            onClick: (code: string) => this.deleteBill(code),
          },
        ],
      },
    ],
    rows: 5,
  };

  private fb = inject(FormBuilder);
  public myForm: FormGroup = this.fb.group({
    codigo: [''],
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

  private currentCompanyCode: string | undefined;
  ngOnInit(): void {
    this.items = [
      { label: 'Empresa' },
      { label: 'Legal' },
      { label: 'Información' },
    ];
    if (!this.router.url.includes('show')) return;
    this.title = 'Ver empresa.';
    this.showBills = true;
    this.activatedRoute.params
      .pipe(
        tap(({ codigo }) => (this.codeCompany = codigo)),
        switchMap(({ codigo }) =>
          this.companiesService.getCompanyByCode(codigo)
        )
      )
      .subscribe((company) => {
        if (!company) return this.router.navigateByUrl('/dashboard/companies');
        const { fecIniActv } = company as Company;
        const fechaFormant = new DatePipe('es-PE').transform(
          fecIniActv,
          'dd/MM/yyyy'
        );
        company.fecIniActv = fechaFormant!;
        this.myForm.reset(company);
        this.currentCompanyCode = company.codigo;
        this.toggleForm();
        this.getBillsByCompany();
        return;
      });
    this.setTabIndex();
  }

  toggleForm() {
    if (!this.disabledButton) {
      this.myForm.disable();
      this.title = 'Ver empresa.';
      this.labelDisabledButton = 'Activar Formulario';
    } else {
      this.myForm.enable();
      this.title = 'Editar empresa';
      this.labelDisabledButton = 'Desactivar Formulario';
    }
    this.disabledButton = !this.disabledButton;
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
    const dateValue = new Date(fechaInicio!.value);
    if (!isNaN(dateValue.getTime())) {
      const formattedDate = this.datePipe.transform(dateValue, 'dd/MM/yyyy');
      fechaInicio?.setValue(formattedDate);
    } else {
      return;
    }
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

  deleteBill(code: string) {
    this.billService.deleteBill(code).subscribe({
      next: ({ mensaje }) => {
        this.myMessageService.toastBuilder(
          Severity.success,
          'Eliminación exitosa!',
          mensaje
        );
        this.getBillsByCompany();
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
          'Ocurrio un error!',
          'Algo salio mal, inténtelo más tarde'
        );
      },
    });
  }

  register() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.formatData();
    const account = this.myForm.value;
    let messageSuccess: any;
    if (account.codigo) {
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
    this.companiesService.register(account).subscribe({
      next: ({ mensaje }) => {
        this.myMessageService.toastBuilder(
          messageSuccess.severity,
          messageSuccess.message,
          mensaje
        );
        this.myForm.reset;
        this.router.navigateByUrl('/dashboard/companies');
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

  getBillsByCompany($event?: any) {
    let paginator: any;
    if ($event) {
      paginator = new PaginatorRequest();
      paginator = this.tableHelpers.assignPaginatorValues($event, paginator);
    }
    const tabIndex = this.getTabIndex();
    let enable;
    if (tabIndex === '0' || !tabIndex) {
      enable = EnableValue.enable;
    } else {
      enable = EnableValue.notEnable;
    }
    const codigo = this.currentCompanyCode;
    this.billService
      .getBillsByCompany(codigo!, enable, paginator)
      .subscribe((transactions) => {
        if (transactions.content.length > 0) {
          this.assignTransactionValue(transactions);
        } else {
          this.resetData();
        }
      });
  }

  onTabChange(event: any): void {
    localStorage.setItem('tabIndexCompaniesBills', event.index);
    this.getBillsByCompany();
  }

  setTabIndex() {
    const tabIndexMovements = localStorage.getItem('tabIndexCompaniesBills');
    if (!tabIndexMovements) return;
    this.activeIndexTab = parseInt(tabIndexMovements);
  }

  getTabIndex() {
    const tabIndexMovements = localStorage.getItem('tabIndexCompaniesBills');
    return tabIndexMovements;
  }
  resetData() {
    this.configTable.data = [];
    this.configTable.percentageList = [];
    this.tableNoData = true;
    this.configTable.percentageList = [];
  }

  assignTransactionValue(transactions: ListResponse<Bill>) {
    const { content, totalElements } = transactions;
    content.forEach((bill: Bill) => {
      let { fechaEmision } = bill;
      const fechaFormant = new DatePipe('es-PE').transform(
        fechaEmision,
        'dd/MM/yyyy'
      );
      bill!.fechaEmision = fechaFormant!;
    });
    this.tableNoData = false;
    this.configTable.loading = false;
    this.configTable.data = content;
    this.configTable.totalElements = totalElements;
  }
}
