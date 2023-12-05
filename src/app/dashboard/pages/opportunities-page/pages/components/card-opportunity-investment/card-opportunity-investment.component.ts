import { Component, Input } from '@angular/core';
import { Opportunity } from 'src/app/dashboard/interfaces';

@Component({
  selector: 'pages-card-opportunity-investment',
  templateUrl: './card-opportunity-investment.component.html',
  styleUrls: ['./card-opportunity-investment.component.css'],
})
export class CardOpportunityInvestmentComponent {
  @Input() opportunity: Opportunity = {
    codigo: 'OPI000003',
    rendimiento: 0.22,
    tir: 0.22,
    enProceso: false,
    terminado: false,
    monto: 22222.0,
    montoRecaudado: 2222.0,
    fechaCaducidad: '2024-02-01',
    auditoria: {
      fecha: '2023-12-03T02:52:01.759036',
      enable: true,
    },
    fechaPago: '2024-02-15',
    empresa: {
      codigo: 'EMP000002',
      nomRepLegal: 'Ejemplo',
      apeRepLegal: 'Ejemplo',
      nombre: 'Ejemplo',
      ruc: '10111111111',
      razonSocial: 'Ejemplo S.R.L',
      fecIniActv: '2023-11-01',
      direccion: 'Ejemplo',
      telefono: '999999999',
      correo: ' ejemplo@hotmail.com',
      sector: 'Ejemplo',
      riesgo: {
        id: 3,
        rango: 'C',
        descripcion: 'El riesgo de invertir en esta empresa es alto',
      },
      auditoria: {
        enable: true,
      },
    },
  };
  public percentage: number = 0;
  public sidebarVisible: boolean = false;
  ngOnInit(): void {
    this.calculateRemainingPercentage(
      this.opportunity.monto!,
      this.opportunity.montoRecaudado!
    );
  }

  onToggleSidebar(event: any) {
    this.sidebarVisible = event;
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
}
