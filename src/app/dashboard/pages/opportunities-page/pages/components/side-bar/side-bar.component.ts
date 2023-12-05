import { DatePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  computed,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmEventType, ConfirmationService } from 'primeng/api';
import { InputNumberInputEvent } from 'primeng/inputnumber';
import {
  Bill,
  ListResponse,
  Opportunity,
  PaginatorRequest,
} from 'src/app/dashboard/interfaces';
import { InvestmentUser } from 'src/app/dashboard/interfaces/investmentUser.interface';
import { OpportunityBillsResponse } from 'src/app/dashboard/interfaces/opportunityBillsResponse.interface';
import { InvestmentUserService } from 'src/app/dashboard/services/ investmentUser.service';
import { OpportunityService } from 'src/app/dashboard/services/opportunity.service';
import { TableHelpersService } from 'src/app/dashboard/services/tableHelpers.service';
import { UserService } from 'src/app/dashboard/services/user.service';
import { Severity } from 'src/app/shared/enums/severity-toast.enum';
import { TableConfig } from 'src/app/shared/interfaces/table-config.interface';
import { MyMessageService } from 'src/app/shared/services/my-message-service.service';
import { ValidatorService } from 'src/app/shared/services/validator.service';

@Component({
  selector: 'pages-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent {
  @Input() sidebarVisible: boolean = false;
  @Input() opportunity: Opportunity | undefined;
  @Output() toggleSidebar = new EventEmitter<boolean>();

  private userService = inject(UserService);
  private investmentUserService = inject(InvestmentUserService);
  private opportunityService = inject(OpportunityService);
  private tableHelpers = inject(TableHelpersService);
  private validatorsService = inject(ValidatorService);
  private confirmationService = inject(ConfirmationService);
  private myMessageService = inject(MyMessageService);

  public balance = computed(() => this.userService.currentBalance());
  public auctionPercentage = 0;
  public percentage: number = 0;
  public maxValueMonto: number = 0;
  public revenue: number = 0;
  public configTable: TableConfig = {
    totalElements: 0,
    data: [],
    loading: true,
    columns: [
      { head: 'Usuario', name: 'usuario', value: 'codigo' },
      { head: 'Monto', name: 'montoInvertido', value: '' },
      { head: 'Fecha', name: 'auditoria', value: 'fecha' },
    ],
    size: 'small',
    rows: 5,
  };
  public configTableBills: TableConfig = {
    totalElements: 0,
    data: [],
    loading: true,
    columns: [
      { head: 'Descripción', name: 'descripcion', value: '' },
      { head: 'Monto', name: 'monto', value: '' },
    ],
    size: 'small',
    rows: 5,
  };
  private fb = inject(FormBuilder);
  public myForm: FormGroup = this.fb.group({
    oportunidadInversion: [null, [Validators.required]],
    montoInvertido: [null, [Validators.required]],
  });

  ngOnInit(): void {
    this.myForm.controls['oportunidadInversion'].setValue({
      codigo: this.opportunity?.codigo,
    });
    this.calculateRemainingPercentage(
      this.opportunity!.monto!,
      this.opportunity!.montoRecaudado!
    );
    this.maxValueMonto = this.opportunity!.monto!;
  }
  confirm() {
    this.confirmationService.confirm({
      accept: () => {
        this.register();
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.myMessageService.toastBuilder(
              Severity.info,
              'Ou... :(',
              'Inversion cancelada'
            );
            break;
          case ConfirmEventType.CANCEL:
            this.myMessageService.toastBuilder(
              Severity.success,
              'Ou... :(',
              'Inversion cancelada'
            );
            break;
        }
      },
    });
  }
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
    const investment = this.myForm.value;
    console.log(investment);
    
    this.investmentUserService.register(investment).subscribe({
      next: ({ mensaje }) => {
        this.myMessageService.toastBuilder(
          Severity.success,
          'Registro exitoso',
          mensaje
        );
        this.myForm.reset;
      },
      error: (err) => {
        console.log(err);        
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
  getInvestmentsUser($event?: any) {
    let paginator: any;
    if ($event) {
      paginator = new PaginatorRequest();
      paginator = this.tableHelpers.assignPaginatorValues($event, paginator);
    }
    this.investmentUserService
      .getInvestmentsUser(this.opportunity!.codigo, paginator)
      .subscribe((investments) => {
        if (investments.content.length > 0) {
          this.assignInvestmentsUserValue(investments);
        } else {
          this.resetData(this.configTable);
        }
      });
  }

  collapsedInvestors(event: boolean) {
    if (!event) {
      this.getInvestmentsUser();
    } else {
      this.resetData(this.configTable);
    }
  }
  assignInvestmentsUserValue(investments: ListResponse<InvestmentUser>) {
    const { content, totalElements } = investments;
    content.forEach((investments: InvestmentUser) => {
      const {
        auditoria: { fecha },
      } = investments;
      const fechaFormant = new DatePipe('es-PE').transform(fecha, 'dd/MM/yyyy');
      investments!.auditoria.fecha = fechaFormant!;
    });
    this.configTable.loading = false;
    this.configTable.data = content;
    this.configTable.totalElements = totalElements;
  }

  getBillsOpportunity($event?: any) {
    let paginator: any;
    if ($event) {
      paginator = new PaginatorRequest();
      paginator = this.tableHelpers.assignPaginatorValues($event, paginator);
    }
    this.opportunityService
      .getBillsOpportunity(this.opportunity!.codigo, paginator)
      .subscribe((opportunityResp) => {
        const { facturas } = opportunityResp;
        if (facturas.content.length > 0) {
          this.assignBillsOpportunityValue(facturas);
        } else {
          this.resetData(this.configTableBills);
        }
      });
  }
  assignBillsOpportunityValue(bills: ListResponse<Bill>) {
    const { content, totalElements } = bills;
    this.configTableBills.loading = false;
    this.configTableBills.data = content;
    this.configTableBills.totalElements = totalElements;
  }
  collapsedBillsOpportunity(event: boolean) {
    if (!event) {
      this.getBillsOpportunity();
    } else {
      this.resetData(this.configTableBills);
    }
  }
  onInput(event: InputNumberInputEvent) {
    let { value } = event;
    const { monto } = this.opportunity!;
    if (this.maxValueMonto <= parseInt(value)) {
      value = this.maxValueMonto.toString();
    }
    const percentage = (parseInt(value) * 100) / monto! / 100;
    this.auctionPercentage = percentage;
    this.revenue = this.calculateRevenue(parseInt(value));
  }

  calculateRevenue(value: number) {
    const { tir, rendimiento } = this.opportunity!;
    const valorFuturo = value * (tir! + 1);
    const valorRendimiento = value + rendimiento!;
    const suma = valorRendimiento + valorFuturo;
    const ganancia = suma / 2;
    return ganancia;
  }

  toggleSidebarEmitter() {
    this.toggleSidebar.emit(this.sidebarVisible);
  }

  getSeverity(rango: string) {
    if (rango === 'A') {
      return 'success';
    } else if (rango === 'B') {
      return 'warning';
    } else {
      return 'danger';
    }
  }

  calculateRemainingPercentage(monto: number, montoRecaudado: number) {
    const percentage = (montoRecaudado * 100) / monto;
    this.percentage = percentage;
    return this.percentage;
  }

  getDays(fechaCaducidad: string, fechaRegistro: string) {
    const unDiaEnMiliSegundos = 24 * 60 * 60 * 1000;
    const fechaRegistroMiliSegundos =
      Math.round(new Date(fechaRegistro).getTime() / unDiaEnMiliSegundos) *
      unDiaEnMiliSegundos;
    const fechaCaducidadMiliSegundos =
      Math.round(new Date(fechaCaducidad).getTime() / unDiaEnMiliSegundos) *
      unDiaEnMiliSegundos;
    const diferenciaMiliSegundos =
      fechaCaducidadMiliSegundos - fechaRegistroMiliSegundos;
    const diferenciaDias = diferenciaMiliSegundos / unDiaEnMiliSegundos;
    return Math.abs(diferenciaDias);
  }

  resetData(configTable: TableConfig) {
    setTimeout(() => {
      configTable.data = [];
      configTable.loading = true;
      configTable.totalElements = 0;
    }, 300);
  }
}
