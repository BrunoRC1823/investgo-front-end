import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { EnableValue } from 'src/app/auth/enums/enable-value.enum';
import { PaginatorRequest, ListResponse, Company } from 'src/app/dashboard/interfaces';
import { CompaniesService } from 'src/app/dashboard/services/companies.service';
import { TableHelpersService } from 'src/app/dashboard/services/tableHelpers.service';
import { Severity } from 'src/app/shared/enums/severity-toast.enum';
import { TableConfig } from 'src/app/shared/interfaces/table-config.interface';
import { MyMessageService } from 'src/app/shared/services/my-message-service.service';

@Component({
  selector: 'opportunities-admin-page',
  templateUrl: './opportunities-admin-page.component.html',
  styleUrls: ['./opportunities-admin-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpportunitiesAdminPageComponent {
  public activeIndexTab = 0;
  private companiesService = inject(CompaniesService);
  private tableHelpers = inject(TableHelpersService);
  private myMessageService = inject(MyMessageService);

  public tableNoData: boolean = true;
  public configTable: TableConfig = {
    totalElements: 0,
    data: [],
    loading: true,
    columns: [
      { head: 'Nombre', name: 'nombre', value: '' },
      { head: 'Razon Social', name: 'razonSocial', value: 'fecha' },
      { head: 'Sector', name: 'sector', value: '' },
      {
        head: 'Riesgo',
        name: 'riesgo',
        value: 'rango',
        highligh: 'true',
      },
      { head: 'Correo', name: 'correo', value: '' },
      { head: 'Telefono', name: 'telefono', value: '' },
      {
        head: 'Acciones',
        buttons: [
          {
            icon: 'pi pi-eye',
            severity: 'help',
            routerLink: '/dashboard/companies/show-company/',
          },
          {
            icon: 'pi pi-trash',
            severity: 'danger',
            onClick: (code: string) => this.disableCompany(code),
          },
        ],
      },
    ],
    rows: 5,
  };

  ngOnInit(): void {
    this.setTabIndex();
  }

  onTabChange(event: any): void {
    localStorage.setItem('tabIndexOpportunitiesAdmin', event.index);
  }

  setTabIndex() {
    const tabIndexMovements = localStorage.getItem('tabIndexOpportunitiesAdmin');
    if (!tabIndexMovements) return;
    this.activeIndexTab = parseInt(tabIndexMovements);
  }


  getCompanies($event?: any) {
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
    this.companiesService
      .getCompanies(enable, paginator)
      .subscribe((companies) => {
        if (companies.content.length > 0) {
          this.assignCompaniesValue(companies);
        } else {
          this.resetData();
        }
      });
  }

  resetData() {
    this.configTable.data = [];
    this.configTable.percentageList = [];
    this.tableNoData = true;
    this.configTable.percentageList = [];
  }

  assignCompaniesValue(companies: ListResponse<Company>) {
    const { content, totalElements } = companies;
    this.tableNoData = false;
    this.configTable.loading = false;
    this.configTable.data = content;
    this.configTable.totalElements = totalElements;
  }

  getTabIndex() {
    const tabIndexMovements = localStorage.getItem('tabIndexCompanies');
    return tabIndexMovements;
  }

  disableCompany(code: string) {
    this.companiesService.disableCompany(code).subscribe({
      next: ({ mensaje }) => {
        this.myMessageService.toastBuilder(
          Severity.success,
          'Eliminación exitosa!',
          mensaje
        );
        this.getCompanies();
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
