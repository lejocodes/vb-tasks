import { TaskStatus, Priority, AssigneeType } from './enums';
import { UserSummary } from './user.model';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  dueDate?: Date | null;
  createdBy: UserSummary;
  createdAt: Date;
  updatedAt: Date;
  assignments: Assignment[];
  tags: string[];
}

export interface CreateTaskRequest {
  title: string;
  description: string;
  priority: Priority;
  dueDate?: Date | null;
  tags: string[];
  assignments: Assignment[];
}

export interface UpdateTaskRequest {
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  dueDate?: Date | null;
  tags: string[];
}

export interface Assignment {
  assigneeType: AssigneeType;
  assigneeId: string;
}

export interface TaskFilter {
  searchTerm?: string;
  status?: TaskStatus;
  priority?: Priority;
  assigneeId?: string;
  dueDateFrom?: Date;
  dueDateTo?: Date;
  pageNumber: number;
  pageSize: number;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

export interface TaskStatistics {
  totalTasks: number;
  tasksByStatus: { [key: string]: number };
  tasksByPriority: { [key: string]: number };
  overdueTasks: number;
}