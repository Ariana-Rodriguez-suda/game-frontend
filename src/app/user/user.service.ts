import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://localhost:3000'; // ajusta si tu backend usa otro puerto

  constructor(private http: HttpClient) {}

  getUserInfo() {
    const token = localStorage.getItem('token');
    return token ? JSON.parse(atob(token.split('.')[1])) : null;
  }

  getUserDetails(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${id}/details`);
  }
}
