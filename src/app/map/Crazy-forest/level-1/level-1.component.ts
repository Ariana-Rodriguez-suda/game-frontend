import { Component, OnInit, AfterViewInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { Level1Service } from './level-1.service';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../common/button.component';
import { CommonModule } from '@angular/common';
import { HudComponent } from '../../../game-ui/hud.component';

interface Block {
  id: number;
  numerator: number;
  denominator: number;
  x: number;
  pushed: boolean;
}

interface Coin {
  id: number;
  x: number;
  collected: boolean;
}

@Component({
  selector: 'app-level-1',
  templateUrl: './level-1.component.html',
  imports: [ButtonComponent, CommonModule, HudComponent],
  standalone: true,
  styleUrls: ['./level-1.component.css']
})
export class Level1Component implements OnInit, AfterViewInit {
  @ViewChild('gameArea') gameAreaRef!: ElementRef<HTMLDivElement>;
  @ViewChild('character') characterRef!: ElementRef<HTMLDivElement>;

  mode: 'normal' | 'suma' = 'normal';
  messages: string[] = [];
  progress = 0;
  estrellasGanadas = 0;
  nivelCompletado = false;

  worldWidth = 1600;
  viewportWidth = 800;

  bridge = {
    x: 980,
    width: 100,
    repaired: false
  };

  playerX = 100;
  playerY = 0;
  playerWidth = 40;
  playerHeight = 60;
  velocityY = 20;
  gravity = 3;
  jumping = false;
  walkingDirection: 'left' | 'right' | null = null;

  platforms = [
    { x: 0, y: 0, width: 1600, height: 20 },
    { x: 300, y: 100, width: 150, height: 20 },
    { x: 600, y: 150, width: 200, height: 20 },
    { x: 1000, y: 120, width: 180, height: 20 },
    { x: 180, y: 0, width: 60, height: 20 }, // primer tramo
// agujero visual en x: 240 a 300 (no se define plataforma)
// luego continúa el piso:
{ x: 300, y: 0, width: 1300, height: 20 },
  ];

  blocks: Block[] = [
    { id: 1, numerator: 10, denominator: 8, x: 310, pushed: false },
    { id: 2, numerator: 6, denominator: 8, x: 610, pushed: false }
  ];

  introBlocks: Block[] = [];

  fusionBlockId = 99;
  fusionBlock: Block | null = null;

  coins: Coin[] = [
    { id: 1, x: 200, collected: false },
    { id: 2, x: 750, collected: false },
    { id: 3, x: 1400, collected: false }
  ];
  coinsCollected = 0;

  npcX = 620;
  npcY = 20;

  scrollX = 0;

  sumaSeleccionados: Block[] = [];

  isSelected(blockId: number): boolean {
    return this.sumaSeleccionados.some(b => b.id === blockId);
  }

  constructor(private level1Service: Level1Service, private router: Router) {}

  ngOnInit(): void {
this.introBlocks = [
  { id: 100, numerator: 4, denominator: 8, x: 120, pushed: false }
];
    this.mostrarMensajeIntro();
  }

  ngAfterViewInit(): void {
    this.updateCharacterPosition();
    this.gameLoop();
  }

  mostrarMensajeIntro() {
    this.messages = [
      '¡Mira estos bloques!',
      'Cada parte azul representa una fracción.',
      '1/4 tiene 1 parte pintada, 2/4 tiene dos, etc.',
      'Ahora avanza y recolecta monedas.'
    ];
  }

  gameLoop() {
    requestAnimationFrame(() => this.gameLoop());

    this.velocityY -= this.gravity;
    this.playerY += this.velocityY;

    let onPlatform = false;
    for (const plat of this.platforms) {
      const playerBottom = this.playerY;
      const playerTop = this.playerY + this.playerHeight;
      const playerLeft = this.playerX;
      const playerRight = this.playerX + this.playerWidth;

      const platTop = plat.y + plat.height;
      const platLeft = plat.x;
      const platRight = plat.x + plat.width;

      if (
        playerRight > platLeft &&
        playerLeft < platRight &&
        playerBottom <= platTop + 5 &&
        playerBottom >= platTop - 10 &&
        this.velocityY <= 0
      ) {
        this.playerY = platTop;
        this.velocityY = 0;
        this.jumping = false;
        onPlatform = true;
        break;
      }
    }

    if (!onPlatform && this.playerY < 0) {
      this.playerY = 0;
      this.velocityY = 0;
      this.jumping = false;
    }

    if (this.walkingDirection === 'left') {
      this.playerX = Math.max(0, this.playerX - 6);
    } else if (this.walkingDirection === 'right') {
      this.playerX = Math.min(this.worldWidth - this.playerWidth, this.playerX + 6);
    }

    const centerScreen = this.scrollX + this.viewportWidth / 2;
    if (this.playerX > centerScreen + 50) {
      this.scrollX = Math.min(this.playerX - this.viewportWidth / 2, this.worldWidth - this.viewportWidth);
    } else if (this.playerX < centerScreen - 50) {
      this.scrollX = Math.max(this.playerX - this.viewportWidth / 2, 0);
    }

    this.updateCharacterPosition();
    this.updateBlocks();
    this.empujarFusionBlock();
    this.checkBloqueEnAgujero();
    this.checkMonedas();
    this.checkEntregaBloque();
    this.checkNivelCompletado();
  }

  updateCharacterPosition() {
    if (!this.characterRef) return;
    const char = this.characterRef.nativeElement;
    char.style.left = `${this.playerX - this.scrollX}px`;
    char.style.bottom = `${this.playerY}px`;
  }

  updateBlocks() {
    for (const block of this.blocks) {
      const el = document.getElementById(`block-${block.id}`);
      if (el) {
        el.style.left = `${block.x - this.scrollX}px`;
        el.style.bottom = `${this.getPlatformHeightAt(block.x)}px`;
      }
    }
    for (const block of this.introBlocks) {
      const el = document.getElementById(`block-${block.id}`);
      if (el) {
        el.style.left = `${block.x - this.scrollX}px`;
        el.style.bottom = `${this.getPlatformHeightAt(block.x)}px`;
      }
    }
    if (this.fusionBlock) {
      const el = document.getElementById(`block-${this.fusionBlock.id}`);
      if (el) {
        el.style.left = `${this.fusionBlock.x - this.scrollX}px`;
        el.style.bottom = `${this.getPlatformHeightAt(this.fusionBlock.x)}px`;
      }
    }
  }

  getPlatformHeightAt(x: number): number {
    for (const plat of this.platforms) {
      if (x >= plat.x && x <= plat.x + plat.width) {
        return plat.y + plat.height;
      }
    }
    return 0;
  }

  empujarFusionBlock() {
    if (!this.fusionBlock || this.mode !== 'normal') return;
    const distX = Math.abs(this.playerX - this.fusionBlock.x);
    const alturaJugador = this.getPlatformHeightAt(this.playerX);
    const alturaBloque = this.getPlatformHeightAt(this.fusionBlock.x);

    if (distX < 50 && alturaJugador === alturaBloque) {
      this.fusionBlock.x += 15;
    }
  }

  empujarBloque(id: number) {
    if (this.mode !== 'normal') return;
    const block = this.blocks.find(b => b.id === id);
    if (!block) return;

    const distX = Math.abs(this.playerX - block.x);
    const alturaJugador = this.getPlatformHeightAt(this.playerX);
    const alturaBloque = this.getPlatformHeightAt(block.x);

    if (distX < 50 && alturaJugador === alturaBloque) {
      block.x += 15;
      block.pushed = true;

      if (this.progress === 0) {
        this.messages = ['Has empujado el bloque hacia el agujero. ¡Puedes cruzar ahora!'];
        this.progress++;
      }
    }
  }

  checkBloqueEnAgujero() {
    if (this.progress < 1) return;

    const agujeroX = this.bridge.x;
    const agujeroWidth = this.bridge.width;

    const bloque = this.blocks.find(b => b.pushed);
    if (bloque && bloque.x >= agujeroX && bloque.x <= agujeroX + agujeroWidth) {
      this.messages = ['¡Bloque colocado en el agujero! Ahora puedes cruzar al puente.'];
      this.progress++;
      this.blocks = this.blocks.filter(b => b.id !== bloque.id);
    }
  }

  activarModoSuma() {
    if (this.mode === 'suma') {
      this.mode = 'normal';
      this.sumaSeleccionados = [];
      this.messages = ['Modo suma desactivado.'];
    } else {
      this.mode = 'suma';
      this.sumaSeleccionados = [];
      this.messages = ['Modo suma activado. Selecciona dos bloques para sumar (haz clic en ellos).'];
    }
  }

  seleccionarBloqueParaSuma(id: number) {
    if (this.mode !== 'suma') return;
    const block = this.blocks.find(b => b.id === id);
    if (!block) return;

    if (this.sumaSeleccionados.find(b => b.id === id)) {
      this.sumaSeleccionados = this.sumaSeleccionados.filter(b => b.id !== id);
    } else {
      if (this.sumaSeleccionados.length < 2) {
        this.sumaSeleccionados.push(block);
      }
    }

    if (this.sumaSeleccionados.length === 2) {
      this.intentarSumarBloques();
    }
  }

  intentarSumarBloques() {
    const [b1, b2] = this.sumaSeleccionados;
    if (!b1 || !b2) return;

    const denom = b1.denominator;
    if (b1.denominator === b2.denominator && (b1.numerator + b2.numerator) === 16 && denom === 8) {
      this.messages = ['¡Genial! Has formado el bloque 16/8. Llévalo al NPC en el puente.'];
      this.fusionBlock = {
        id: this.fusionBlockId,
        numerator: 16,
        denominator: 8,
        x: Math.min(b1.x, b2.x),
        pushed: false
      };
      this.blocks = this.blocks.filter(b => b.id !== b1.id && b.id !== b2.id);
      this.mode = 'normal';
      this.sumaSeleccionados = [];
      this.progress++;
    } else {
      this.messages = ['Esa suma no da 16/8. Intenta con otros bloques.'];
      this.sumaSeleccionados = [];
    }
  }

  checkEntregaBloque() {
    if (!this.fusionBlock) return;

    if (Math.abs(this.fusionBlock.x - this.npcX) < 30) {
      this.messages = ['¡Gracias! El puente está reparado. Avanza con cuidado.'];
      this.progress++;
      this.fusionBlock = null;
      this.bridge.repaired = true;
    }
  }

  checkMonedas() {
    for (const coin of this.coins) {
      if (!coin.collected && Math.abs(this.playerX - coin.x) < 30 && this.playerY <= this.getPlatformHeightAt(coin.x) + 40) {
        coin.collected = true;
        this.coinsCollected++;
        this.playCoinSound();
      }
    }
  }

  playCoinSound() {
    const audio = new Audio('assets/sounds/coin.mp3');
    audio.currentTime = 0;
    audio.play();
  }

  checkNivelCompletado() {
    if (this.playerX >= this.worldWidth - 100 && !this.nivelCompletado && this.progress >= 4) {
      this.nivelCompletado = true;
      this.estrellasGanadas = this.coinsCollected >= 3 ? 3 : 2;
      this.messages = ['¡Nivel completado!'];
      this.level1Service.saveProgress({
        score: this.coinsCollected,
        completed: true
      }).subscribe({
        next: () => console.log('Progreso guardado'),
        error: () => console.error('Error al guardar progreso')
      });
    }
  }

  avanzar() {
    this.router.navigate(['/map/crazy-forest/level-2']);
  }

  estaCercaDelNpc(): boolean {
    return Math.abs(this.playerX - this.npcX) < 50 && Math.abs(this.playerY - this.npcY) < 50;
  }

  mostrarDialogoNpc() {
    this.messages = [
      '¡Hola! El puente está roto.',
      'Necesitamos una fracción de 16/8 para repararlo.',
      'Empuja los bloques y usa el modo suma (tecla S).',
      'Selecciona dos bloques para sumar y entrega el resultado aquí.'
    ];
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.nivelCompletado) return;

    switch (event.key.toLowerCase()) {
      case 'arrowright':
        this.walkingDirection = 'right';
        break;
      case 'arrowleft':
        this.walkingDirection = 'left';
        break;
      case ' ':
        if (!this.jumping) {
          this.velocityY = 30;
          this.jumping = true;
        }
        break;
      case 's':
        this.activarModoSuma();
        break;
      case 'z':
        if (this.estaCercaDelNpc()) {
          this.mostrarDialogoNpc();
        }
        break;
    case 'e':
  const bloqueIntro = this.introBlocks.find(b => Math.abs(b.x - this.playerX) < 50);
  if (bloqueIntro) this.empujarBloque(bloqueIntro.id);
  break;
      } 
  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    if (['arrowright', 'arrowleft'].includes(event.key.toLowerCase())) {
      this.walkingDirection = null;
    }
  }
}
