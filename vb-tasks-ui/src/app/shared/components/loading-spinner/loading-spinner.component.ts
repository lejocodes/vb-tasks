import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule, ProgressSpinnerModule],
  template: `
    <div class="loading-container" [class.overlay]="overlay">
      <p-progressSpinner 
        [style]="{width: strokeWidth, height: strokeWidth}"
        [strokeWidth]="strokeWidth"
        [fill]="fill"
        [animationDuration]="animationDuration"
      ></p-progressSpinner>
      <p class="loading-text" *ngIf="text">{{ text }}</p>
    </div>
  `,
  styles: [`
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }

    .loading-container.overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 9999;
    }

    .loading-text {
      margin-top: 1rem;
      font-size: 1.1rem;
      color: var(--text-color);
    }

    .overlay .loading-text {
      color: white;
    }
  `]
})
export class LoadingSpinnerComponent {
  @Input() overlay = false;
  @Input() text?: string;
  @Input() strokeWidth = '4';
  @Input() fill = 'var(--surface-ground)';
  @Input() animationDuration = '.5s';
}