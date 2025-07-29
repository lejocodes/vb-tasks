import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { TaskStateService, UserStateService } from '../../../core/services';
import { TaskStatus, Priority } from '../../../core/models';

interface SelectOption {
  label: string;
  value: any;
}

@Component({
  selector: 'app-task-filter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    ButtonModule,
    CalendarModule
  ],
  template: `
    <div class="task-filter">
      <div class="filter-row">
        <div class="filter-item">
          <label>Status</label>
          <p-dropdown 
            [(ngModel)]="selectedStatus" 
            [options]="statusOptions" 
            placeholder="All Statuses"
            [showClear]="true"
            (onChange)="applyFilters()"
          ></p-dropdown>
        </div>

        <div class="filter-item">
          <label>Priority</label>
          <p-dropdown 
            [(ngModel)]="selectedPriority" 
            [options]="priorityOptions" 
            placeholder="All Priorities"
            [showClear]="true"
            (onChange)="applyFilters()"
          ></p-dropdown>
        </div>

        <div class="filter-item">
          <label>Assigned To</label>
          <p-dropdown 
            [(ngModel)]="selectedAssignee" 
            [options]="userOptions" 
            placeholder="All Users"
            [showClear]="true"
            [filter]="true"
            (onChange)="applyFilters()"
          ></p-dropdown>
        </div>

        <div class="filter-item">
          <p-button 
            label="Clear Filters" 
            icon="pi pi-filter-slash"
            severity="secondary"
            (click)="clearFilters()"
            [disabled]="!hasActiveFilters()"
          ></p-button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .task-filter {
      margin-bottom: 1.5rem;
      padding: 1rem;
      background: var(--surface-50);
      border: 1px solid var(--surface-border);
      border-radius: 6px;
    }

    .filter-row {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      align-items: flex-end;
    }

    .filter-item {
      flex: 1;
      min-width: 200px;
    }

    .filter-item label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: var(--text-color-secondary);
      font-size: 0.875rem;
    }

    @media screen and (max-width: 768px) {
      .filter-item {
        width: 100%;
      }
    }

    :host ::ng-deep {
      .p-dropdown {
        width: 100%;
      }
    }
  `]
})
export class TaskFilterComponent implements OnInit {
  protected taskState = inject(TaskStateService);
  private userState = inject(UserStateService);

  selectedStatus: TaskStatus | null = null;
  selectedPriority: Priority | null = null;
  selectedAssignee: string | null = null;

  statusOptions: SelectOption[] = [
    { label: 'New', value: TaskStatus.New },
    { label: 'In Progress', value: TaskStatus.InProgress },
    { label: 'Review', value: TaskStatus.Review },
    { label: 'Blocked', value: TaskStatus.Blocked },
    { label: 'Completed', value: TaskStatus.Completed }
  ];

  priorityOptions: SelectOption[] = [
    { label: 'Low', value: Priority.Low },
    { label: 'Medium', value: Priority.Medium },
    { label: 'High', value: Priority.High },
    { label: 'Critical', value: Priority.Critical }
  ];

  userOptions: SelectOption[] = [];

  ngOnInit(): void {
    this.loadUsers();
    this.loadCurrentFilters();
  }

  async loadUsers(): Promise<void> {
    await this.userState.loadUsers();
    this.userOptions = this.userState.users().map(user => ({
      label: user.name,
      value: user.id
    }));
  }

  loadCurrentFilters(): void {
    const currentFilter = this.taskState.filter();
    this.selectedStatus = currentFilter.status || null;
    this.selectedPriority = currentFilter.priority || null;
    this.selectedAssignee = currentFilter.assigneeId || null;
  }

  applyFilters(): void {
    this.taskState.updateFilter({
      status: this.selectedStatus || undefined,
      priority: this.selectedPriority || undefined,
      assigneeId: this.selectedAssignee || undefined
    });
  }

  clearFilters(): void {
    this.selectedStatus = null;
    this.selectedPriority = null;
    this.selectedAssignee = null;
    this.taskState.clearFilter();
  }

  hasActiveFilters(): boolean {
    return !!(this.selectedStatus || this.selectedPriority || this.selectedAssignee);
  }
}