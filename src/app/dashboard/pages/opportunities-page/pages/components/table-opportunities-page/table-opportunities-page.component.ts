import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { PaginatorState } from 'primeng/paginator';
import { Opportunity } from 'src/app/dashboard/interfaces';
import { Severity } from 'src/app/shared/enums/severity-toast.enum';
import { TableConfig } from 'src/app/shared/interfaces/table-config.interface';
import { MyMessageService } from 'src/app/shared/services/my-message-service.service';

@Component({
  selector: 'pages-table-opportunities-page',
  templateUrl: './table-opportunities-page.component.html',
  styleUrls: ['./table-opportunities-page.component.css'],
})
export class TableOpportunitiesPageComponent {
  @Input() config: TableConfig = { data: [], totalElements: 0, rows: 5 };
  @Output() currentPagePaginator = new EventEmitter<PaginatorState>();

  private confirmationService = inject(ConfirmationService);
  private myMessageService = inject(MyMessageService);

  public disableButton = true;

  onPageChange($event: PaginatorState) {
    this.currentPagePaginator.emit($event);
  }
  setValueTag(value: boolean) {    
    if (!value) {
      return 'En proceso';
    } else {
      return 'Terminado';
    }
  }
  typeSeverity(value: boolean) {
    if (!value) {
      return 'success';
    } else {
      return 'danger';
    }
  }
  confirm(event: Event, funcion: any, code: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Seguro que desea seguir?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        funcion(code);
      },
      reject: () => {
        this.myMessageService.toastBuilder(
          Severity.warn,
          'Acción abortada',
          'Se canceló la acción'
        );
      },
    });
  }
}
