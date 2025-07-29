import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Unauthorized
        console.error('Unauthorized access:', error.message);
      } else if (error.status === 403) {
        // Forbidden
        console.error('Access forbidden:', error.message);
      } else if (error.status === 404) {
        // Not found
        console.error('Resource not found:', error.message);
      } else if (error.status >= 500) {
        // Server error
        console.error('Server error:', error.message);
      }

      // Re-throw the error so it can be handled by the component
      return throwError(() => error);
    })
  );
};