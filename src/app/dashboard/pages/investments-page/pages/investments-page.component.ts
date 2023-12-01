import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { EnableValue } from 'src/app/auth/enums/enable-value.enum';
import { Investment, PaginatorRequest } from 'src/app/dashboard/interfaces';
import { InvestmentService } from 'src/app/dashboard/services/investment.service';
import { TableHelpersService } from 'src/app/dashboard/services/tableHelpers.service';
import { TableConfig } from 'src/app/shared/interfaces/table-config.interface';

@Component({
  selector: 'dashboard-investments-page',
  templateUrl: './investments-page.component.html',
  styleUrls: ['./investments-page.component.css'],
})
export class InvestmentsPageComponent {
  private investmentService = inject(InvestmentService);
  private tableHelpers = inject(TableHelpersService);

  public enableValue: EnableValue = EnableValue.enable;
  public activeIndexTab = 0;
  public tableNoData: boolean = false;
  public configTable: TableConfig = {
    totalElements: 0,
    data: [],
    loading: false,
    columns: [
      { head: 'Fecha', name: 'auditoria', value: 'fecha' },
      {
        head: 'Deudor',
        name: 'oportunidadInversion',
        value: 'empresa.nombre',
      },
      { head: 'Inversión', name: 'montoInvertido', value: '' },
      { head: 'Ganancia', name: 'ganancia', value: '', plushCurrency: true },
      { head: 'Deuda', name: 'auditoria', value: 'enable', boolean: true },
      { head: 'Fecha Pago', name: 'oportunidadInversion', value: 'fechaPago' },
    ],
    rows: 5,
  };

  ngOnInit(): void {
    this.setTabIndex();
    this.enableValue = this.setEnableValue();
    this.getInvestmentsByCurrentUser(this.enableValue);
  }

  setTabIndex() {
    const tabIndexMovements = localStorage.getItem('tabIndexOpportunities');
    if (!tabIndexMovements) return;
    this.activeIndexTab = parseInt(tabIndexMovements);
  }

  setEnableValue() {
    let currentTabIndex = localStorage.getItem('tabIndexOpportunities');
    if (currentTabIndex === undefined) {
      currentTabIndex = '0';
    }
    return parseInt(currentTabIndex!) === 0
      ? EnableValue.enable
      : EnableValue.notEnable;
  }

  onTabChange($event: any) {
    localStorage.setItem('tabIndexOpportunities', $event);
    let enable = EnableValue.enable;
    if ($event > 0) {
      enable = EnableValue.notEnable;
    }
    this.getInvestmentsByCurrentUser(enable);
  }

  resetData() {
    this.configTable.data = [];
    this.configTable.percentageList = [];
    this.tableNoData = true;
    this.configTable.percentageList = [];
  }

  getInvestmentsByCurrentUser(enable: EnableValue, $event?: any) {
    enable = this.setEnableValue();
    let paginator;
    if ($event) {
      paginator = new PaginatorRequest();
      paginator = this.tableHelpers.assignPaginatorValues($event, paginator);
    }
    this.investmentService
      .getInvestmentsByCurrentUser(enable, paginator)
      .subscribe((investment) => {
        const { content, totalElements } = investment;
        if (content.length > 0) {
          this.assignValuesConfig(content, totalElements);
        } else {
          this.resetData();
        }
      });
  }

  assignValuesConfig(content: Investment[], totalElements: number) {
    content.forEach((investment) => {
      let { fecha } = investment!.auditoria;
      let { fechaPago } = investment!.oportunidadInversion;
      const fechaFormant = this.dateFormatter(fecha!);
      const fechaPagoFormat = this.dateFormatter(fechaPago!);
      investment!.auditoria.fecha = fechaFormant!;
      investment!.oportunidadInversion.fechaPago = fechaPagoFormat!;
    });
    this.percentageDifference(content);
    this.configTable.totalElements = totalElements;
    this.configTable.data = content;
    this.tableNoData = false;
  }

  percentageDifference(data: Investment[]) {
    const percentageList = data.map((item) => {
      if ('ganancia' in item && 'montoInvertido' in item) {
        const { montoInvertido, ganancia } = item;
        return (100 * ganancia) / montoInvertido - 100;
      }
      return;
    });
    this.configTable.percentageList = percentageList;
  }

  dateFormatter(fecha: string) {
    const fechaFormant = new DatePipe('es-PE').transform(fecha, 'dd/MM/yyyy');
    return fechaFormant;
  }
}
