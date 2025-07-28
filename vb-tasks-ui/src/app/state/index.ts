import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import { authReducer } from './auth/auth.reducer';

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  tasks: (state: any) => state || {},
  users: (state: any) => state || {},
  groups: (state: any) => state || {}
};

export const effects = [
  // AuthEffects will be added when we import them in the features
];