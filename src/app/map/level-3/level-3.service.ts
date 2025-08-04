// level-3.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Level3Service {
  private apiUrl = 'https://game-backend-87km.onrender.com/level-3';

  constructor(private http: HttpClient) {}

  // Resultado esperado: (2/3 + 1/3) * 3/4 = 1 * 3/4 = 0.75
  verificarResultado(respuesta: string): boolean {
    const esperado = 0.75;
    const valor = parseFloat(respuesta);
    return Math.abs(valor - esperado) < 0.01;
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
