import { Component, inject } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';
import { pipe, Observable } from 'rxjs';
import { Opportunity } from 'src/app/dashboard/interfaces';
import { OpportunityService } from 'src/app/dashboard/services/opportunity.service';

@Component({
  selector: 'opportunities-user-page',
  templateUrl: './opportunities-user-page.component.html',
  styleUrls: ['./opportunities-user-page.component.css'],
})
export class OpportunitiesUserPageComponent {
  private opportunityService = inject(OpportunityService);

  public listOpportunities: Opportunity[] = [];
  public style = { color: 'var(--sidebar-color)' };
  public loading: boolean = true;
  public row: number = 10;
  public totalElements: number | undefined;
  
  ngOnInit(): void {
    this.getOpportunities();
  }
  onPageChange($event: PaginatorState) {
    console.log($event);
  }

  getOpportunities() {
    this.opportunityService.getOpportunitiesActive().subscribe((response) => {
      const { content, totalElements } = response;
      this.totalElements = totalElements;
      this.listOpportunities = content;
    });
  }
}
