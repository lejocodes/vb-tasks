import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { TaskStateService } from '../../../core/services';
import { Task } from '../../../core/models';
import { 
  LoadingSpinnerComponent, 
  StatusBadgeComponent, 
  PriorityBadgeComponent,
  EmptyStateComponent 
} from '../../../shared/components';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    TagModule,
    DividerModule,
    LoadingSpinnerComponent,
    StatusBadgeComponent,
    PriorityBadgeComponent,
    EmptyStateComponent
  ],
  template: `
    <div class="task-detail">
      <app-loading-spinner *ngIf="taskState.loading()" text="Loading task details..."></app-loading-spinner>
      
      <app-empty-state 
        *ngIf="!taskState.loading() && !task"
        icon="pi-exclamation-triangle"
        title="Task not found"
        message="The task you're looking for doesn't exist or has been deleted."
        actionLabel="Back to Tasks"
        actionIcon="pi pi-arrow-left"
        [action]="navigateToTasks.bind(this)"
      ></app-empty-state>

      <p-card *ngIf="!taskState.loading() && task">
        <ng-template pTemplate="header">
          <div class="flex justify-content-between align-items-center px-3 pt-3">
            <h2 class="m-0">{{ task.title }}</h2>
            <div class="flex gap-2">
              <p-button 
                icon="pi pi-pencil" 
                label="Edit" 
                (click)="editTask()"
              ></p-button>
              <p-button 
                icon="pi pi-trash" 
                label="Delete" 
                severity="danger"
                (click)="deleteTask()"
              ></p-button>
            </div>
          </div>
        </ng-template>

        <div class="task-content">
          <div class="grid">
            <div class="col-12 md:col-6">
              <div class="detail-item">
                <span class="detail-label">Status</span>
                <app-status-badge [status]="task.status"></app-status-badge>
              </div>
            </div>

            <div class="col-12 md:col-6">
              <div class="detail-item">
                <span class="detail-label">Priority</span>
                <app-priority-badge [priority]="task.priority"></app-priority-badge>
              </div>
            </div>

            <div class="col-12 md:col-6">
              <div class="detail-item">
                <span class="detail-label">Created</span>
                <span class="detail-value">{{ task.createdAt | date:'medium' }}</span>
              </div>
            </div>

            <div class="col-12 md:col-6">
              <div class="detail-item">
                <span class="detail-label">Due Date</span>
                <span class="detail-value">
                  {{ task.dueDate ? (task.dueDate | date:'mediumDate') : 'Not set' }}
                </span>
              </div>
            </div>

            <div class="col-12 md:col-6">
              <div class="detail-item">
                <span class="detail-label">Assigned To</span>
                <span class="detail-value">{{ task.assignedTo?.name || 'Unassigned' }}</span>
              </div>
            </div>

            <div class="col-12 md:col-6">
              <div class="detail-item">
                <span class="detail-label">Created By</span>
                <span class="detail-value">{{ task.createdBy || 'System' }}</span>
              </div>
            </div>
          </div>

          <p-divider></p-divider>

          <div class="description-section">
            <h3>Description</h3>
            <p class="description-text" *ngIf="task.description">{{ task.description }}</p>
            <p class="text-secondary" *ngIf="!task.description">No description provided.</p>
          </div>

          <div class="tags-section" *ngIf="task.tags && task.tags.length > 0">
            <p-divider></p-divider>
            <h3>Tags</h3>
            <div class="tags-container">
              <p-tag *ngFor="let tag of task.tags" [value]="tag" severity="info"></p-tag>
            </div>
          </div>

          <div class="actions-section">
            <p-divider></p-divider>
            <div class="flex justify-content-between">
              <p-button 
                icon="pi pi-arrow-left" 
                label="Back to Tasks" 
                severity="secondary"
                (click)="navigateToTasks()"
              ></p-button>
              <div class="flex gap-2">
                <p-button 
                  icon="pi pi-pencil" 
                  label="Edit Task" 
                  (click)="editTask()"
                ></p-button>
              </div>
            </div>
          </div>
        </div>
      </p-card>
    </div>
  `,
  styles: [`
    .task-detail {
      padding: 0 1rem;
      max-width: 1000px;
      margin: 0 auto;
    }

    h2, h3 {
      color: var(--text-color);
    }

    h3 {
      font-size: 1.2rem;
      margin-bottom: 1rem;
    }

    .task-content {
      padding: 1rem 0;
    }

    .grid {
      display: flex;
      flex-wrap: wrap;
      margin: -0.5rem;
    }

    .col-12 {
      width: 100%;
      padding: 0.5rem;
    }

    @media screen and (min-width: 768px) {
      .md\\:col-6 {
        width: 50%;
      }
    }

    .detail-item {
      margin-bottom: 1.5rem;
    }

    .detail-label {
      display: block;
      font-weight: 500;
      color: var(--text-color-secondary);
      margin-bottom: 0.5rem;
      font-size: 0.875rem;
    }

    .detail-value {
      color: var(--text-color);
      font-size: 1rem;
    }

    .description-section {
      margin: 1.5rem 0;
    }

    .description-text {
      color: var(--text-color);
      line-height: 1.6;
      white-space: pre-wrap;
    }

    .tags-section {
      margin: 1.5rem 0;
    }

    .tags-container {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .actions-section {
      margin-top: 2rem;
    }

    .flex {
      display: flex;
    }

    .justify-content-between {
      justify-content: space-between;
    }

    .align-items-center {
      align-items: center;
    }

    .gap-2 {
      gap: 0.5rem;
    }

    .px-3 {
      padding-left: 1rem;
      padding-right: 1rem;
    }

    .pt-3 {
      padding-top: 1rem;
    }

    .m-0 {
      margin: 0;
    }

    .text-secondary {
      color: var(--text-color-secondary);
      font-style: italic;
    }

    :host ::ng-deep {
      .p-card {
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        border: 1px solid var(--surface-border);
      }

      .p-divider {
        margin: 1.5rem 0;
      }
    }
  `]
})
export class TaskDetailComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  protected taskState = inject(TaskStateService);

  get task(): Task | null {
    return this.taskState.selectedTask();
  }

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (taskId) {
      this.loadTask(taskId);
    }
  }

  async loadTask(id: string): Promise<void> {
    await this.taskState.loadTask(id);
  }

  navigateToTasks(): void {
    this.router.navigate(['/tasks']);
  }

  editTask(): void {
    if (this.task) {
      this.router.navigate(['/tasks', this.task.id, 'edit']);
    }
  }

  async deleteTask(): Promise<void> {
    if (this.task && confirm(`Are you sure you want to delete "${this.task.title}"?`)) {
      const success = await this.taskState.deleteTask(this.task.id);
      if (success) {
        this.navigateToTasks();
      }
    }
  }
}