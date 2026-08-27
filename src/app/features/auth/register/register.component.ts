import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private router = inject(Router);

  isLoading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');

  form = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(12)]],
    role: ['Student', Validators.required]
  });

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    try {
      await firstValueFrom(
        this.http.post('/api/1/auth/register', this.form.getRawValue())
      );
      this.successMessage.set('Registration successful! Redirecting to login...');
      setTimeout(() => this.router.navigate(['/login']), 2000);
    } catch (err: any) {
      const errors = err?.error?.errors;
      this.errorMessage.set(
        errors ? errors.join(', ') : 'Registration failed. Please try again.'
      );
    } finally {
      this.isLoading.set(false);
    }
  }
}