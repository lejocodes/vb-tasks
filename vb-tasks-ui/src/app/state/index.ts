import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';

export const reducers: ActionReducerMap<AppState> = {
  tasks: (state: any) => state || {},
  users: (state: any) => state || {},
  groups: (state: any) => state || {}
};

export const effects = [
  // AuthEffects will be added when we import them in the features
];