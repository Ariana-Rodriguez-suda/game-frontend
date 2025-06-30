import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CrazyForestService {
  // Aquí podrías manejar lógica compartida para Crazy Forest
  getWelcomeMessage(): string {
    return '¡Bienvenido al mundo Crazy Forest!';
  }
}
