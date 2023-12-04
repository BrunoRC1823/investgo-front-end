import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Opportunity } from 'src/app/dashboard/interfaces';

@Component({
  selector: 'pages-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent {
  @Input() sidebarVisible: boolean = false;
  @Input() opportunity: Opportunity | undefined;
  @Output() toggleSidebar = new EventEmitter<boolean>();
  
  toggleSidebarEmitter() {
    this.toggleSidebar.emit(this.sidebarVisible);
  }
}
