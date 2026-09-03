import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subject, of } from 'rxjs';
import { exhaustMap, catchError } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { rxResource } from '@angular/core/rxjs-interop';
import { GradeService, GradePayload } from '../../services/grade.service';
import { CourseService } from '../../services/course.service';
import { EnrollmentService } from '../../services/enrollment.service';

@Component({
  selector: 'tms-grade-submission',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './grade-submission.component.html',
  styleUrl: './grade-submission.component.scss'
})
export class GradeSubmissionComponent {
  private api = inject(GradeService);
  private courseService = inject(CourseService);
  private enrollmentService = inject(EnrollmentService);
  private fb = inject(FormBuilder);

  coursesResource = rxResource({ stream: () => this.courseService.getAll() });
  enrollmentsResource = rxResource({ stream: () => this.enrollmentService.getAll() });

  gradeForm = this.fb.group({
    studentId: [null, [Validators.required]],
    courseId: [null, [Validators.required]],
    score: [null, [Validators.required, Validators.min(0), Validators.max(100)]]
  });

  isSubmitting = false;
  submissionStatus = '';

  private submitClick$ = new Subject<GradePayload>();

  constructor() {
    this.submitClick$
      .pipe(
        exhaustMap(payload => {
          this.isSubmitting = true;
          this.submissionStatus = 'Submitting grade to server...';
          return this.api.postGrade(payload).pipe(
            catchError(err => {
              this.isSubmitting = false;
              this.submissionStatus = `Submission failed: ${err.message || 'Server error'}`;
              return of(null);
            })
          );
        }),
        takeUntilDestroyed()
      )
      .subscribe(result => {
        if (result) {
          this.isSubmitting = false;
          this.submissionStatus = `Grade saved successfully! Record ID: ${result.id}`;
        }
      });
  }

  onSubmit() {
    if (this.gradeForm.valid) {
      const raw = this.gradeForm.getRawValue();
      this.submitClick$.next({
        studentId: Number(raw.studentId),
        courseId: Number(raw.courseId),
        score: Number(raw.score)
      });
    }
  }
}