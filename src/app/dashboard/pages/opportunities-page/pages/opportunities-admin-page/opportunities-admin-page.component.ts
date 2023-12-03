import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { EnableValue } from 'src/app/auth/enums/enable-value.enum';
import {
  PaginatorRequest,
  ListResponse,
  Opportunity,
} from 'src/app/dashboard/interfaces';
import { OpportunityService } from 'src/app/dashboard/services/opportunity.service';
import { TableHelpersService } from 'src/app/dashboard/services/tableHelpers.service';
import { Severity } from 'src/app/shared/enums/severity-toast.enum';
import { TableConfig } from 'src/app/shared/interfaces/table-config.interface';
import { MyMessageService } from 'src/app/shared/services/my-message-service.service';

@Component({
  selector: 'opportunities-admin-page',
  templateUrl: './opportunities-admin-page.component.html',
  styleUrls: ['./opportunities-admin-page.component.css'],
})
export class OpportunitiesAdminPageComponent {
  public activeIndexTab = 0;
  private opportunityService = inject(OpportunityService);
  private tableHelpers = inject(TableHelpersService);
  private myMessageService = inject(MyMessageService);

  public tableNoData: boolean = true;
  public configTable: TableConfig = {
    totalElements: 0,
    data: [],
    loading: true,
    columns: [
      {
        head: 'Rendimiento',
        name: 'rendimiento',
        value: 'fecha',
        percentage: true,
      },
      { head: 'TIR', name: 'tir', value: '', percentage: true },
      { head: 'Estado', name: 'terminado', value: '', highligh: 'true' },
      { head: 'Monto', name: 'monto', value: '' },
      { head: 'Fecha caducidad', name: 'fechaCaducidad', value: '' },
      { head: 'Empresa', name: 'empresa', value: 'razonSocial' },
      {
        head: 'Acciones',
        buttons: [
          {
            icon: 'pi pi-eye',
            severity: 'help',
            routerLink: '/dashboard/opportunities/show-opportunity/',
          },
          {
            icon: 'pi pi-trash',
            severity: 'danger',
            onClick: (code: string) => this.deleteOpportunity(code),
          },
        ],
      },
    ],
    rows: 5,
  };

  ngOnInit(): void {
    this.setTabIndex();
    this.getOpportunitiesEnable();
  }

  onTabChange(event: any): void {
    localStorage.setItem('tabIndexOpportunitiesAdmin', event.index);
    this.getOpportunitiesEnable();
  }

  setTabIndex() {
    const tabIndexMovements = localStorage.getItem(
      'tabIndexOpportunitiesAdmin'
    );
    if (!tabIndexMovements) return;
    this.activeIndexTab = parseInt(tabIndexMovements);
  }

  getTabIndex() {
    const tabIndexMovements = localStorage.getItem(
      'tabIndexOpportunitiesAdmin'
    );
    return tabIndexMovements;
  }

  resetData() {
    this.configTable.data = [];
    this.configTable.percentageList = [];
    this.tableNoData = true;
    this.configTable.percentageList = [];
  }

  assignOpportunitiesValue(opportunities: ListResponse<Opportunity>) {
    const { content, totalElements } = opportunities;
    content.forEach((opportunity: Opportunity) => {
      const { fechaCaducidad } = opportunity;
      const fechaFormant = new DatePipe('es-PE').transform(
        fechaCaducidad,
        'dd/MM/yyyy'
      );
      opportunity!.fechaCaducidad = fechaFormant!;
      this.tableNoData = false;
      this.configTable.loading = false;
      this.configTable.data = content;
      this.configTable.totalElements = totalElements;
    });
  }

  getOpportunitiesEnable($event?: any) {
    let paginator: any;
    if ($event) {
      paginator = new PaginatorRequest();
      paginator = this.tableHelpers.assignPaginatorValues($event, paginator);
    }
    const tabIndex = this.getTabIndex();
    let enable;
    if (tabIndex === '0' || !tabIndex) {
      enable = EnableValue.notEnable;
    } else {
      enable = EnableValue.enable;
    }
    this.opportunityService
      .getOpportunitiesEnable(enable, paginator)
      .subscribe((opportunities) => {
        if (opportunities.content.length > 0) {
          this.assignOpportunitiesValue(opportunities);
        } else {
          this.resetData();
        }
      });
  }

  deleteOpportunity(code: string) {
    this.opportunityService.deleteOpportunity(code).subscribe({
      next: ({ mensaje }) => {
        this.myMessageService.toastBuilder(
          Severity.success,
          'Eliminación exitosa!',
          mensaje
        );
        this.getOpportunitiesEnable();
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
}
