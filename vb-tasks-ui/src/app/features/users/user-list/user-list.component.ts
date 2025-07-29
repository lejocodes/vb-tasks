import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { UserStateService } from '../../../core/services';
import { User } from '../../../core/models';
import { LoadingSpinnerComponent, EmptyStateComponent } from '../../../shared/components';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    TableModule,
    TagModule,
    ButtonModule,
    InputTextModule,
    LoadingSpinnerComponent,
    EmptyStateComponent
  ],
  template: `
    <div class="user-list">
      <p-card>
        <ng-template pTemplate="header">
          <div class="flex justify-content-between align-items-center px-3 pt-3">
            <h2 class="m-0">Users</h2>
          </div>
        </ng-template>

        <app-loading-spinner *ngIf="userState.loading()" text="Loading users..."></app-loading-spinner>
        
        <app-empty-state 
          *ngIf="!userState.loading() && !userState.hasUsers()"
          icon="pi-users"
          title="No users found"
          message="No users are registered in the system."
        ></app-empty-state>

        <p-table 
          #dt
          *ngIf="!userState.loading() && userState.hasUsers()"
          [value]="userState.users()"
          [paginator]="true"
          [rows]="10"
          [rowsPerPageOptions]="[10, 25, 50]"
          styleClass="p-datatable-sm"
          [globalFilterFields]="['name', 'email', 'role']"
        >
          <ng-template pTemplate="caption">
            <div class="flex">
              <span class="p-input-icon-left ml-auto">
                <i class="pi pi-search"></i>
                <input 
                  pInputText 
                  type="text" 
                  (input)="dt.filterGlobal($any($event.target).value, 'contains')" 
                  placeholder="Search users..." 
                />
              </span>
            </div>
          </ng-template>
          <ng-template pTemplate="header">
            <tr>
              <th pSortableColumn="name">Name <p-sortIcon field="name"></p-sortIcon></th>
              <th pSortableColumn="email">Email <p-sortIcon field="email"></p-sortIcon></th>
              <th pSortableColumn="role">Role <p-sortIcon field="role"></p-sortIcon></th>
              <th>Tasks Assigned</th>
              <th style="width: 10rem">Actions</th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-user>
            <tr>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>
                <p-tag 
                  [value]="user.role" 
                  [severity]="getRoleSeverity(user.role)"
                ></p-tag>
              </td>
              <td>{{ getTaskCount(user.id) }}</td>
              <td>
                <p-button 
                  icon="pi pi-eye" 
                  [rounded]="true" 
                  [text]="true"
                  severity="info"
                  (click)="viewUser(user)"
                  pTooltip="View Profile"
                ></p-button>
                <p-button 
                  icon="pi pi-list" 
                  [rounded]="true" 
                  [text]="true"
                  severity="primary"
                  (click)="viewUserTasks(user)"
                  class="ml-2"
                  pTooltip="View Tasks"
                ></p-button>
              </td>
            </tr>
          </ng-template>
        </p-table>
      </p-card>
    </div>
  `,
  styles: [`
    .user-list {
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
export class UserListComponent implements OnInit {
  protected userState = inject(UserStateService);
  private router = inject(Router);

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userState.loadUsers();
  }

  viewUser(user: User): void {
    // Navigate to user profile (not implemented yet)
    console.log('View user:', user);
  }

  viewUserTasks(user: User): void {
    // Navigate to tasks filtered by user
    this.router.navigate(['/tasks'], { queryParams: { assignee: user.id } });
  }

  getRoleSeverity(role: string): string {
    switch (role) {
      case 'Admin':
        return 'danger';
      case 'Developer':
        return 'success';
      case 'Guest':
        return 'info';
      default:
        return 'secondary';
    }
  }

  getTaskCount(userId: string): number {
    // This would normally come from the task state or a computed value
    // For now, return a placeholder
    return 0;
  }
}