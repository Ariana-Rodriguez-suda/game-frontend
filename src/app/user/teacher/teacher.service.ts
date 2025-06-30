import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TeacherService {
  private apiUrl = 'https://game-backend-87km.onrender.com';

  constructor(private http: HttpClient) {}

  getTeacherDetails(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/teacher/${id}`);
  }

  updateTeacher(id: string, data: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/teacher/${id}`, data);
  }

  getMyClasses(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/teacher/${id}/classes`);
  }

  getStudentsByClass(classId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/class/${classId}/students`);
  }
}