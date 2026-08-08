import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { exhaustMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GradeService, GradePayload } from '../../services/grade.service';

@Component({
  selector: 'tms-grade-submission',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './grade-submission.component.html'
})
export class GradeSubmissionComponent {
  private api = inject(GradeService);
  private fb = inject(FormBuilder);

  gradeForm = this.fb.group({
    studentId: [101, [Validators.required, Validators.min(1)]],
    courseId: [302, [Validators.required, Validators.min(1)]],
    score: [88, [Validators.required, Validators.min(0), Validators.max(100)]]
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
              // Without this, an HTTP error would kill submitClick$ entirely —
              // exhaustMap propagates inner errors up and terminates the outer stream.
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
      const rawValue = this.gradeForm.getRawValue();
      this.submitClick$.next({
        studentId: Number(rawValue.studentId),
        courseId: Number(rawValue.courseId),
        score: Number(rawValue.score)
      });
    }
  }
}