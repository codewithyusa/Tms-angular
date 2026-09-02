import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Enrollment } from '../models/enrollment.model';

export interface EnrollStudentRequest {
  studentId: number;
}

@Injectable({ providedIn: 'root' })
export class EnrollmentService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:5249/api';

  getAll(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${this.baseUrl}/enrollments`);
  }

  create(courseId: number, body: EnrollStudentRequest): Observable<Enrollment> {
    return this.http.post<Enrollment>(
      `${this.baseUrl}/courses/${courseId}/enrollments`,
      body
    );
  }

  approve(id: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/enrollments/${id}/approve`, {});
  }
}