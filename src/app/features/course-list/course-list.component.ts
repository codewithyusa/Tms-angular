import { Component, inject } from "@angular/core";
import { rxResource } from "@angular/core/rxjs-interop";
import { Router } from "@angular/router";
import { CourseCardComponent } from "../../ui/course-card/course-card.component";
import { Course } from "../../models/course.model";
import { CourseService } from "../../services/course.service";

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CourseCardComponent],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.scss'
})
export class CourseListComponent {
  private api = inject(CourseService);
  private router = inject(Router);

  coursesResource = rxResource({
    stream: () => this.api.getAll(),
  });

  handleEnroll(course: Course) {
    this.router.navigate(['/enroll'], {
      queryParams: { courseId: course.id, courseTitle: course.title }
    });
  }
}