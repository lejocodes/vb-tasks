import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { TaskService } from '../../../core/services';
import { Task, PagedResult, TaskFilter } from '../../../core/models';
import { 
  LoadingSpinnerComponent, 
  StatusBadgeComponent, 
  PriorityBadgeComponent, 
  EmptyStateComponent 
} from '../../../shared/components';
import { TaskFilterComponent } from '../task-filter/task-filter.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    TooltipModule,
    LoadingSpinnerComponent,
    StatusBadgeComponent,
    PriorityBadgeComponent,
    EmptyStateComponent,
    TaskFilterComponent
  ],
  template: `
    <div class="task-list">
      <p-card>
        <ng-template pTemplate="header">
          <div class="flex justify-content-between align-items-center px-3 pt-3">
            <h2 class="m-0">Tasks</h2>
            <p-button 
              label="New Task" 
              icon="pi pi-plus" 
              (click)="createTask()"
            ></p-button>
          </div>
        </ng-template>

        <app-task-filter *ngIf="!taskState.loading()"></app-task-filter>

        <app-loading-spinner *ngIf="taskState.loading()" text="Loading tasks..."></app-loading-spinner>
        
        <ng-container *ngIf="!loading && (tasks$ | async) as tasksResult">
          <app-empty-state 
            *ngIf="!tasksResult || tasksResult.items.length === 0"
            icon="pi-list"
            title="No tasks yet"
            message="Create your first task to get started."
            actionLabel="Create Task"
            actionIcon="pi pi-plus"
            [action]="createTask.bind(this)"
          ></app-empty-state>

          <p-table 
            #dt
            *ngIf="tasksResult && tasksResult.items.length > 0"
            [value]="tasksResult.items"
            [paginator]="true"
            [rows]="currentFilter.pageSize"
            [totalRecords]="tasksResult.totalCount"
            [rowsPerPageOptions]="[10, 25, 50]"
            styleClass="p-datatable-sm"
            [globalFilterFields]="['title', 'description']"
            (onPage)="onPageChange($event)"
          >
          <ng-template pTemplate="caption">
            <div class="flex">
              <span class="p-input-icon-left ml-auto">
                <i class="pi pi-search"></i>
                <input 
                  pInputText 
                  type="text" 
                  (input)="onSearch($any($event.target).value)" 
                  placeholder="Search tasks..." 
                />
              </span>
            </div>
          </ng-template>
          <ng-template pTemplate="header">
            <tr>
              <th pSortableColumn="title">Title <p-sortIcon field="title"></p-sortIcon></th>
              <th pSortableColumn="status">Status <p-sortIcon field="status"></p-sortIcon></th>
              <th pSortableColumn="priority">Priority <p-sortIcon field="priority"></p-sortIcon></th>
              <th pSortableColumn="dueDate">Due Date <p-sortIcon field="dueDate"></p-sortIcon></th>
              <th pSortableColumn="assignedTo">Assigned To <p-sortIcon field="assignedTo"></p-sortIcon></th>
              <th style="width: 10rem">Actions</th>
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
              <td>{{ task.assignedTo?.name || 'Unassigned' }}</td>
              <td>
                <p-button 
                  icon="pi pi-eye" 
                  [rounded]="true" 
                  [text]="true"
                  severity="info"
                  (click)="viewTask(task)"
                  pTooltip="View"
                ></p-button>
                <p-button 
                  icon="pi pi-pencil" 
                  [rounded]="true" 
                  [text]="true"
                  severity="warn"
                  (click)="editTask(task)"
                  class="ml-2"
                  pTooltip="Edit"
                ></p-button>
                <p-button 
                  icon="pi pi-trash" 
                  [rounded]="true" 
                  [text]="true"
                  severity="danger"
                  (click)="deleteTask(task)"
                  class="ml-2"
                  pTooltip="Delete"
                ></p-button>
              </td>
            </tr>
          </ng-template>
        </p-table>
        </ng-container>
      </p-card>
    </div>
  `,
  styles: [`
    .task-list {
      padding: 0 1rem;
    }

    h2 {
      color: var(--text-color);
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

    .ml-auto {
      margin-left: auto;
    }

    .m-0 {
      margin: 0;
    }

    :host ::ng-deep {
      .p-card {
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        border: 1px solid var(--surface-border);
      }

      .p-datatable-sm .p-datatable-tbody > tr > td {
        padding: 0.5rem;
      }

      .p-input-icon-left > input {
        padding-left: 2.5rem;
      }

      .p-input-icon-left > .pi {
        position: absolute;
        left: 0.75rem;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  `]
})
export class TaskListComponent implements OnInit {
  protected taskState = inject(TaskStateService);
  private router = inject(Router);

  tasks$!: Observable<PagedResult<Task>>;
  loading = true;
  currentFilter: Partial<TaskFilter> = {
    pageNumber: 1,
    pageSize: 10
  };

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.loading = true;
    this.tasks$ = this.taskService.getTasks(this.currentFilter);
    this.tasks$.subscribe(() => {
      this.loading = false;
    });
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

  async deleteTask(task: Task): Promise<void> {
    if (confirm(`Are you sure you want to delete "${task.title}"?`)) {
      this.taskService.deleteTask(task.id).subscribe(() => {
        this.loadTasks();
      });
    }
  }

  onPageChange(event: any): void {
    this.currentFilter.pageNumber = event.page + 1; // PrimeNG uses 0-based index
    this.currentFilter.pageSize = event.rows;
    this.loadTasks();
  }
}