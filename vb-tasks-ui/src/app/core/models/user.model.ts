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

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  name: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}