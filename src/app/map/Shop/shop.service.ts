import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ShopService {
  private apiUrl = 'https://game-backend-87km.onrender.com';

  constructor(private http: HttpClient) {}

  getItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/shop/items`);
  }

  buyItem(playerId: number, itemId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/shop/${playerId}/buy`, { itemId });
  }
}

