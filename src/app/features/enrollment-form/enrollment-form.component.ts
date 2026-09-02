import { Component, inject, signal } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormArray,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { EnrollmentService } from "../../services/enrollment.service";

@Component({
  selector: "app-enrollment-form",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./enrollment-form.component.html",
  styleUrl: "./enrollment-form.component.scss"
})
export class EnrollmentFormComponent {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private enrollmentService = inject(EnrollmentService);

  submitted = signal(false);
  error = signal<string | null>(null);
  loading = signal(false);

  private courseIdFromRoute = Number(
    this.route.snapshot.queryParamMap.get('courseId') ?? ''
  );

  form = this.fb.nonNullable.group({
    studentId: [
      "",
      [Validators.required, Validators.pattern("^[0-9]+$"), Validators.min(1)],
    ],
    courseId: [
      this.courseIdFromRoute ? String(this.courseIdFromRoute) : "",
      Validators.required
    ],
    term: ["Fall 2026", Validators.required],
    notes: [""],
    backupCourses: this.fb.array<FormControl<string>>([]),
  });

  get backups() {
    return this.form.controls.backupCourses;
  }

  addBackup() {
    this.backups.push(
      this.fb.control("", {
        nonNullable: true,
        validators: Validators.required,
      })
    );
  }

  removeBackup(index: number) {
    this.backups.removeAt(index);
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();
    const studentId = Number(raw.studentId);
    const courseId = Number(raw.courseId);

    this.loading.set(true);
    this.error.set(null);

    this.enrollmentService.create(courseId, { studentId }).subscribe({
      next: () => {
        this.loading.set(false);
        this.submitted.set(true);
      },
      error: (err: { error?: { detail?: string } }) => {
        this.loading.set(false);
        this.error.set(
          err?.error?.detail ?? 'Enrollment failed. Please try again.'
        );
      }
    });
  }
}