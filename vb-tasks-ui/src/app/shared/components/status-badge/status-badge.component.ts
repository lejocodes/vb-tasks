import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { TaskStatus } from '../../../core/models';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule, TagModule],
  template: `
    <p-tag 
      [value]="getStatusLabel(status)" 
      [severity]="getStatusSeverity(status)"
      [rounded]="true"
    ></p-tag>
  `
})
export class StatusBadgeComponent {
  @Input() status!: TaskStatus;

  getStatusLabel(status: TaskStatus): string {
    const labels: Record<TaskStatus, string> = {
      [TaskStatus.New]: 'New',
      [TaskStatus.InProgress]: 'In Progress',
      [TaskStatus.Review]: 'Review',
      [TaskStatus.Blocked]: 'Blocked',
      [TaskStatus.Completed]: 'Completed'
    };
    return labels[status] || status;
  }

  getStatusSeverity(status: TaskStatus): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' | undefined {
    const severities: Record<TaskStatus, 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast'> = {
      [TaskStatus.New]: 'secondary',
      [TaskStatus.InProgress]: 'info',
      [TaskStatus.Review]: 'warn',
      [TaskStatus.Blocked]: 'danger',
      [TaskStatus.Completed]: 'success'
    };
    return severities[status];
  }
}