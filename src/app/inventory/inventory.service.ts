import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private apiUrl = 'https://game-backend-87km.onrender.com';

  constructor(private http: HttpClient) {}

buyItem(itemId: number) {
  const token = localStorage.getItem('token');
  return this.http.post('/inventory/buy', { itemId }, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

getInventory(): Observable<any[]> {
  const token = localStorage.getItem('token');
  return this.http.get<any[]>(`${this.apiUrl}/inventory`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

}