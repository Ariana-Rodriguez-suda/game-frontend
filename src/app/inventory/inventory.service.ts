import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private apiUrl = 'https://game-backend-87km.onrender.com';

  constructor(private http: HttpClient) {}

  getInventory(playerId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/player/${playerId}/inventory`);
  }

  useItem(itemId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/player/inventory/use`, { itemId });
  }
}
