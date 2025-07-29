export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  isActive: boolean;
}

export interface UserSummary {
  id: string;
  name: string;
  email: string;
}