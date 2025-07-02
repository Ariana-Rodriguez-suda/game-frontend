import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TeacherUser } from './teacher.interface';

@Injectable({ providedIn: 'root' })
export class TeacherService {
  private apiUrl = 'https://game-backend-87km.onrender.com';

  constructor(private http: HttpClient) {}

getTeacherDetails(): Observable<TeacherUser> {
  const token = localStorage.getItem('token');
  return this.http.get<TeacherUser>(`${this.apiUrl}/teacher/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

  // Actualizar perfil del maestro (solo si agregas un PATCH /teacher/me)
  updateTeacher(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.patch(`${this.apiUrl}/teacher/me`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // Obtener clases del maestro autenticado
getMyClasses(): Observable<any[]> {
  const token = localStorage.getItem('token');
  return this.http.get<any[]>(`${this.apiUrl}/classes`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

  // Obtener estudiantes por clase
  getStudentsByClass(classId: number): Observable<any[]> {
    const token = localStorage.getItem('token');
    return this.http.get<any[]>(`${this.apiUrl}/classes/${classId}/students`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}
