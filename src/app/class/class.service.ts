import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClassService {
  private apiUrl = 'https://game-backend-87km.onrender.com';

  constructor(private http: HttpClient) {}

createClass(data: any) {
  const token = localStorage.getItem('token');
  return this.http.post('/classes', data, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

getMyClasses() {
  const token = localStorage.getItem('token');
  return this.http.get('/classes', {
    headers: { Authorization: `Bearer ${token}` }
  });
}

getStudents(classId: number) {
  const token = localStorage.getItem('token');
  return this.http.get(`/classes/${classId}/students`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Eliminar clase
deleteClass(classId: number) {
  const token = localStorage.getItem('token');
  return this.http.delete(`${this.apiUrl}/classes/${classId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Actualizar clase
updateClass(classId: number, data: any) {
  const token = localStorage.getItem('token');
  return this.http.patch(`${this.apiUrl}/classes/${classId}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

getClassById(classId: number) {
  const token = localStorage.getItem('token');
  return this.http.get(`https://game-backend-87km.onrender.com/classes/${classId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

}