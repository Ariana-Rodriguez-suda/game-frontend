import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'https://game-backend-87km.onrender.com';

  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, data);
  }

  loginTeacher(data: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, data);
  }

  loginPlayer(data: { username: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, data);
  }
}
