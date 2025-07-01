import { Component } from '@angular/core';
import { Level3Service } from './level-3.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-level-3',
  templateUrl: './level-3.component.html',
  styleUrls: ['./level-3.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class Level3Component {
  bossHealth = 100;
  jefeDerrotado = false;
  respuestaJugador = '';
  message = '¡Derrota al jefe resolviendo la operación combinada!';
  rayoActivo = false;

  constructor(private level3Service: Level3Service) {}

atacarJefe() {
  const correcta = this.level3Service.verificarResultado(this.respuestaJugador);

  const bossElement = document.querySelector('.boss') as HTMLElement;

  if (correcta) {
    // Animar rayo
    this.rayoActivo = true;
    setTimeout(() => {
      this.rayoActivo = false;
    }, 400);

    // Sacudir jefe
    bossElement.classList.add('shake');
    setTimeout(() => bossElement.classList.remove('shake'), 400);

    this.bossHealth -= 50;
    this.message = '¡Ataque efectivo!';
    if (this.bossHealth <= 0) {
      this.jefeDerrotado = true;
      this.message = '¡Has vencido al jefe!';
    }
  } else {
    this.message = 'Fallaste la operación. Intenta otra vez.';
  }

  this.respuestaJugador = '';
}

}
