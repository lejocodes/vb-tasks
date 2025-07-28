import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="task-list">
      <h2>Tasks</h2>
      <p>Task list will be implemented here.</p>
    </div>
  `,
  styles: [`
    .task-list {
      max-width: 1200px;
      margin: 0 auto;
    }

    h2 {
      margin-bottom: 1rem;
      color: #333;
    }
  `]
})
export class TaskListComponent {}