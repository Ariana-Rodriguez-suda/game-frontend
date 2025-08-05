import { Component, ElementRef, OnDestroy, OnInit, ViewChild, HostListener } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { CoinScoreComponent } from '../../game-ui/score-coin/coins.component';
import { VidasComponent } from '../../game-ui/vidas/life.component';
import { MonedaComponent } from '../../common/moneda/moneda.component';
import { PlayerService } from '../../user/player/player.service';

@Component({
  selector: 'app-level-1',
  templateUrl: './level-1.component.html',
  styleUrls: ['./level-1.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    CoinScoreComponent,
    VidasComponent,
    MonedaComponent
  ]
})
export class Level1Component implements OnInit, OnDestroy {
  @ViewChild('personaje') personajeRef!: ElementRef;

  // HUD simplificado para la introducción (puedes ocultarlo si quieres)
  monedas: number = 0;
  vidas: number = 3;
  avatarRunUrl: string = '/assets/sprites/avatarBoy1run.png'; // valor por defecto
   constructor(private playerService: PlayerService) {}


cargarAvatarActivo(): void {
  this.playerService.getProfile().subscribe({
    next: (res) => {
      this.avatarRunUrl = res.activeAvatar?.runSpriteUrl || '/assets/sprites/avatarBoy1run.png';
    },
    error: () => {
      console.warn('No se pudo obtener avatar activo, usando sprite por defecto.');
    }
  });
}

  // Solo mensaje introductorio, sin diálogo ni mecánicas adicionales
  mensajesIntro: string[] = [
    'Bienvenido a Aventura Numeral, en este juego las fracciones se representan con bloques divididos en secciones, las secciones coloradas representan el numerador y todas las secciones representan el denominador, el bloque que tienes en frente tiene 4 secciones coloradas y son 6 secciones en total por lo que es una fracción de 4/6. Puedes empujar los bloques con la tecla E, vamos empuja el bloque para seguir con el juego'
  ];
  mensajeIndex = 0;
  mostrarMensaje: boolean = true;

  // Posición fija del personaje y bloque para esta primera sección
  personajeX: number = 100;
  personajeY: number = 0;

  // Bloque estático delante del personaje
  bloqueCesped = { x: 200, visible: true };

  // No necesitamos físicas ni movimiento horizontal ni scroll
  velocidad = 0; 
  saltando = false;
  gravedad = 0;
  impulsoSalto = 0;
  velocidadY = 0;

  // Simplificamos plataformas: solo el suelo inicial
  plataformasBase = [
    { x: 0, ancho: 500, y: 0 } // suelo inicial
  ];

  alturaBloque = 60;

  ngOnInit(): void {
    this.cargarAvatarActivo();
      this.mensajeIndex = 0;
  this.mostrarMensaje = true;
  this.gravedad = 0;
  this.impulsoSalto = 0;
  this.velocidadY = 0;
  }

  ngOnDestroy(): void {}

  // Solo plataforma base
  get plataformasActivas() {
    return this.plataformasBase;
  }

  // No colisiones horizontales ni físicas necesarias aquí
  colisionHorizontal(nuevaX: number): boolean {
    return false;
  }

  estaSobrePlataforma(): boolean {
    return true;
  }

  // Manejo teclado: solo avanzar diálogo con Enter y nada más
  @HostListener('document:keydown', ['$event'])
  manejarTeclado(event: KeyboardEvent) {
    if (this.mostrarMensaje && event.key === 'Enter') {
      this.continuarIntro();
      return;
    }
  }

  continuarIntro() {
    this.mensajeIndex++;
    if (this.mensajeIndex >= this.mensajesIntro.length) {
      this.mostrarMensaje = false;
      // Aquí puedes decidir si mostrar algo más o finalizar nivel
    }
  }
}
