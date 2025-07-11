import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Level1Service } from './level-1.service';
import { ButtonComponent } from '../../../common/button.component';
import { HudComponent } from '../../../game-ui/hud.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-level-1',
  templateUrl: './level-1.component.html',
  styleUrls: ['./level-1.component.css'],
  standalone: true,
  imports: [CommonModule, ButtonComponent, HudComponent]
})
export class Level1Component implements OnInit, AfterViewInit {
  mode: 'normal' | 'suma' = 'normal';
  blocks: any[] = [];
  messages: string[] = [];
  progress = 0;
  estrellasGanadas = 0;
  nivelCompletado = false;

  coins = 0;
  monedasMapa = [
    { id: 1, x: 300 },
    { id: 2, x: 600 },
    { id: 3, x: 900 },
  ];
  coinSound = new Audio('assets/sounds/coin.mp3');

  npcPosition = { x: 800 };
  playerPosition = { x: 100 };
  finalPosition = 1200;

  constructor(private level1Service: Level1Service, private router: Router) {}

  ngOnInit(): void {
    this.level1Service.initLevel();
    this.blocks = this.level1Service.getInitialBlocks();
    this.messages = ['Las fracciones se representan con bloques. El bloque de abajo es 10/12. Empújalo al agujero para seguir.'];
  }

  activarModoSuma(): void {
    this.mode = 'suma';
    this.messages = ['Modo suma activado. Junta dos bloques para obtener 16/8.'];
  }

  empujarBloque(id: number): void {
    this.level1Service.empujarBloque(id);
    this.progress++;
    if (this.progress === 1) {
      this.messages = ['¡Bien hecho! Ahora sigue hasta encontrar al NPC del puente.'];
    }
  }

  fusionarBloques(id1: number, id2: number): void {
    if (this.mode !== 'suma') return;
    const result = this.level1Service.sumarBloques(id1, id2);
    if (result.success) {
      this.blocks = this.blocks.filter(b => b.id !== id1 && b.id !== id2);
      const newBlock = { id: 99, ...result.block };
      this.blocks.push(newBlock);
      this.messages = ['¡Genial! Ahora lleva el bloque 16/8 al NPC del puente.'];
      this.progress++;
    } else {
      this.messages = ['Esa suma no da 16/8. Intenta con otros bloques.'];
    }
  }

  recogerMoneda(): void {
    this.coins++;
    this.coinSound.currentTime = 0;
    this.coinSound.play();
  }

  mostrarResultados(estrellas: number): void {
    this.estrellasGanadas = estrellas;
    this.nivelCompletado = true;
  }

  avanzar(): void {
    this.router.navigate(['/map/crazy-forest/level-2']);
  }

  estaCercaDelNpc(): boolean {
    return Math.abs(this.playerPosition.x - this.npcPosition.x) < 50;
  }

  mostrarDialogoNpc(): void {
    this.messages = [
      '¡Hola! El puente está roto.',
      'Necesitamos una fracción 16/8 para repararlo.',
      'Presiona "S" para activar el modo suma y juntar 10/8 + 6/8.'
    ];
  }

  ngAfterViewInit(): void {
    const character = document.querySelector('.character') as HTMLElement;
    let left = 100;
    let bottom = 0;
    let jumping = false;
    const fusionBlockId = 99;

    const checkEntrega = () => {
      const fusionBlock = this.blocks.find(b => b.id === fusionBlockId);
      if (fusionBlock) {
        const fusionBlockEl = document.querySelector(`#block-${fusionBlockId}`) as HTMLElement;
        if (fusionBlockEl) {
          const leftPos = parseInt(fusionBlockEl.style.left || '0', 10);
          if (Math.abs(leftPos - this.npcPosition.x) < 20) {
            this.messages = ['¡Gracias! El puente está reparado. Avanza con cuidado.'];
            this.blocks = this.blocks.filter(b => b.id !== fusionBlockId);
            this.progress++;
          }
        }
      }
    };

    const checkMoneda = () => {
      this.monedasMapa = this.monedasMapa.filter(moneda => {
        const distancia = Math.abs(this.playerPosition.x - moneda.x);
        if (distancia < 30) {
          this.recogerMoneda();
          return false;
        }
        return true;
      });
    };

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
      } else if (event.key.toLowerCase() === 'z' && this.estaCercaDelNpc()) {
        this.mostrarDialogoNpc();
      } else if (event.key.toLowerCase() === 's') {
        this.activarModoSuma();
      }

      if (left >= this.finalPosition && !this.nivelCompletado) {
        this.mostrarResultados(3);
        this.level1Service.saveProgress({
          score: this.coins,
          completed: true
        }).subscribe({
          next: () => console.log('Progreso guardado'),
          error: () => console.error('Error al guardar progreso')
        });
      }

      character.style.left = `${left}px`;
      this.playerPosition.x = left;

      checkEntrega();
      checkMoneda();
    });
  }
}
