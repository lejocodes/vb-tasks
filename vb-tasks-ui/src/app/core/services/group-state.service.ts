import { Injectable, inject, signal, computed } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { GroupService } from './group.service';
import { Group } from '../models';

@Injectable({
  providedIn: 'root'
})
export class GroupStateService {
  private groupService = inject(GroupService);

  // Private writable signals
  private _groups = signal<Group[]>([]);
  private _selectedGroup = signal<Group | null>(null);
  private _loading = signal<boolean>(false);
  private _error = signal<string | null>(null);

  // Public readonly signals
  groups = this._groups.asReadonly();
  selectedGroup = this._selectedGroup.asReadonly();
  loading = this._loading.asReadonly();
  error = this._error.asReadonly();

  // Computed signals
  groupCount = computed(() => this._groups().length);
  hasGroups = computed(() => this._groups().length > 0);

  totalMembers = computed(() => {
    const groups = this._groups();
    return groups.reduce((total, group) => total + group.memberIds.length, 0);
  });

  // Methods
  async loadGroups(): Promise<void> {
    this._loading.set(true);
    this._error.set(null);
    
    try {
      const groups = await firstValueFrom(this.groupService.getGroups());
      this._groups.set(groups);
    } catch (error) {
      this._error.set('Failed to load groups');
      console.error('Error loading groups:', error);
    } finally {
      this._loading.set(false);
    }
  }

  async loadGroup(id: string): Promise<void> {
    this._loading.set(true);
    this._error.set(null);
    
    try {
      const group = await firstValueFrom(this.groupService.getGroup(id));
      this._selectedGroup.set(group);
    } catch (error) {
      this._error.set('Failed to load group');
      console.error('Error loading group:', error);
    } finally {
      this._loading.set(false);
    }
  }

  getGroupById(id: string): Group | undefined {
    return this._groups().find(group => group.id === id);
  }

  isUserInGroup(userId: string, groupId: string): boolean {
    const group = this.getGroupById(groupId);
    return group ? group.memberIds.includes(userId) : false;
  }

  getUserGroups(userId: string): Group[] {
    return this._groups().filter(group => group.memberIds.includes(userId));
  }

  // Utility methods
  clearError(): void {
    this._error.set(null);
  }

  clearSelectedGroup(): void {
    this._selectedGroup.set(null);
  }

  reset(): void {
    this._groups.set([]);
    this._selectedGroup.set(null);
    this._error.set(null);
  }
}