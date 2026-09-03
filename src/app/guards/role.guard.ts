import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

export const roleGuard = (requiredRole: string): CanActivateFn => {
  return () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    const user = auth.currentUser();

    if (!user) {
      return router.createUrlTree(["/login"]);
    }

    // Student-only routes: block Admin and Instructor
    if (requiredRole === 'Student') {
      if (user.role === 'Student') return true;
      // Redirect Admin/Instructor to their dashboard
      return router.createUrlTree(["/instructor-dashboard"]);
    }

    // Instructor/Admin routes
    if (auth.hasRole(requiredRole)) {
      return true;
    }

    return router.createUrlTree(["/unauthorized"]);
  };
};