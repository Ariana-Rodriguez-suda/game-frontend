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

  // Establecer avatar activo
  setActiveAvatar(avatarId: number): Observable<any> {
    const token = localStorage.getItem('token') || '';
    return this.http.patch(`${this.apiUrl}/avatar/select`, { avatarId }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

// Cambiar getAvatars para que consulte el endpoint correcto de avatares
getAvatars(): Observable<any[]> {
  const token = localStorage.getItem('token') || '';
  return this.http.get<any[]>(`${this.apiUrl}/avatar`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

// El endpoint para setActiveAvatar ya apunta a /avatar/select


  // Unirse a una clase con código
  joinClass(code: string): Observable<any> {
    const token = localStorage.getItem('token') || '';
    return this.http.post(`${this.apiUrl}/player/join-class`, { code }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // Comprar un item en la tienda (aún sin implementación completa)
  buyItem(itemId: number): Observable<any> {
    const token = localStorage.getItem('token') || '';
    return this.http.post(`${this.apiUrl}/shop/buy`, { itemId }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // Actualizar perfil (por ejemplo, cambiar usuario o contraseña)
  updateProfile(data: { username?: string; password?: string; }): Observable<any> {
    const token = localStorage.getItem('token') || '';
    return this.http.patch(`${this.apiUrl}/player/profile`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
