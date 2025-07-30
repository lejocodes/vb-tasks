import { Injectable, inject, signal, computed } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { TaskService } from './task.service';
import { Task, TaskStatus, Priority, CreateTaskRequest, UpdateTaskRequest } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TaskStateService {
  private taskService = inject(TaskService);

  // Private writable signals
  private _tasks = signal<Task[]>([]);
  private _loading = signal<boolean>(false);
  private _error = signal<string | null>(null);
  private _selectedTask = signal<Task | null>(null);
  private _filter = signal<{
    status?: TaskStatus;
    priority?: Priority;
    assigneeId?: string;
    searchTerm?: string;
  }>({});

  // Public readonly signals
  tasks = this._tasks.asReadonly();
  loading = this._loading.asReadonly();
  error = this._error.asReadonly();
  selectedTask = this._selectedTask.asReadonly();
  filter = this._filter.asReadonly();

  // Computed signals
  filteredTasks = computed(() => {
    const tasks = this._tasks();
    const filter = this._filter();

    return tasks.filter(task => {
      if (filter.status && task.status !== filter.status) return false;
      if (filter.priority && task.priority !== filter.priority) return false;
      if (filter.assigneeId && !task.assignments.some(a => a.assigneeId === filter.assigneeId)) return false;
      if (filter.searchTerm) {
        const searchLower = filter.searchTerm.toLowerCase();
        const matchesTitle = task.title.toLowerCase().includes(searchLower);
        const matchesDescription = task.description?.toLowerCase().includes(searchLower);
        if (!matchesTitle && !matchesDescription) return false;
      }
      return true;
    });
  });

  taskCount = computed(() => this._tasks().length);
  filteredTaskCount = computed(() => this.filteredTasks().length);
  hasTasks = computed(() => this._tasks().length > 0);

  tasksByStatus = computed(() => {
    const tasks = this._tasks();
    return {
      new: tasks.filter(t => t.status === TaskStatus.New).length,
      inProgress: tasks.filter(t => t.status === TaskStatus.InProgress).length,
      review: tasks.filter(t => t.status === TaskStatus.Review).length,
      blocked: tasks.filter(t => t.status === TaskStatus.Blocked).length,
      completed: tasks.filter(t => t.status === TaskStatus.Completed).length
    };
  });

  // Methods
  async loadTasks(): Promise<void> {
    this._loading.set(true);
    this._error.set(null);
    
    try {
      const result = await firstValueFrom(this.taskService.getTasks());
      this._tasks.set(result.items);
    } catch (error) {
      this._error.set('Failed to load tasks');
      console.error('Error loading tasks:', error);
    } finally {
      this._loading.set(false);
    }
  }

  async loadMyTasks(): Promise<void> {
    this._loading.set(true);
    this._error.set(null);
    
    try {
      const tasks = await firstValueFrom(this.taskService.getMyTasks());
      this._tasks.set(tasks);
    } catch (error) {
      this._error.set('Failed to load your tasks');
      console.error('Error loading my tasks:', error);
    } finally {
      this._loading.set(false);
    }
  }

  async loadTask(id: string): Promise<void> {
    this._loading.set(true);
    this._error.set(null);
    
    try {
      const task = await firstValueFrom(this.taskService.getTask(id));
      this._selectedTask.set(task);
    } catch (error) {
      this._error.set('Failed to load task');
      console.error('Error loading task:', error);
    } finally {
      this._loading.set(false);
    }
  }

  async createTask(task: CreateTaskRequest): Promise<Task | null> {
    this._loading.set(true);
    this._error.set(null);
    
    try {
      const newTask = await firstValueFrom(this.taskService.createTask(task));
      this._tasks.update(tasks => [...tasks, newTask]);
      return newTask;
    } catch (error) {
      this._error.set('Failed to create task');
      console.error('Error creating task:', error);
      return null;
    } finally {
      this._loading.set(false);
    }
  }

  async updateTask(id: string, updates: UpdateTaskRequest): Promise<Task | null> {
    this._loading.set(true);
    this._error.set(null);
    
    try {
      const updatedTask = await firstValueFrom(this.taskService.updateTask(id, updates));
      this._tasks.update(tasks => 
        tasks.map(task => task.id === id ? updatedTask : task)
      );
      if (this._selectedTask()?.id === id) {
        this._selectedTask.set(updatedTask);
      }
      return updatedTask;
    } catch (error) {
      this._error.set('Failed to update task');
      console.error('Error updating task:', error);
      return null;
    } finally {
      this._loading.set(false);
    }
  }

  async deleteTask(id: string): Promise<boolean> {
    this._loading.set(true);
    this._error.set(null);
    
    try {
      await firstValueFrom(this.taskService.deleteTask(id));
      this._tasks.update(tasks => tasks.filter(task => task.id !== id));
      if (this._selectedTask()?.id === id) {
        this._selectedTask.set(null);
      }
      return true;
    } catch (error) {
      this._error.set('Failed to delete task');
      console.error('Error deleting task:', error);
      return false;
    } finally {
      this._loading.set(false);
    }
  }

  // Filter methods
  setFilter(filter: {
    status?: TaskStatus;
    priority?: Priority;
    assigneeId?: string;
    searchTerm?: string;
  }): void {
    this._filter.set(filter);
  }

  updateFilter(updates: Partial<{
    status?: TaskStatus;
    priority?: Priority;
    assigneeId?: string;
    searchTerm?: string;
  }>): void {
    this._filter.update(current => ({ ...current, ...updates }));
  }

  clearFilter(): void {
    this._filter.set({});
  }

  // Utility methods
  clearError(): void {
    this._error.set(null);
  }

  clearSelectedTask(): void {
    this._selectedTask.set(null);
  }
}