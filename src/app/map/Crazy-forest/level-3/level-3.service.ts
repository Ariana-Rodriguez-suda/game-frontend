import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Level3Service {
  // Resultado esperado: (2/3 + 1/3) * 3/4 = 1 * 3/4 = 0.75
  verificarResultado(respuesta: string): boolean {
    const esperado = 0.75;
    const valor = parseFloat(respuesta);
    return Math.abs(valor - esperado) < 0.01;
  }
}
