import { AuthState } from './auth/auth.state';
import { TaskState } from './tasks/task.state';
import { UserState } from './users/user.state';
import { GroupState } from './groups/group.state';

export interface AppState {
  auth: AuthState;
  tasks: TaskState;
  users: UserState;
  groups: GroupState;
}