import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../state/app.state';
import * as AuthActions from '../../../state/auth/auth.actions';
import { selectAuthLoading, selectAuthError } from '../../../state/auth/auth.selectors';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    MessageModule
  ],
  template: `
    <div class="login-container">
      <p-card [style]="{ width: '400px' }">
        <ng-template pTemplate="header">
          <h2 class="text-center m-0 p-3">Login to VB-Tasks</h2>
        </ng-template>
        
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="p-fluid">
          <div class="field mb-4">
            <label for="email" class="block mb-2">Email</label>
            <input
              pInputText
              type="email"
              id="email"
              formControlName="email"
              placeholder="Enter your email"
              [class.ng-invalid]="isFieldInvalid('email')"
              [class.ng-dirty]="isFieldInvalid('email')"
            />
            <small *ngIf="isFieldInvalid('email')" class="p-error block mt-1">
              <span *ngIf="loginForm.get('email')?.errors?.['required']">Email is required</span>
              <span *ngIf="loginForm.get('email')?.errors?.['email']">Please enter a valid email</span>
            </small>
          </div>

          <div class="field mb-4">
            <label for="password" class="block mb-2">Password</label>
            <p-password
              id="password"
              formControlName="password"
              placeholder="Enter your password"
              [feedback]="false"
              [toggleMask]="true"
              styleClass="w-full"
              inputStyleClass="w-full"
              [inputStyle]="{'width':'100%'}"
            ></p-password>
            <small *ngIf="isFieldInvalid('password')" class="p-error block mt-1">
              Password is required
            </small>
          </div>

          <p-message 
            *ngIf="error$ | async as error" 
            severity="error" 
            [text]="error"
            styleClass="mb-3 w-full"
          ></p-message>

          <p-button
            type="submit"
            label="Login"
            [loading]="(loading$ | async) || false"
            [disabled]="loginForm.invalid"
            styleClass="w-full"
          ></p-button>
        </form>
      </p-card>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: var(--surface-ground);
    }

    h2 {
      color: var(--text-color);
      font-weight: 600;
    }

    :host ::ng-deep {
      .p-card {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      .p-password {
        width: 100%;
      }

      .p-password-input {
        width: 100%;
      }
    }
  `]
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store<AppState>);
  private router = inject(Router);

  loginForm: FormGroup;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.loading$ = this.store.select(selectAuthLoading);
    this.error$ = this.store.select(selectAuthError);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.store.dispatch(AuthActions.login({ 
        credentials: this.loginForm.value 
      }));
    } else {
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });
    }
  }
}