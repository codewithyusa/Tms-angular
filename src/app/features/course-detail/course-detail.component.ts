import { Component, input, inject, computed } from "@angular/core";
import { RouterLink } from '@angular/router';
import { rxResource } from "@angular/core/rxjs-interop";
import { CourseService } from "../../services/course.service";

interface Course {
  title: string;
  code: string;
  maxCapacity: number;
  enrollmentCount: number;
}

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

  courseResource = rxResource<Course, string>({
    params: () => this.id(),
    stream: ({ params: id }) => this.api.getById(id)
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