import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Task, TaskFilter, TaskStatistics } from '../../core/models';

export interface TaskState extends EntityState<Task> {
  selectedTaskId: string | null;
  loading: boolean;
  error: string | null;
  filter: TaskFilter;
  totalCount: number;
  statistics: TaskStatistics | null;
}

export const taskAdapter: EntityAdapter<Task> = createEntityAdapter<Task>();

export const initialTaskState: TaskState = taskAdapter.getInitialState({
  selectedTaskId: null,
  loading: false,
  error: null,
  filter: {
    pageNumber: 1,
    pageSize: 20
  },
  totalCount: 0,
  statistics: null
});