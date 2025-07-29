import { TaskState } from './tasks/task.state';
import { UserState } from './users/user.state';
import { GroupState } from './groups/group.state';

export interface AppState {
  tasks: TaskState;
  users: UserState;
  groups: GroupState;
}