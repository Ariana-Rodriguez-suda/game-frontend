// level-1.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Level1Service {
  private blocks: any[] = [];
  private apiUrl = 'https://game-backend-87km.onrender.com/level-1';

  constructor(private http: HttpClient) {}

  initLevel() {
    this.blocks = [
      { id: 1, numerator: 10, denominator: 12 },
      { id: 2, numerator: 4, denominator: 16 },
      { id: 3, numerator: 4, denominator: 16 },
      { id: 4, numerator: 3, denominator: 12 }
    ];
  }

  getInitialBlocks() {
    return this.blocks;
  }

  empujarBloque(id: number) {
    this.blocks = this.blocks.filter(b => b.id !== id);
  }

  sumarBloques(id1: number, id2: number) {
    const b1 = this.blocks.find(b => b.id === id1);
    const b2 = this.blocks.find(b => b.id === id2);
    if (!b1 || !b2) return { success: false };

    if (b1.denominator === b2.denominator) {
      const sum = b1.numerator + b2.numerator;
      if (sum === 8 && b1.denominator === 16) {
        return { success: true };
      }
    }
    return { success: false };
  }

  saveProgress(data: { score: number; completed: boolean }): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(this.apiUrl, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  getProgress(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(this.apiUrl, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}
