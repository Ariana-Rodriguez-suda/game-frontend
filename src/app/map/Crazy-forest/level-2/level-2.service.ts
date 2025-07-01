import { Injectable } from '@angular/core';
import { Block } from './block.interface';


@Injectable({
  providedIn: 'root'
})
export class Level2Service {
private blocks: Block[] = [];

  init() {
    this.blocks = [
      { id: 1, numerator: 6, denominator: 8 },
      { id: 2, numerator: 3, denominator: 8 },
      { id: 3, numerator: 2, denominator: 5 },
      { id: 4, numerator: 3, denominator: 10 }
    ];
    return this.blocks;
  }

getBlocks(): Block[] {
  return this.blocks;
}


  operarBloques(id1: number, id2: number, modo: string) {
    const b1 = this.blocks.find(b => b.id === id1);
    const b2 = this.blocks.find(b => b.id === id2);
    if (!b1 || !b2) return { success: false };

    switch (modo) {
      case 'resta':
        if (b1.denominator === b2.denominator) {
          const res = b1.numerator - b2.numerator;
          if (res >= 0) {
            return { success: true, message: '¡Obstáculo destruido!' };
          }
        }
        break;
      case 'multiplicacion':
        return { success: true, message: 'Multiplicación aplicada: bloques combinados.' };
      case 'division':
        return { success: true, message: 'División aplicada: bloques divididos.' };
      default:
        return { success: false };
    }
    return { success: false };
  }

  transformarConMCM(id1: number, id2: number) {
    const b1 = this.blocks.find(b => b.id === id1);
    const b2 = this.blocks.find(b => b.id === id2);
    if (!b1 || !b2) return { success: false, message: 'Bloques no válidos' };

    const mcm = this.mcm(b1.denominator, b2.denominator);
    b1.numerator = (b1.numerator * mcm) / b1.denominator;
    b1.denominator = mcm;
    b2.numerator = (b2.numerator * mcm) / b2.denominator;
    b2.denominator = mcm;

    return { success: true, message: `Rayo MCM aplicado. Denominador común: ${mcm}` };
  }

  private mcm(a: number, b: number): number {
    const gcd = (x: number, y: number): number => y === 0 ? x : gcd(y, x % y);
    return (a * b) / gcd(a, b);
  }
}
