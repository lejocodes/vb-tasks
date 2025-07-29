import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { AuthResponse, LoginRequest, RegisterRequest } from '../models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private tokenSubject = new BehaviorSubject<string | null>(this.getStoredToken());
  
  token$ = this.tokenSubject.asObservable();

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, credentials)
      .pipe(
        tap(response => {
          this.storeToken(response.token);
          this.tokenSubject.next(response.token);
        })
      );
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/register`, data)
      .pipe(
        tap(response => {
          this.storeToken(response.token);
          this.tokenSubject.next(response.token);
        })
      );
  }

  logout(): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/logout`, {})
      .pipe(
        tap(() => {
          this.clearToken();
          this.tokenSubject.next(null);
        })
      );
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  isAuthenticated(): boolean {
    return true;
  }

  private storeToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  private getStoredToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  private clearToken(): void {
    localStorage.removeItem('auth_token');
  }
}