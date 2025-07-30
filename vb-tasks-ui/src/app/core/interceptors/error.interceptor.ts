import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unexpected error occurred';
      let severity = 'error';

      if (error.status === 401) {
        // Unauthorized
        errorMessage = 'You are not authorized to perform this action';
        console.error('Unauthorized access:', error.message);
      } else if (error.status === 403) {
        // Forbidden
        errorMessage = 'Access forbidden';
        console.error('Access forbidden:', error.message);
      } else if (error.status === 404) {
        // Not found
        errorMessage = 'The requested resource was not found';
        severity = 'warn';
        console.error('Resource not found:', error.message);
      } else if (error.status >= 500) {
        // Server error
        errorMessage = 'A server error occurred. Please try again later';
        console.error('Server error:', error.message);
        if (error.error) {
          console.error('Error details:', error.error);
        }
      } else if (error.status === 0) {
        // Network error
        errorMessage = 'Unable to connect to the server. Please check your connection';
      }

      // Show toast notification
      messageService.add({
        severity: severity as any,
        summary: 'Error',
        detail: errorMessage,
        life: 5000
      });

      // Re-throw the error so it can be handled by the component
      return throwError(() => error);
    })
  );
};