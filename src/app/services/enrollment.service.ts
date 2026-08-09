import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Enrollment } from '../models/enrollment.model';

@Injectable({ providedIn: 'root' })
export class EnrollmentService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:5249/api';

  getAll(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${this.baseUrl}/enrollments`);
  }

  create(courseId: number, payload: { studentId: number }): Observable<Enrollment> {
    return this.http.post<Enrollment>(`${this.baseUrl}/courses/${courseId}/enrollments`, payload);
  }

  approve(id: string): Observable<Enrollment> {
    return this.http.post<Enrollment>(`${this.baseUrl}/enrollments/${id}/approve`, {});
  }
}