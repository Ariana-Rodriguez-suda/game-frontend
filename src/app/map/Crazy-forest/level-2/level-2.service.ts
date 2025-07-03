import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Block {
  id: number;
  numerator: number;
  denominator: number;
}

@Injectable({
  providedIn: 'root'
})
export class Level2Service {
  private blocks: Block[] = [];
  private apiUrl = 'https://game-backend-87km.onrender.com/level-2';

  constructor(private http: HttpClient) {}

  async init(): Promise<Block[]> {
    try {
      const backendBlocks = await this.http.get<Block[]>(`${this.apiUrl}/blocks`).toPromise();
      this.blocks = backendBlocks || this.getDefaultBlocks();
    } catch {
      this.blocks = this.getDefaultBlocks();
    }
    return this.blocks;
  }

  private getDefaultBlocks(): Block[] {
    return [
      { id: 1, numerator: 6, denominator: 8 },
      { id: 2, numerator: 3, denominator: 8 },
      { id: 3, numerator: 2, denominator: 5 },
      { id: 4, numerator: 3, denominator: 10 }
    ];
  }

  getBlocks(): Block[] {
    return this.blocks;
  }

  operarBloques(id1: number, id2: number, modo: string) {
    const b1 = this.blocks.find(b => b.id === id1);
    const b2 = this.blocks.find(b => b.id === id2);
    if (!b1 || !b2) return { success: false, message: 'Bloques no encontrados' };

    switch (modo) {
      case 'resta':
        if (b1.denominator === b2.denominator) {
          const res = b1.numerator - b2.numerator;
          if (res >= 0) {
            return { success: true, message: '¡Obstáculo destruido!' };
          } else {
            return { success: false, message: 'Resultado negativo no permitido' };
          }
        } else {
          return { success: false, message: 'Denominadores deben ser iguales para resta' };
        }
      case 'multiplicacion':
        return { success: true, message: 'Multiplicación aplicada: bloques combinados.' };
      case 'division':
        return { success: true, message: 'División aplicada: bloques divididos.' };
      default:
        return { success: false, message: 'Modo inválido' };
    }
  }

  transformarConMCM(id1: number, id2: number) {
    const b1 = this.blocks.find(b => b.id === id1);
    const b2 = this.blocks.find(b => b.id === id2);
    if (!b1 || !b2) return { success: false, message: 'Bloques no válidos' };

    const mcm = this.mcm(b1.denominator, b2.denominator);
    const newB1 = { ...b1, numerator: (b1.numerator * mcm) / b1.denominator, denominator: mcm };
    const newB2 = { ...b2, numerator: (b2.numerator * mcm) / b2.denominator, denominator: mcm };

    this.blocks = this.blocks.map(b => {
      if (b.id === id1) return newB1;
      if (b.id === id2) return newB2;
      return b;
    });

    return { success: true, message: `Rayo MCM aplicado. Denominador común: ${mcm}`, blocks: this.blocks };
  }

  private mcm(a: number, b: number): number {
    const gcd = (x: number, y: number): number => (y === 0 ? x : gcd(y, x % y));
    return (a * b) / gcd(a, b);
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
