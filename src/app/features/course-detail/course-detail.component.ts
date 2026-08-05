import { Component, input, effect } from "@angular/core";

@Component({
  selector: "app-course-detail",
  standalone: true,
  templateUrl: "./course-detail.component.html",
})
export class CourseDetailComponent {
  id = input.required<string>();

  constructor() {
    effect(() => {
      console.log(`Loading course detail for ID: ${this.id()}`);
    });
  }
}