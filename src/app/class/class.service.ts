import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClassService {
  private apiUrl = 'https://game-backend-87km.onrender.com';

  constructor(private http: HttpClient) {}

  createClass(data: { name: string }): Observable<any> {
    const userId = localStorage.getItem('userId');
    return this.http.post(`${this.apiUrl}/teacher/${userId}/classes`, data);
  }
}
