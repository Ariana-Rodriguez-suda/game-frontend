import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Level2Service, Block } from './level-2.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-level-2',
  templateUrl: './level-2.component.html',
  styleUrls: ['./level-2.component.css'],
})
export class Level2Component implements OnInit, AfterViewInit {
  mode: 'normal' | 'resta' | 'multiplicacion' | 'division' | 'mcm' = 'normal';
  message = 'Desbloquea el camino con los modos.';
  blocks: Block[] = [];
  enemigos = [{ left: 300 }, { left: 600 }];

  bloquesSeleccionados: number[] = [];
  estrellasGanadas = 0;
  nivelCompletado = false;

  constructor(private level2Service: Level2Service, private router: Router) {}

  async ngOnInit(): Promise<void> {
    this.blocks = await this.level2Service.init();
  }

  activarModo(m: 'resta' | 'multiplicacion' | 'division' | 'mcm'): void {
    this.mode = m;
    this.message = `Modo ${m.toUpperCase()} activado.`;
    this.bloquesSeleccionados = [];
  }

  seleccionarBloque(id: number): void {
    if (this.bloquesSeleccionados.includes(id)) {
      this.bloquesSeleccionados = this.bloquesSeleccionados.filter(bid => bid !== id);
    } else if (this.bloquesSeleccionados.length < 2) {
      this.bloquesSeleccionados.push(id);
    }
  }

  fusionarBloques(): void {
    if (this.bloquesSeleccionados.length !== 2) {
      this.message = 'Selecciona exactamente dos bloques.';
      return;
    }

    const [id1, id2] = this.bloquesSeleccionados;

    if (this.mode === 'mcm') {
      this.usarRayoMCM(id1, id2);
    } else {
      this.interactuarBloques(id1, id2);
    }
    this.bloquesSeleccionados = [];
  }

  interactuarBloques(id1: number, id2: number): void {
    const res = this.level2Service.operarBloques(id1, id2, this.mode);
    this.message = res.message || '';
    this.blocks = [...this.level2Service.getBlocks()];
  }

  usarRayoMCM(id1: number, id2: number): void {
    const res = this.level2Service.transformarConMCM(id1, id2);
    this.message = res.message;
    this.blocks = [...this.level2Service.getBlocks()];
  }

  ngAfterViewInit(): void {
    const character = document.querySelector('.character') as HTMLElement;
    let left = 100;
    let jumping = false;

    const keydownHandler = (event: KeyboardEvent) => {
      if (!character) return;

      if (event.key === 'ArrowRight') {
        left += 10;
      } else if (event.key === 'ArrowLeft') {
        left -= 10;
      } else if (event.key === ' ' && !jumping) {
        jumping = true;
        let jumpHeight = 0;
        const jumpUp = setInterval(() => {
          if (jumpHeight >= 80) {
            clearInterval(jumpUp);
            const fallDown = setInterval(() => {
              if (jumpHeight <= 0) {
                clearInterval(fallDown);
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
      character.style.left = `${left}px`;
    };

    document.addEventListener('keydown', keydownHandler);
  }

  mostrarResultados(estrellas: number): void {
    this.estrellasGanadas = estrellas;
    this.nivelCompletado = true;
  }

  avanzar(): void {
    this.router.navigate(['/map/crazy-forest/level-3']);
  }
}
