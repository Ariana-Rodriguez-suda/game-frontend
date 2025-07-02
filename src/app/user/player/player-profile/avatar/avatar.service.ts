import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AvatarService {
  private apiUrl = 'https://game-backend-87km.onrender.com';

  constructor(private http: HttpClient) {}

getOwnedAvatars(): Observable<any[]> {
  const token = localStorage.getItem('token') || '';
  return this.http.get<any[]>(`${this.apiUrl}/inventory`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

getAllAvatars(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/avatar`);
}

}