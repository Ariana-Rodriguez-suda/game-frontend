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
}