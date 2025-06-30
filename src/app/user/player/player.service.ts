import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PlayerService {
  private apiUrl = 'https://game-backend-87km.onrender.com';

  constructor(private http: HttpClient) {}

  // Obtener detalles del jugador
  getPlayerDetails(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/player/${id}/details`);
  }

  // Obtener progreso del jugador
  getProgress(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/progress/player/${id}`);
  }

  // Cambiar avatar activo
  setActiveAvatar(playerId: number, avatarId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/player/${playerId}/set-avatar`, {
      itemId: avatarId,
    });
  }
}
