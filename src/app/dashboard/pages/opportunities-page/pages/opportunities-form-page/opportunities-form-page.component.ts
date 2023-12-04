import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { AutoComplete, AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { tap, switchMap, config } from 'rxjs';
import {
  Company,
  ListResponse,
  Opportunity,
  PaginatorRequest,
} from 'src/app/dashboard/interfaces';
import { Bill } from 'src/app/dashboard/interfaces/bill.interface';
import { BillService } from 'src/app/dashboard/services/bill.service';
import { CompaniesService } from 'src/app/dashboard/services/companies.service';
import { OpportunityService } from 'src/app/dashboard/services/opportunity.service';
import { TableHelpersService } from 'src/app/dashboard/services/tableHelpers.service';
import { Severity } from 'src/app/shared/enums/severity-toast.enum';
import { TableConfig } from 'src/app/shared/interfaces/table-config.interface';
import { MyMessageService } from 'src/app/shared/services/my-message-service.service';
import { ValidatorService } from 'src/app/shared/services/validator.service';

@Component({
  selector: 'app-opportunities-form-page',
  templateUrl: './opportunities-form-page.component.html',
  styleUrls: ['./opportunities-form-page.component.css'],
})
export class OpportunitiesFormPageComponent {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private myMessageService = inject(MyMessageService);
  private companiesService = inject(CompaniesService);
  private billService = inject(BillService);
  private opportunityService = inject(OpportunityService);
  private validatorsService = inject(ValidatorService);
  private tableHelpers = inject(TableHelpersService);

  public maxDate = new Date();
  public title: string = 'Registrar oportunidad de inversión.';
  public emptyMessageTable: any = {
    header: 'Ver facturas',
    body: 'Busca un empresa para poder ver sus facturas.',
  };

  public filteredCompanies: Company[] = [];
  public selectedCompany: string | undefined;
  public isEdit: boolean = false;

  public labelDisabledButton: string = 'Activar formulario';
  public activeIndexTab = 0;
  public showBills: boolean = false;
  public disabledButton: boolean = false;
  public listBillSelected: Bill[] | undefined;
  public montoTotalBills: number = 0;
  public fechaMaxima: Date | undefined;
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
        head: 'Acciones',
        actions: [
          {
            addBill: (code: string, codeEmp: string) =>
              this.addBillToList(code, codeEmp),
          },
          { deleteBill: (code: string) => this.deleteBillToList(code) },
          ,
        ],
      },
    ],
    rows: 5,
  };

  private fb = inject(FormBuilder);
  public myForm: FormGroup = this.fb.group({
    codigo: [''],
    empresa: [null, [Validators.required]],
    rendimiento: [null, [Validators.required]],
    tir: [null, [Validators.required]],
  });

  public formValueAuto: FormGroup = this.fb.group({
    monto: [0],
    fecha: [null],
  });

  ngOnInit(): void {
    this.opportunityService.cleanListBills().subscribe();
    this.formValueAuto.disable();
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

  activeAuto() {
    const empCtrl = this.myForm.controls['empresa'];
    empCtrl.enable();
  }

  onSelect(event: Company) {
    const empCtrl = this.myForm.controls['empresa'];
    empCtrl.setValue(event);
    empCtrl.disable();
    this.selectedCompany = event.codigo;
    this.getBillsByCompany();
    this.opportunityService.cleanListBills().subscribe();
  }

  filterCompanies(event: AutoCompleteCompleteEvent) {
    if (event) {
      this.listCompanies(event.query);
    }
    return;
  }

  resetData() {
    this.configTable.data = [];
    this.configTable.percentageList = [];
    this.tableNoData = true;
    this.configTable.percentageList = [];
  }

  assignBillsValue(transactions: ListResponse<Bill>) {
    const { content, totalElements } = transactions;
    content.forEach((bill: Bill) => {
      let { fechaEmision } = bill;
      const fechaFormant = new DatePipe('es-PE').transform(
        fechaEmision,
        'dd/MM/yyyy'
      );
      bill!.fechaEmision = fechaFormant!;
      bill!.activeButton = true;
    });
    this.tableNoData = false;
    this.configTable.loading = false;
    this.configTable.data = content;
    this.configTable.totalElements = totalElements;
  }

  formatData() {
    const {
      empresa: { codigo },
      ...rest
    } = this.myForm.value;

    return {
      ...rest,
      empresa: { codigo },
    };
  }

  onBlur(event: any) {
    const {
      target: { defaultValue },
    } = event;
    if (!(defaultValue.length > 0)) {
      this.resetData();
    }
  }

  resetDataList() {
    this.getBillsByCompany();
    this.listBillSelected = undefined;
    this.fechaMaxima = undefined;
    const montoCtrl = this.formValueAuto.controls['monto'];
    const fechaCtrl = this.formValueAuto.controls['fecha'];
    montoCtrl.setValue(null);
    fechaCtrl.setValue(null);
  }

  register() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    const empCtrl = this.myForm.controls['empresa'];
    empCtrl.enable();
    const opportunity = this.formatData();
    this.opportunityService.register(opportunity).subscribe({
      next: ({ mensaje }) => {
        this.myMessageService.toastBuilder(
          Severity.success,
          'Registro exitoso',
          mensaje
        );
        this.myForm.reset;
        this.router.navigateByUrl('/dashboard/opportunities');
      },
      error: (err) => {
        const { error } = err;
        console.log(err);

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

  addBillToList(code: string, codeEmp: string) {
    const addRequest = { codigoFactura: code, codigoEmpresa: codeEmp };
    this.opportunityService.addBillToList(addRequest).subscribe({
      next: ({ mensaje, listaFacturas }) => {
        this.assignValueMonto(listaFacturas!, 'suma');
        this.myMessageService.toastBuilder(
          Severity.success,
          'Acción exitosa',
          mensaje
        );
      },
      error: (err) => {
        const { error } = err;
        if (error.mensaje) {
          this.myMessageService.toastBuilder(
            Severity.error,
            'Error',
            error.mensaje
          );
          return;
        }
        this.myMessageService.toastBuilder(
          Severity.warn,
          'Algo salio mal!',
          'Inténtelo mas tarde'
        );
      },
    });
  }

  deleteBillToList(code: string) {
    this.opportunityService.deleteBillToList(code).subscribe({
      next: ({ mensaje, listaFacturas }) => {
        this.assignValueMonto(listaFacturas!, 'resta');
        this.myMessageService.toastBuilder(
          Severity.success,
          'Acción exitosa',
          mensaje
        );
      },
      error: (err) => {
        const { error } = err;
        if (error.mensaje) {
          this.myMessageService.toastBuilder(
            Severity.error,
            'Error',
            error.mensaje
          );
          return;
        }
        this.myMessageService.toastBuilder(
          Severity.warn,
          'Algo salio mal!',
          'Inténtelo mas tarde'
        );
      },
    });
  }

  assignValueMonto(list: Bill[], operator: string) {
    this.listBillSelected = list;
    const montoCtrl = this.formValueAuto.controls['monto'];
    const fechaCtrl = this.formValueAuto.controls['fecha'];
    let montoTotal: number = 0;
    if (this.listBillSelected.length === 0) {
      this.resetDataList();
    }
    this.listBillSelected?.forEach((bill) => {
      const { monto, fechaEmision } = bill;
      const dateBill = new Date(fechaEmision);
      if (operator === 'suma') {
        montoTotal += monto;
      } else {
        montoTotal = this.montoTotalBills;
        montoTotal -= monto;
      }
      if (
        !this.fechaMaxima ||
        dateBill > this.fechaMaxima ||
        dateBill < this.fechaMaxima
      ) {
        dateBill.setDate(dateBill.getDate() + 1);
        this.fechaMaxima = dateBill;
      }
    });
    this.montoTotalBills = montoTotal;

    montoCtrl.setValue(this.montoTotalBills);
    const fechaFormant = new DatePipe('es-PE').transform(
      this.fechaMaxima,
      'dd/MM/yyyy'
    );
    fechaCtrl.setValue(fechaFormant!);
  }

  getBillsByCompany($event?: any) {
    let paginator: any;
    if ($event) {
      paginator = new PaginatorRequest();
      paginator = this.tableHelpers.assignPaginatorValues($event, paginator);
    }
    const codigo = this.selectedCompany!;
    this.billService
      .getBillsByCompanyActive(codigo, paginator)
      .subscribe((transactions) => {
        if (transactions.content.length > 0) {
          this.assignBillsValue(transactions);
        } else {
          this.emptyMessageTable.body =
            'Esta empresa no tiene facturas activas.';
          this.emptyMessageTable.header = 'Oops.';
          this.resetData();
        }
      });
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

  clearList() {
    this.opportunityService.cleanListBills().subscribe({
      next: ({ mensaje }) => {
        this.resetDataList();
        this.myMessageService.toastBuilder(
          Severity.success,
          'Lista limpiada!',
          mensaje
        );
      },
      error: () => {
        this.myMessageService.toastBuilder(
          Severity.warn,
          'Algo salio mal!',
          'Inténtelo mas tarde'
        );
      },
    });
  }
}
