import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PlayerService {
  private apiUrl = 'https://game-backend-87km.onrender.com';

  constructor(private http: HttpClient) {}

  // Obtener perfil del jugador autenticado
  getProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.apiUrl}/player/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // Obtener progreso del jugador (progreso general)
  getProgress(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.apiUrl}/progress`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

setActiveAvatar(avatarId: number): Observable<any> {
  const token = localStorage.getItem('token') || '';
  return this.http.patch(`${this.apiUrl}/avatar/select`, { avatarId }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

}
