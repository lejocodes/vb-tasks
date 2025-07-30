import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import { Select } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ChipModule } from 'primeng/chip';
import { TaskStateService, UserStateService, GroupStateService, NotificationService } from '../../../core/services';
import { TaskStatus, Priority, Task, User, Group, CreateTaskRequest, UpdateTaskRequest, AssigneeType } from '../../../core/models';
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
    Textarea,
    Select,
    DatePicker,
    ButtonModule,
    InputGroupModule,
    InputGroupAddonModule,
    ChipModule,
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
                <p-textarea
                  id="description" 
                  formControlName="description" 
                  rows="4"
                  cols="30"
                  styleClass="w-full"
                  placeholder="Enter task description"
                ></p-textarea>
              </div>
            </div>

            <div class="col-12 md:col-6">
              <div class="field">
                <label for="status">Status <span class="text-red-500">*</span></label>
                <p-select
                  id="status"
                  formControlName="status" 
                  [options]="statusOptions" 
                  placeholder="Select status"
                  styleClass="w-full"
                  optionLabel="label"
                  optionValue="value"
                ></p-select>
              </div>
            </div>

            <div class="col-12 md:col-6">
              <div class="field">
                <label for="priority">Priority <span class="text-red-500">*</span></label>
                <p-select
                  id="priority"
                  formControlName="priority" 
                  [options]="priorityOptions" 
                  placeholder="Select priority"
                  styleClass="w-full"
                  optionLabel="label"
                  optionValue="value"
                ></p-select>
              </div>
            </div>

            <div class="col-12 md:col-6">
              <div class="field">
                <label for="dueDate">Due Date</label>
                <p-datepicker
                  id="dueDate"
                  formControlName="dueDate" 
                  dateFormat="mm/dd/yy"
                  styleClass="w-full"
                  [iconDisplay]="'input'"
                  [showIcon]="true"
                ></p-datepicker>
              </div>
            </div>

            <div class="col-12 md:col-6">
              <div class="field">
                <label for="assignedTo">Assign To</label>
                <p-select
                  id="assignedTo"
                  formControlName="assignedTo" 
                  [options]="userOptions" 
                  placeholder="Select user"
                  [filter]="true"
                  styleClass="w-full"
                  [showClear]="true"
                  optionLabel="label"
                  optionValue="value"
                ></p-select>
              </div>
            </div>

            <div class="col-12">
              <div class="field">
                <label for="tags">Tags</label>
                <div class="tags-container">
                  <p-chip 
                    *ngFor="let tag of taskForm.get('tags')?.value; let i = index"
                    [label]="tag"
                    [removable]="true"
                    (onRemove)="removeTag(i)"
                  ></p-chip>
                  <input 
                    pInputText
                    #tagInput
                    placeholder="Add tag and press Enter"
                    (keyup.enter)="addTag(tagInput)"
                    class="tag-input"
                  />
                </div>
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
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  protected taskState = inject(TaskStateService);
  protected userState = inject(UserStateService);
  protected groupState = inject(GroupStateService);
  private notificationService = inject(NotificationService);

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
        assignedTo: task.assignments?.length > 0 ? task.assignments[0].assigneeId : null,
        tags: task.tags || []
      });
    }
    
    this.loading = false;
  }

  async onSubmit(): Promise<void> {
    if (!this.taskForm.valid) return;

    this.saving = true;
    const formValue = this.taskForm.value;
    
    try {
      if (this.isEditMode && this.taskId) {
        const updateRequest: UpdateTaskRequest = {
          title: formValue.title,
          description: formValue.description,
          status: formValue.status,
          priority: formValue.priority,
          dueDate: formValue.dueDate ? formValue.dueDate.toISOString() : null,
          tags: formValue.tags || []
        };
        await this.taskState.updateTask(this.taskId, updateRequest);
        this.notificationService.showSuccess('Task updated successfully');
      } else {
        const createRequest: CreateTaskRequest = {
          title: formValue.title,
          description: formValue.description,
          priority: formValue.priority,
          dueDate: formValue.dueDate ? formValue.dueDate.toISOString() : null,
          tags: formValue.tags || [],
          assignments: formValue.assignedTo ? [{
            assigneeType: AssigneeType.User,
            assigneeId: formValue.assignedTo
          }] : []
        };
        await this.taskState.createTask(createRequest);
        this.notificationService.showSuccess('Task created successfully');
      }
      
      this.router.navigate(['/tasks']);
    } catch (error) {
      console.error('Error saving task:', error);
    } finally {
      this.saving = false;
    }
  }

  addTag(input: HTMLInputElement): void {
    const value = input.value.trim();
    if (value) {
      const currentTags = this.taskForm.get('tags')?.value || [];
      if (!currentTags.includes(value)) {
        this.taskForm.patchValue({
          tags: [...currentTags, value]
        });
      }
      input.value = '';
    }
  }

  removeTag(index: number): void {
    const currentTags = this.taskForm.get('tags')?.value || [];
    currentTags.splice(index, 1);
    this.taskForm.patchValue({
      tags: [...currentTags]
    });
  }

  onCancel(): void {
    this.router.navigate(['/tasks']);
  }
}