import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import {
  Course,
  CourseDetail,
  PagedResponse,
} from "../models/course.model";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: "root" })
export class CourseService {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/courses`;

  getAll() {
    return this.http
      .get<PagedResponse<Course>>(this.baseUrl, {
        params: {
          page: "1",
          pageSize: "50",
        },
      })
      .pipe(map((p) => p.items));
  }

  getById(id: string) {
    return this.http.get<CourseDetail>(`${this.baseUrl}/${id}`);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}