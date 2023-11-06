import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Severity } from './shared/enums/severity-toast.enum';
import { ToastBody } from './shared/interfaces/severity-toast.interface';
import { MyMessageService } from './shared/services/my-message-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private myMessageService = inject(MyMessageService);
  private primengConfig = inject(PrimeNGConfig);

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.primengConfig.zIndex = {
      modal: 1100,
      overlay: 1000,
      menu: 1000,
      tooltip: 1100,
    };
  }
}
