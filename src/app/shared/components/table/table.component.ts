import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';
import { TableLazyLoadEvent } from 'primeng/table';
import { TableConfig } from '../../interfaces/table-config.interface';

@Component({
  selector: 'shared-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  @Input() config: TableConfig = { data: [], totalElements: 0 };

  @Output() lazyLoadEmitter = new EventEmitter<TableLazyLoadEvent>();
  @Output() currentPagePaginator = new EventEmitter<PaginatorState>();

  public rows: number = 5;

  lazyLoadEmit($event: TableLazyLoadEvent) {
    this.lazyLoadEmitter.emit($event);
  }

  onPageChange($event: PaginatorState) {
    this.currentPagePaginator.emit($event);
  }
 
}
