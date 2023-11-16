import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'dashboard-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent {
  @Input() collapse: boolean = false;
  @Output() toggleCollapse = new EventEmitter<boolean>();

  private authService = inject(AuthService);

  emitEvent() {
    this.toggleCollapse.emit(!this.collapse);
  }
  logout(): void {
    this.authService.logout();
  }
}
