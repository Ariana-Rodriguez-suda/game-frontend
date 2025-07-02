import { Component, OnInit } from '@angular/core';
import { Level1Service } from './level-1.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-level-1',
  templateUrl: './level-1.component.html',
  styleUrls: ['./level-1.component.css']
})
export class Level1Component implements OnInit {
  mode: 'normal' | 'suma' = 'normal';
  blocks: any[] = [];
  messages: string[] = [];
  progress = 0;
  estrellasGanadas: number = 0;
  nivelCompletado: boolean = false;

  constructor(private level1Service: Level1Service, private router: Router) {}

  ngOnInit(): void {
    this.level1Service.initLevel();
    this.blocks = this.level1Service.getInitialBlocks();
    this.messages = ['Las fracciones se representan con bloques. El bloque de abajo es 10/12. Empújalo al agujero para seguir.'];
  }

  empujarBloque(id: number): void {
    this.level1Service.empujarBloque(id);
    this.progress++;
    if (this.progress === 1) {
      this.messages = ['¡Bien hecho! Ahora ayuda al personaje a obtener 8/16. Usa el modo suma.'];
    }
  }

  activarModoSuma(): void {
    this.mode = 'suma';
    this.messages = ['Modo suma activado. Junta dos bloques que den 8/16.'];
  }

  fusionarBloques(id1: number, id2: number): void {
    if (this.mode !== 'suma') return;
    const result = this.level1Service.sumarBloques(id1, id2);
    if (result.success) {
      this.messages = ['¡Lograste 8/16! El personaje arregla el puente. Cruza.'];
      this.progress++;
    } else {
      this.messages = ['Esa suma no da el resultado esperado. Intenta con otros bloques.'];
    }
  }

  ngAfterViewInit(): void {
  const character = document.querySelector('.character') as HTMLElement;
  let left = 100;
  let bottom = 0;
  let jumping = false;

  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      left += 10;
    } else if (event.key === 'ArrowLeft') {
      left -= 10;
    } else if (event.key === ' ' && !jumping) {
      jumping = true;
      let jumpHeight = 0;
      const jumpInterval = setInterval(() => {
        if (jumpHeight >= 80) {
          clearInterval(jumpInterval);
          const fallInterval = setInterval(() => {
            if (jumpHeight <= 0) {
              clearInterval(fallInterval);
              jumping = false;
            } else {
              jumpHeight -= 10;
              character.style.bottom = `${jumpHeight}px`;
            }
          }, 50);
        } else {
          jumpHeight += 10;
          character.style.bottom = `${jumpHeight}px`;
        }
      }, 50);
    }

    // aplicar movimientos
    character.style.left = `${left}px`;
  });
}

mostrarResultados(estrellas: number) {
  this.estrellasGanadas = estrellas;
  this.nivelCompletado = true;
}

avanzar() {
  this.router.navigate(['/map/crazy-forest/level-2']);
}

}
