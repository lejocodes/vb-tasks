import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TaskService } from '../../core/services';
import { Task, TaskStatistics } from '../../core/models';
import { LoadingSpinnerComponent, StatusBadgeComponent, PriorityBadgeComponent, EmptyStateComponent } from '../../shared/components';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ProgressBarModule,
    TableModule,
    ButtonModule,
    LoadingSpinnerComponent,
    StatusBadgeComponent,
    PriorityBadgeComponent,
    EmptyStateComponent
  ],
  template: `
    <div class="dashboard">
      <h1>Dashboard</h1>
      
      <div class="grid">
        <!-- Statistics Cards -->
        <div class="col-12 md:col-6 lg:col-3" *ngIf="statistics$ | async as stats">
          <p-card>
            <div class="stat-content">
              <div>
                <span class="stat-label">Total Tasks</span>
                <div class="stat-value">{{ stats.totalTasks }}</div>
              </div>
              <i class="pi pi-list stat-icon" style="color: #2196F3"></i>
            </div>
          </p-card>
        </div>

        <div class="col-12 md:col-6 lg:col-3" *ngIf="statistics$ | async as stats">
          <p-card>
            <div class="stat-content">
              <div>
                <span class="stat-label">In Progress</span>
                <div class="stat-value">{{ stats.tasksByStatus['InProgress'] || 0 }}</div>
              </div>
              <i class="pi pi-spinner stat-icon" style="color: #FFC107"></i>
            </div>
          </p-card>
        </div>

        <div class="col-12 md:col-6 lg:col-3" *ngIf="statistics$ | async as stats">
          <p-card>
            <div class="stat-content">
              <div>
                <span class="stat-label">Completed</span>
                <div class="stat-value">{{ stats.tasksByStatus['Completed'] || 0 }}</div>
              </div>
              <i class="pi pi-check-circle stat-icon" style="color: #4CAF50"></i>
            </div>
          </p-card>
        </div>

        <div class="col-12 md:col-6 lg:col-3" *ngIf="statistics$ | async as stats">
          <p-card>
            <div class="stat-content">
              <div>
                <span class="stat-label">Overdue</span>
                <div class="stat-value">{{ stats.overdueTasks }}</div>
              </div>
              <i class="pi pi-exclamation-triangle stat-icon" style="color: #F44336"></i>
            </div>
          </p-card>
        </div>
      </div>

      <!-- My Tasks Section -->
      <div class="mt-5">
        <p-card>
          <ng-template pTemplate="header">
            <div class="flex justify-content-between align-items-center px-3 pt-3">
              <h3 class="m-0">My Tasks</h3>
              <p-button 
                label="View All" 
                icon="pi pi-arrow-right" 
                [text]="true"
                (click)="navigateToTasks()"
              ></p-button>
            </div>
          </ng-template>

          <app-loading-spinner *ngIf="loadingTasks" text="Loading tasks..."></app-loading-spinner>
          
          <app-empty-state 
            *ngIf="!loadingTasks && (myTasks$ | async)?.length === 0"
            icon="pi-check-circle"
            title="No tasks assigned"
            message="You don't have any tasks assigned to you."
            actionLabel="Create Task"
            actionIcon="pi pi-plus"
            [action]="createTask.bind(this)"
          ></app-empty-state>

          <p-table 
            *ngIf="!loadingTasks && (myTasks$ | async)?.length > 0"
            [value]="(myTasks$ | async) || []"
            [rows]="5"
            [paginator]="false"
            styleClass="p-datatable-sm"
          >
            <ng-template pTemplate="header">
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Due Date</th>
                <th style="width: 8rem">Actions</th>
              </tr>
            </ng-template>
            <ng-template pTemplate="body" let-task>
              <tr>
                <td>{{ task.title }}</td>
                <td>
                  <app-status-badge [status]="task.status"></app-status-badge>
                </td>
                <td>
                  <app-priority-badge [priority]="task.priority"></app-priority-badge>
                </td>
                <td>{{ task.dueDate | date:'shortDate' }}</td>
                <td>
                  <p-button 
                    icon="pi pi-eye" 
                    [rounded]="true" 
                    [text]="true"
                    severity="info"
                    (click)="viewTask(task)"
                  ></p-button>
                  <p-button 
                    icon="pi pi-pencil" 
                    [rounded]="true" 
                    [text]="true"
                    severity="warning"
                    (click)="editTask(task)"
                    class="ml-2"
                  ></p-button>
                </td>
              </tr>
            </ng-template>
          </p-table>
        </p-card>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      padding: 0 1rem;
    }

    h1 {
      color: var(--text-color);
      margin-bottom: 2rem;
    }

    h3 {
      color: var(--text-color);
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
      .md\:col-6 {
        width: 50%;
      }
    }

    @media screen and (min-width: 992px) {
      .lg\:col-3 {
        width: 25%;
      }
    }

    .stat-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .stat-label {
      font-size: 0.875rem;
      color: var(--text-color-secondary);
      font-weight: 500;
    }

    .stat-value {
      font-size: 2rem;
      font-weight: 700;
      color: var(--text-color);
      margin-top: 0.5rem;
    }

    .stat-icon {
      font-size: 2.5rem;
      opacity: 0.8;
    }

    .mt-5 {
      margin-top: 3rem;
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

    .px-3 {
      padding-left: 1rem;
      padding-right: 1rem;
    }

    .pt-3 {
      padding-top: 1rem;
    }

    .ml-2 {
      margin-left: 0.5rem;
    }

    .m-0 {
      margin: 0;
    }

    :host ::ng-deep {
      .p-card {
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        border: 1px solid var(--surface-border);
      }

      .p-card-header {
        background-color: var(--surface-50);
        border-bottom: 1px solid var(--surface-border);
      }

      .p-datatable-sm .p-datatable-tbody > tr > td {
        padding: 0.5rem;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  private taskService = inject(TaskService);
  private router = inject(Router);

  statistics$!: Observable<TaskStatistics>;
  myTasks$!: Observable<Task[]>;
  loadingTasks = true;

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.statistics$ = this.taskService.getStatistics();
    this.myTasks$ = this.taskService.getMyTasks();
    
    // Set loading to false after tasks are loaded
    this.myTasks$.subscribe(() => {
      this.loadingTasks = false;
    });
  }

  navigateToTasks(): void {
    this.router.navigate(['/tasks']);
  }

  createTask(): void {
    this.router.navigate(['/tasks/new']);
  }

  viewTask(task: Task): void {
    this.router.navigate(['/tasks', task.id]);
  }

  editTask(task: Task): void {
    this.router.navigate(['/tasks', task.id, 'edit']);
  }
}