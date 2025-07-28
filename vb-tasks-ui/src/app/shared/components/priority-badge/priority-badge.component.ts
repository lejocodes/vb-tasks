import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { Priority } from '../../../core/models';

@Component({
  selector: 'app-priority-badge',
  standalone: true,
  imports: [CommonModule, TagModule],
  template: `
    <p-tag 
      [value]="priority" 
      [severity]="getPrioritySeverity(priority)"
      [icon]="getPriorityIcon(priority)"
    ></p-tag>
  `
})
export class PriorityBadgeComponent {
  @Input() priority!: Priority;

  getPrioritySeverity(priority: Priority): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' | undefined {
    const severities: Record<Priority, 'secondary' | 'info' | 'warn' | 'danger'> = {
      [Priority.Low]: 'secondary',
      [Priority.Medium]: 'info',
      [Priority.High]: 'warn',
      [Priority.Critical]: 'danger'
    };
    return severities[priority];
  }

  getPriorityIcon(priority: Priority): string {
    const icons: Record<Priority, string> = {
      [Priority.Low]: 'pi pi-arrow-down',
      [Priority.Medium]: 'pi pi-minus',
      [Priority.High]: 'pi pi-arrow-up',
      [Priority.Critical]: 'pi pi-exclamation-triangle'
    };
    return icons[priority];
  }
}