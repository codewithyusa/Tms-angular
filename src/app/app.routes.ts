import { Routes } from '@angular/router';
import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
  // Public
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component')
        .then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register.component')
        .then(m => m.RegisterComponent)
  },
  {
    path: 'unauthorized',
    loadComponent: () =>
      import('./features/unauthorized/unauthorized.component')
        .then(m => m.UnauthorizedComponent)
  },

  // Student routes
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/student-dashboard/student-dashboard.component')
        .then(m => m.StudentDashboardComponent),
    canActivate: [roleGuard('Student')]
  },
  {
    path: 'courses',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'courses/:id',
    loadComponent: () =>
      import('./features/course-detail/course-detail.component')
        .then(m => m.CourseDetailComponent),
    canActivate: [roleGuard('Student')]
  },
  {
    path: 'enroll',
    loadComponent: () =>
      import('./features/enrollment-form/enrollment-form.component')
        .then(m => m.EnrollmentFormComponent),
    canActivate: [roleGuard('Student')]
  },

  // Instructor routes
  {
    path: 'instructor-dashboard',
    loadComponent: () =>
      import('./features/instructor-dashboard/instructor-dashboard.component')
        .then(m => m.InstructorDashboardComponent),
    canActivate: [roleGuard('Instructor')]
  },
  {
    path: 'enrollments',
    loadComponent: () =>
      import('./features/enrollment-list/enrollment-list.component')
        .then(m => m.EnrollmentListComponent),
    canActivate: [roleGuard('Instructor')]
  },
  {
    path: 'grade-submission',
    loadComponent: () =>
      import('./features/grade-submission/grade-submission.component')
        .then(m => m.GradeSubmissionComponent),
    canActivate: [roleGuard('Instructor')]
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];