import { Injectable, inject } from '@angular/core';

import { Subject } from 'rxjs';

import { MessageService } from 'primeng/api';

import { ToastBody } from '../interfaces/severity-toast.interface';
import { Severity } from '../enums/severity-toast.enum';

@Injectable({
  providedIn: 'root',
})
export class MyMessageService {
  private messageService = inject(MessageService);

  private showToast(toast: ToastBody) {
    this.messageService.add(toast);
  }

  private toastBodyBuilder(
    severity: Severity,
    summary: string,
    detail: string
  ): ToastBody {
    const toast = { severity, summary, detail } as ToastBody;
    return toast;
  }

  toastBuilder(severity: Severity, summary: string, detail: string) {
    const toast = this.toastBodyBuilder(severity, summary, detail);
    this.showToast(toast);
  }
}
