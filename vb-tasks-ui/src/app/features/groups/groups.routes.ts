import { Routes } from '@angular/router';

export const GROUP_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./group-list/group-list.component').then(m => m.GroupListComponent)
  }
];