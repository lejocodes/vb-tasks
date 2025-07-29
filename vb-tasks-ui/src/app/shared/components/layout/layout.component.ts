import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MenubarModule, ButtonModule],
  template: `
    <div class="layout">
      <p-menubar [model]="menuItems" styleClass="mb-0">
        <ng-template pTemplate="start">
          <h2 class="m-0 mr-4">VB-Tasks</h2>
        </ng-template>
      </p-menubar>

      <main class="content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .layout {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }

    .content {
      flex: 1;
      padding: 2rem;
      background-color: var(--surface-ground);
      overflow-y: auto;
    }

    :host ::ng-deep {
      .p-menubar {
        border-radius: 0;
        border: none;
        border-bottom: 1px solid var(--surface-border);
      }
    }
  `]
})
export class LayoutComponent {
  menuItems: MenuItem[];

  constructor() {
    this.menuItems = [
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
        routerLink: '/dashboard'
      },
      {
        label: 'Tasks',
        icon: 'pi pi-list',
        routerLink: '/tasks'
      },
      {
        label: 'Users',
        icon: 'pi pi-users',
        routerLink: '/users'
      },
      {
        label: 'Groups',
        icon: 'pi pi-user-plus',
        routerLink: '/groups'
      }
    ];
  }
}