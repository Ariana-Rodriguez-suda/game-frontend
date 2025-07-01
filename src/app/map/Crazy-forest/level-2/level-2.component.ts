import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Level2Service } from './level-2.service';

@Component({
  selector: 'app-level-2',
  templateUrl: './level-2.component.html',
  styleUrls: ['./level-2.component.css'],
})
export class Level2Component implements OnInit, AfterViewInit {
  mode: 'normal' | 'resta' | 'multiplicacion' | 'division' | 'suma-mcm' = 'normal';
  message = 'Desbloquea el camino con los modos.';
  blocks: any[] = [];
  enemies = [{ left: 300 }, { left: 600 }];
  id1: number = 0;
  id2: number = 0;

  constructor(private level2Service: Level2Service) {}

  ngOnInit(): void {
    this.blocks = this.level2Service.init();
  }

  activarModo(m: string): void {
    this.mode = m as any;
    this.message = `Modo ${m.toUpperCase()} activado.`;
  }

  interactuarBloques(id1: number, id2: number) {
    const res = this.level2Service.operarBloques(id1, id2, this.mode);
this.message = res.message || '';
    this.blocks = [...this.level2Service.getBlocks()];
  }

  usarRayoMCM(id1: number, id2: number) {
    const res = this.level2Service.transformarConMCM(id1, id2);
    this.message = res.message;
    this.blocks = [...this.level2Service.getBlocks()];
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
    });
  }
}
