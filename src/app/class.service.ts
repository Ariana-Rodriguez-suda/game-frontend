import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ClassService {
  private apiUrl = 'https://game-backend-87km.onrender.com'; // cambia si tu backend usa otro puerto

  constructor(private http: HttpClient) {}

createClass(data: { name: string }) {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });
console.log('Token enviado:', token);
  return this.http.post(this.apiUrl + '/classes', data, { headers });
}
}
