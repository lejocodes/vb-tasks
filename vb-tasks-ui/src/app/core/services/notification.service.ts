import { Injectable, inject } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private messageService = inject(MessageService);

  showSuccess(message: string, summary: string = 'Success'): void {
    this.messageService.add({
      severity: 'success',
      summary: summary,
      detail: message,
      life: 3000
    });
  }

  showError(message: string, summary: string = 'Error'): void {
    this.messageService.add({
      severity: 'error',
      summary: summary,
      detail: message,
      life: 5000
    });
  }

  showWarning(message: string, summary: string = 'Warning'): void {
    this.messageService.add({
      severity: 'warn',
      summary: summary,
      detail: message,
      life: 4000
    });
  }

  showInfo(message: string, summary: string = 'Info'): void {
    this.messageService.add({
      severity: 'info',
      summary: summary,
      detail: message,
      life: 3000
    });
  }
}