import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ChipModule } from 'primeng/chip';
import { GroupStateService } from '../../../core/services';
import { Group } from '../../../core/models';
import { LoadingSpinnerComponent, EmptyStateComponent } from '../../../shared/components';

@Component({
  selector: 'app-group-list',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    ChipModule,
    LoadingSpinnerComponent,
    EmptyStateComponent
  ],
  template: `
    <div class="group-list">
      <p-card>
        <ng-template pTemplate="header">
          <div class="flex justify-content-between align-items-center px-3 pt-3">
            <h2 class="m-0">Groups</h2>
          </div>
        </ng-template>

        <app-loading-spinner *ngIf="groupState.loading()" text="Loading groups..."></app-loading-spinner>
        
        <app-empty-state 
          *ngIf="!groupState.loading() && !groupState.hasGroups()"
          icon="pi-users"
          title="No groups found"
          message="No groups have been created in the system."
        ></app-empty-state>

        <p-table 
          #dt
          *ngIf="!groupState.loading() && groupState.hasGroups()"
          [value]="groupState.groups()"
          [paginator]="true"
          [rows]="10"
          [rowsPerPageOptions]="[10, 25, 50]"
          styleClass="p-datatable-sm"
          [globalFilterFields]="['name', 'description']"
        >
          <ng-template pTemplate="caption">
            <div class="flex">
              <span class="p-input-icon-left ml-auto">
                <i class="pi pi-search"></i>
                <input 
                  pInputText 
                  type="text" 
                  (input)="dt.filterGlobal($any($event.target).value, 'contains')" 
                  placeholder="Search groups..." 
                />
              </span>
            </div>
          </ng-template>
          <ng-template pTemplate="header">
            <tr>
              <th pSortableColumn="name">Name <p-sortIcon field="name"></p-sortIcon></th>
              <th>Description</th>
              <th pSortableColumn="members.length">Members <p-sortIcon field="members.length"></p-sortIcon></th>
              <th style="width: 10rem">Actions</th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-group>
            <tr>
              <td>{{ group.name }}</td>
              <td>{{ group.description || 'No description' }}</td>
              <td>
                <p-chip 
                  [label]="group.members.length + ' members'" 
                  icon="pi pi-users"
                  styleClass="custom-chip"
                ></p-chip>
              </td>
              <td>
                <p-button 
                  icon="pi pi-eye" 
                  [rounded]="true" 
                  [text]="true"
                  severity="info"
                  (click)="viewGroup(group)"
                  pTooltip="View Details"
                ></p-button>
                <p-button 
                  icon="pi pi-list" 
                  [rounded]="true" 
                  [text]="true"
                  severity="primary"
                  (click)="viewGroupTasks(group)"
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
    .group-list {
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

      .custom-chip .p-chip {
        background: var(--primary-100);
        color: var(--primary-700);
      }
    }
  `]
})
export class GroupListComponent implements OnInit {
  protected groupState = inject(GroupStateService);
  private router = inject(Router);

  ngOnInit(): void {
    this.loadGroups();
  }

  loadGroups(): void {
    this.groupState.loadGroups();
  }

  viewGroup(group: Group): void {
    // Navigate to group details (not implemented yet)
    console.log('View group:', group);
  }

  viewGroupTasks(group: Group): void {
    // Navigate to tasks filtered by group
    this.router.navigate(['/tasks'], { queryParams: { group: group.id } });
  }
}