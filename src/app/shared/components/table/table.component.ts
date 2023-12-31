import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';
import { TableConfig } from '../../interfaces/table-config.interface';
import { ConfirmationService } from 'primeng/api';
import { MyMessageService } from '../../services/my-message-service.service';
import { Severity } from '../../enums/severity-toast.enum';

@Component({
  selector: 'shared-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  @Input() config: TableConfig = { data: [], totalElements: 0, rows: 5 };
  @Output() currentPagePaginator = new EventEmitter<PaginatorState>();

  private confirmationService = inject(ConfirmationService);
  private myMessageService = inject(MyMessageService);

  public disableButton = true;

  onPageChange($event: PaginatorState) {
    this.currentPagePaginator.emit($event);
  }

  typeSeverity(value: string, searchAttribute: string | undefined) {
    if (
      typeof value === 'object' &&
      value !== null &&
      searchAttribute !== undefined
    ) {
      if (searchAttribute in value) {
        let newValue = value[searchAttribute];
        switch (searchAttribute in value) {
          case newValue === 'Deposito':
            return 'success';
          case newValue === 'Retiro':
            return 'danger';
          case newValue === 'A':
            return 'success';
          case newValue === 'B':
            return 'warning';
          case newValue === 'C':
            return 'danger';
          default:
            return 'primary';
        }
      } else {
        return value;
      }
    } else {
      return value;
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
