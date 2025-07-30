import { Injectable, inject, signal, computed } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UserService } from './user.service';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  private userService = inject(UserService);

  // Private writable signals
  private _users = signal<User[]>([]);
  private _currentUser = signal<User | null>(null);
  private _loading = signal<boolean>(false);
  private _error = signal<string | null>(null);

  // Public readonly signals
  users = this._users.asReadonly();
  currentUser = this._currentUser.asReadonly();
  loading = this._loading.asReadonly();
  error = this._error.asReadonly();

  // Computed signals
  userCount = computed(() => this._users().length);
  hasUsers = computed(() => this._users().length > 0);
  isLoggedIn = computed(() => this._currentUser() !== null);

  usersByRole = computed(() => {
    const users = this._users();
    return {
      admin: users.filter(u => u.role === 'Admin'),
      developer: users.filter(u => u.role === 'Developer'),
      guest: users.filter(u => u.role === 'Guest')
    };
  });

  // Methods
  async loadUsers(): Promise<void> {
    this._loading.set(true);
    this._error.set(null);
    
    try {
      const users = await firstValueFrom(this.userService.getUsers());
      this._users.set(users);
    } catch (error) {
      this._error.set('Failed to load users');
      console.error('Error loading users:', error);
    } finally {
      this._loading.set(false);
    }
  }

  async loadCurrentUser(): Promise<void> {
    this._loading.set(true);
    this._error.set(null);
    
    try {
      const user = await firstValueFrom(this.userService.getCurrentUser());
      this._currentUser.set(user);
    } catch (error) {
      this._error.set('Failed to load current user');
      console.error('Error loading current user:', error);
    } finally {
      this._loading.set(false);
    }
  }

  getUserById(id: string): User | undefined {
    return this._users().find(user => user.id === id);
  }

  // For demo purposes - set a mock current user
  setCurrentUser(user: User | null): void {
    this._currentUser.set(user);
  }

  // Utility methods
  clearError(): void {
    this._error.set(null);
  }

  reset(): void {
    this._users.set([]);
    this._currentUser.set(null);
    this._error.set(null);
  }
}