import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Button } from 'primeng/button';
import { PaginatorState } from 'primeng/paginator';
import { Bill } from 'src/app/dashboard/interfaces/bill.interface';
import { Severity } from 'src/app/shared/enums/severity-toast.enum';
import { TableConfig } from 'src/app/shared/interfaces/table-config.interface';
import { MyMessageService } from 'src/app/shared/services/my-message-service.service';

@Component({
  selector: 'pages-table-add-opportunity',
  templateUrl: './table-add-opportunity.component.html',
  styleUrls: ['./table-add-opportunity.component.css'],
})
export class TableAddOpportunityComponent {
  @Input() config: TableConfig = { data: [], totalElements: 0, rows: 5 };
  @Output() currentPagePaginator = new EventEmitter<PaginatorState>();

  onPageChange($event: PaginatorState) {
    this.currentPagePaginator.emit($event);
  }

  toggleSelectBill(bill: Bill, col: any, button: Button) {
    const {
      codigo,
      activeButton,
      empresa: { codigo: codigoEmp },
    } = bill;
    bill.activeButton = !activeButton;
    const { actions } = col;
    const { severity } = button;
    if (severity === Severity.success) {
      actions[0].addBill(codigo,codigoEmp);
    } else {
      actions[1].deleteBill(codigo);
    }
  }


}
