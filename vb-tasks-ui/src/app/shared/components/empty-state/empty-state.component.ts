import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `
    <div class="empty-state">
      <i [class]="'pi ' + icon" class="empty-icon"></i>
      <h3>{{ title }}</h3>
      <p *ngIf="message">{{ message }}</p>
      <p-button 
        *ngIf="actionLabel" 
        [label]="actionLabel"
        [icon]="actionIcon"
        (click)="onAction()"
        styleClass="mt-3"
      ></p-button>
    </div>
  `,
  styles: [`
    .empty-state {
      text-align: center;
      padding: 3rem 2rem;
      color: var(--text-color-secondary);
    }

    .empty-icon {
      font-size: 4rem;
      color: var(--surface-400);
      margin-bottom: 1rem;
      display: block;
    }

    h3 {
      color: var(--text-color);
      margin-bottom: 0.5rem;
    }

    p {
      margin: 0;
      color: var(--text-color-secondary);
    }
  `]
})
export class EmptyStateComponent {
  @Input() icon = 'pi-inbox';
  @Input() title = 'No items found';
  @Input() message?: string;
  @Input() actionLabel?: string;
  @Input() actionIcon?: string;
  @Input() action?: () => void;

  onAction(): void {
    if (this.action) {
      this.action();
    }
  }
}