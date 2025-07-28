import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../state/app.state';
import { selectCurrentUser } from '../../../state/auth/auth.selectors';
import * as AuthActions from '../../../state/auth/auth.actions';
import { User } from '../../../core/models';
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
        <ng-template pTemplate="end">
          <div class="flex align-items-center" *ngIf="currentUser$ | async as user">
            <span class="mr-3">{{ user.name }}</span>
            <p-button
              label="Logout"
              icon="pi pi-sign-out"
              (click)="logout()"
              [text]="true"
            ></p-button>
          </div>
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
  private store = inject(Store<AppState>);
  currentUser$: Observable<User | null>;
  menuItems: MenuItem[];

  constructor() {
    this.currentUser$ = this.store.select(selectCurrentUser);
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

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}