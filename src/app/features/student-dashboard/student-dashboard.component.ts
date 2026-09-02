import { Component, signal, computed, inject } from "@angular/core";
import { rxResource } from "@angular/core/rxjs-interop";
import { Router } from "@angular/router";
import { CourseCardComponent } from "../../ui/course-card/course-card.component";
import { Course } from "../../models/course.model";
import { CourseService } from "../../services/course.service";
import { EnrollmentService } from "../../services/enrollment.service";

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CourseCardComponent],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.scss'
})
export class StudentDashboardComponent {
  private api = inject(CourseService);
  private enrollmentService = inject(EnrollmentService);
  private router = inject(Router);

  studentName = signal("Liya Kebede");
  earnedCredits = signal(45);

  graduationStatus = computed(() =>
    this.earnedCredits() >= 120 ? "Eligible for Graduation" : "In Progress"
  );

  selectedCourse = signal<Course | null>(null);

  coursesResource = rxResource({
    stream: () => this.api.getAll(),
  });

  enrollmentsResource = rxResource({
    stream: () => this.enrollmentService.getAll(),
  });

  registerForClass() {
    this.earnedCredits.update((c) => c + 3);
  }

  handleEnroll(course: Course) {
    this.selectedCourse.set(course);
    this.router.navigate(['/enroll'], {
      queryParams: { courseId: course.id, courseTitle: course.title }
    });
  }
}