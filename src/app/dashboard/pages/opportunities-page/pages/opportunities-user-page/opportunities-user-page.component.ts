import { Component, inject } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';
import { pipe, Observable } from 'rxjs';
import { Opportunity, PaginatorRequest } from 'src/app/dashboard/interfaces';
import { OpportunityService } from 'src/app/dashboard/services/opportunity.service';
import { TableHelpersService } from 'src/app/dashboard/services/tableHelpers.service';

@Component({
  selector: 'opportunities-user-page',
  templateUrl: './opportunities-user-page.component.html',
  styleUrls: ['./opportunities-user-page.component.css'],
})
export class OpportunitiesUserPageComponent {
  private opportunityService = inject(OpportunityService);
  private tableHelpers = inject(TableHelpersService);

  public listOpportunities: Opportunity[] = [];
  public style = { color: 'var(--sidebar-color)' };
  public loading: boolean = true;
  public row: number = 10;
  public totalElements: number | undefined;

  ngOnInit(): void {
    this.getOpportunities();
  }
  
  onPageChange($event: PaginatorState) {
    this.getOpportunities($event);
  }

  getOpportunities($event?: PaginatorState) {
    let paginator;
    if ($event) {
      paginator = new PaginatorRequest();
      paginator = this.tableHelpers.assignPaginatorValues($event, paginator);
    }
    this.opportunityService
      .getOpportunitiesActive(paginator)
      .subscribe((response) => {
        const { content, totalElements } = response;
        this.totalElements = totalElements;
        this.listOpportunities = content;
      });
  }
}
