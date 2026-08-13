import { inject } from "@angular/core";
import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      // Extract RFC 7807 ProblemDetails "detail"
      const detailMessage =
        err.error?.detail ??
        "A system error occurred. Please try again.";

      if (err.status === 401) {
        // Session expired or user is not authenticated
        router.navigate(["/login"]);
      } else {
        // Display structured API error during development
        console.error("API Error Response:", detailMessage);
      }

      // IMPORTANT: don't swallow the error
      return throwError(() => err);
    })
  );
};