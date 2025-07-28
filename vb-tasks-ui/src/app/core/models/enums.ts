export enum TaskStatus {
  New = 'New',
  InProgress = 'InProgress',
  Review = 'Review',
  Blocked = 'Blocked',
  Completed = 'Completed'
}

export enum Priority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
  Critical = 'Critical'
}

export enum AssigneeType {
  User = 'User',
  Group = 'Group'
}

export enum UserRole {
  Admin = 'Admin',
  Developer = 'Developer',
  Guest = 'Guest'
}