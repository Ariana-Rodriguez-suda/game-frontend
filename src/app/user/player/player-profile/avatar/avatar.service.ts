import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AvatarService {
  private apiUrl = 'https://game-backend-87km.onrender.com';

  constructor(private http: HttpClient) {}

  getOwnedAvatars(playerId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/inventory/${playerId}/avatars`);
  }
}
