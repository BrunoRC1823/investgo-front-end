import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  collapse: boolean = false;
  toggleCollapse(collapse: boolean) {
    this.collapse = collapse;
  }
}
