import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { ChipsModule } from 'primeng/chips';
import { TaskStateService, UserStateService, GroupStateService } from '../../../core/services';
import { TaskStatus, Priority, Task, User, Group } from '../../../core/models';
import { LoadingSpinnerComponent } from '../../../shared/components';

interface SelectOption {
  label: string;
  value: any;
}

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    CalendarModule,
    ButtonModule,
    ChipsModule,
    LoadingSpinnerComponent
  ],
  template: `
    <div class="task-form">
      <p-card>
        <ng-template pTemplate="header">
          <div class="flex justify-content-between align-items-center px-3 pt-3">
            <h2 class="m-0">{{ isEditMode ? 'Edit Task' : 'Create Task' }}</h2>
          </div>
        </ng-template>

        <app-loading-spinner *ngIf="loading" [text]="loadingText"></app-loading-spinner>

        <form [formGroup]="taskForm" (ngSubmit)="onSubmit()" *ngIf="!loading">
          <div class="grid">
            <div class="col-12">
              <div class="field">
                <label for="title">Title <span class="text-red-500">*</span></label>
                <input 
                  pInputText 
                  id="title" 
                  formControlName="title" 
                  class="w-full"
                  placeholder="Enter task title"
                />
                <small class="p-error" *ngIf="taskForm.get('title')?.invalid && taskForm.get('title')?.touched">
                  Title is required
                </small>
              </div>
            </div>

            <div class="col-12">
              <div class="field">
                <label for="description">Description</label>
                <textarea 
                  pInputTextarea 
                  id="description" 
                  formControlName="description" 
                  class="w-full"
                  rows="4"
                  placeholder="Enter task description"
                ></textarea>
              </div>
            </div>

            <div class="col-12 md:col-6">
              <div class="field">
                <label for="status">Status <span class="text-red-500">*</span></label>
                <p-dropdown 
                  id="status"
                  formControlName="status" 
                  [options]="statusOptions" 
                  placeholder="Select status"
                  styleClass="w-full"
                ></p-dropdown>
              </div>
            </div>

            <div class="col-12 md:col-6">
              <div class="field">
                <label for="priority">Priority <span class="text-red-500">*</span></label>
                <p-dropdown 
                  id="priority"
                  formControlName="priority" 
                  [options]="priorityOptions" 
                  placeholder="Select priority"
                  styleClass="w-full"
                ></p-dropdown>
              </div>
            </div>

            <div class="col-12 md:col-6">
              <div class="field">
                <label for="dueDate">Due Date</label>
                <p-calendar 
                  id="dueDate"
                  formControlName="dueDate" 
                  [showIcon]="true"
                  dateFormat="mm/dd/yy"
                  styleClass="w-full"
                ></p-calendar>
              </div>
            </div>

            <div class="col-12 md:col-6">
              <div class="field">
                <label for="assignedTo">Assign To</label>
                <p-dropdown 
                  id="assignedTo"
                  formControlName="assignedTo" 
                  [options]="userOptions" 
                  placeholder="Select user"
                  [filter]="true"
                  styleClass="w-full"
                  [showClear]="true"
                ></p-dropdown>
              </div>
            </div>

            <div class="col-12">
              <div class="field">
                <label for="tags">Tags</label>
                <p-chips 
                  id="tags"
                  formControlName="tags" 
                  styleClass="w-full"
                  placeholder="Add tags"
                ></p-chips>
              </div>
            </div>
          </div>

          <div class="flex justify-content-end gap-2 mt-4">
            <p-button 
              label="Cancel" 
              severity="secondary" 
              (click)="onCancel()"
              type="button"
            ></p-button>
            <p-button 
              [label]="isEditMode ? 'Update' : 'Create'" 
              type="submit"
              [disabled]="!taskForm.valid || saving"
              [loading]="saving"
            ></p-button>
          </div>
        </form>
      </p-card>
    </div>
  `,
  styles: [`
    .task-form {
      padding: 0 1rem;
      max-width: 800px;
      margin: 0 auto;
    }

    h2 {
      color: var(--text-color);
    }

    .field {
      margin-bottom: 1.5rem;
    }

    .field label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
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
      .md\\:col-6 {
        width: 50%;
      }
    }

    .w-full {
      width: 100%;
    }

    .flex {
      display: flex;
    }

    .justify-content-between {
      justify-content: space-between;
    }

    .justify-content-end {
      justify-content: flex-end;
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

    .mt-4 {
      margin-top: 1.5rem;
    }

    .m-0 {
      margin: 0;
    }

    .text-red-500 {
      color: #ef4444;
    }

    :host ::ng-deep {
      .p-card {
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        border: 1px solid var(--surface-border);
      }

      .p-dropdown,
      .p-calendar {
        width: 100%;
      }

      .p-error {
        color: #ef4444;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        display: block;
      }
    }
  `]
})
export class TaskFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  protected taskState = inject(TaskStateService);
  protected userState = inject(UserStateService);
  protected groupState = inject(GroupStateService);

  taskForm!: FormGroup;
  isEditMode = false;
  taskId: string | null = null;
  loading = false;
  saving = false;
  loadingText = 'Loading...';

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
    this.initializeForm();
    this.loadData();
    
    this.taskId = this.route.snapshot.paramMap.get('id');
    if (this.taskId) {
      this.isEditMode = true;
      this.loadTask();
    }
  }

  initializeForm(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: [TaskStatus.New, Validators.required],
      priority: [Priority.Medium, Validators.required],
      dueDate: [null],
      assignedTo: [null],
      tags: [[]]
    });
  }

  async loadData(): Promise<void> {
    // Load users for assignment dropdown
    await this.userState.loadUsers();
    this.userOptions = this.userState.users().map(user => ({
      label: user.name,
      value: user.id
    }));
  }

  async loadTask(): Promise<void> {
    if (!this.taskId) return;
    
    this.loading = true;
    this.loadingText = 'Loading task...';
    
    await this.taskState.loadTask(this.taskId);
    const task = this.taskState.selectedTask();
    
    if (task) {
      this.taskForm.patchValue({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate ? new Date(task.dueDate) : null,
        assignedTo: task.assignedTo?.id || null,
        tags: task.tags || []
      });
    }
    
    this.loading = false;
  }

  async onSubmit(): Promise<void> {
    if (!this.taskForm.valid) return;

    this.saving = true;
    const formValue = this.taskForm.value;
    
    const taskData: Partial<Task> = {
      title: formValue.title,
      description: formValue.description,
      status: formValue.status,
      priority: formValue.priority,
      dueDate: formValue.dueDate ? formValue.dueDate.toISOString() : undefined,
      tags: formValue.tags || []
    };

    // Handle assignment
    if (formValue.assignedTo) {
      const user = this.userState.getUserById(formValue.assignedTo);
      if (user) {
        taskData.assignedTo = user;
      }
    }

    try {
      if (this.isEditMode && this.taskId) {
        await this.taskState.updateTask(this.taskId, taskData);
      } else {
        await this.taskState.createTask(taskData);
      }
      
      this.router.navigate(['/tasks']);
    } catch (error) {
      console.error('Error saving task:', error);
    } finally {
      this.saving = false;
    }
  }

  onCancel(): void {
    this.router.navigate(['/tasks']);
  }
}