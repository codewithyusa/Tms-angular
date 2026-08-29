import { Component, input, inject, computed } from "@angular/core";
import { RouterLink } from '@angular/router';
import { rxResource } from "@angular/core/rxjs-interop";
import { CourseService } from "../../services/course.service";

@Component({
  selector: "app-course-detail",
  standalone: true,
  imports: [RouterLink],
  templateUrl: "./course-detail.component.html",
  styleUrl: "./course-detail.component.scss"
})
export class CourseDetailComponent {
  id = input.required<string>();
  private api = inject(CourseService);

  courseResource = rxResource({
    request: () => this.id(),
    loader: ({ request: id }) => this.api.getById(id)
  });

  seatsAvailable = computed(() => {
    const course = this.courseResource.value();
    if (!course) return 0;
    return course.maxCapacity - course.enrollmentCount;
  });

  isFull = computed(() => {
    const course = this.courseResource.value();
    if (!course) return false;
    return course.enrollmentCount >= course.maxCapacity;
  });
}