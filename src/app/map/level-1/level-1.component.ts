import { Component, ElementRef, OnDestroy, OnInit, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextboxMensajeComponent } from '../../common/message/message.component';
import { TextboxDialogoComponent } from '../../common/dialogo/dialogo.component';
import { CoinScoreComponent } from '../../game-ui/score-coin/coins.component';
import { VidasComponent } from '../../game-ui/vidas/life.component';
import { MonedaComponent } from '../../common/moneda/moneda.component';

@Component({
  selector: 'app-level-1',
  templateUrl: './level-1.component.html',
  styleUrls: ['./level-1.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    TextboxMensajeComponent,
    TextboxDialogoComponent,
    CoinScoreComponent,
    VidasComponent,
    MonedaComponent
  ]
})
export class Level1Component implements OnInit, OnDestroy {
  @ViewChild('personaje') personajeRef!: ElementRef;

  // HUD
  monedas: number = 0;
  vidas: number = 3;

  // Introducción y diálogo
  mensajesIntro: string[] = [
    'Bienvenido a Aventura Numeral, en este juego las fracciones se representan con bloques divididos en secciones, las secciones coloradas representan el numerador y todas las secciones representan el denominador, el bloque que tienes en frente tiene 4 secciones coloradas y son 6 secciones en total por lo que es una fracción de 4/6. Puedes empujar los bloques con la tecla E, vamos empuja el bloque para seguir con el juego'
  ];
  mensajeIndex = 0;
  mostrarMensaje: boolean = true;

  dialogosNpc: string[] = [
    'Hola, ¿quieres cruzar el puente? Bueno, la última tormenta lo destruyó, pero podría arreglarlo si me consigues 8/16 madera, debiste haber pasado unos bloques no más tienes que sumarlos y ya. Toma, te doy este amuleto que te deja usar el MODO SUMA, actívalo con la tecla S y no más empuja los bloques juntos y se sumarán.',
    'Gracias. Ya me pongo a trabajar.',
    'Bueno ahí está, te deseo buena suerte. También ten cuidado. Los soldados se encuentran más adelante. Adiós.'
  ];
  dialogoIndex = 0;
  mostrarDialogo: boolean = false;

  // Scroll
  scrollX = 0;
  scrollInterval: any;

  personajeX: number = 100;
  personajeY: number = 0;
  velocidad = 5;
  saltando = false;
  gravedad = 2;
  impulsoSalto = 25;
  velocidadY = 0;

  bloqueCesped = { x: 500, visible: true };
  bloquesSuma = [
    { x: 800, empujado: false },
    { x: 880, empujado: false }
  ];
  bloqueSumaFusionado: boolean = false;
  bloqueResult = { x: 850, empujado: false };

  npc = { x: 1200, visible: true };

  puente = { x: 1800 };
  puenteReparado: boolean = false;

  mostrarNubeConstruccion: boolean = false;
  nube = { x: 1780, y: 100 };

  modoSumaActivo = false;
  mostrarAmuleto = false;
  amuleto = { x: 1100, y: 150 };
  npcTrabajando = false;

  monedasArray = [
    { x: 600, y: 0 },
    { x: 950, y: 0 },
    { x: 1300, y: 0 }
  ];

  mostrarEvaluacion = false;
  estrellas: number = 3; // Número de estrellas que quieres mostrar

  get estrellasArray() {
    return new Array(this.estrellas);
  }

  mostrarPantallaFinal = false;

  ngOnInit(): void {
    this.iniciarScroll();
    this.gravedadLoop();
  }

  iniciarScroll() {
    this.scrollInterval = setInterval(() => {
      const personaje = this.personajeRef?.nativeElement;
      if (personaje) {
        const posicion = personaje.getBoundingClientRect();
        this.scrollX = posicion.left - window.innerWidth / 2;
        window.scrollTo({ left: this.scrollX, behavior: 'smooth' });
      }
    }, 100);
  }

  gravedadLoop() {
    setInterval(() => {
      this.personajeY -= this.velocidadY;
      this.velocidadY -= this.gravedad;
      if (this.personajeY <= 0) {
        this.personajeY = 0;
        this.saltando = false;
        this.velocidadY = 0;
      }
    }, 30);
  }

  recolectarMoneda() {
    this.monedas++;
  }

  continuarIntro() {
    this.mensajeIndex++;
    if (this.mensajeIndex >= this.mensajesIntro.length) {
      this.mostrarMensaje = false;
      this.mostrarDialogo = true;
    }
  }

  continuarDialogo() {
    this.dialogoIndex++;
    if (this.dialogoIndex === 1) {
      this.mostrarDialogo = false;
      this.mostrarAmuleto = true;
    } else if (this.dialogoIndex === 2) {
      this.repararPuente();
    } else {
      this.mostrarDialogo = false;
    }
  }

  repararPuente() {
    this.npc.visible = false;
    this.npcTrabajando = true;
    this.mostrarNubeConstruccion = true;

    const sonidoConstru = new Audio('/assets/sounds/constru.mp3');
    const sonidoMartillo = new Audio('/assets/sounds/martillo.mp3');
    sonidoConstru.play();
    sonidoMartillo.play();

    setTimeout(() => {
      this.mostrarNubeConstruccion = false;
      this.puenteReparado = true;
      this.npc.visible = true;
      this.npcTrabajando = false;
      this.dialogoIndex++;
      this.mostrarDialogo = true;
    }, 5000);
  }

  @HostListener('document:keydown', ['$event'])
  manejarTeclado(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowRight':
        this.personajeX += this.velocidad;
        break;
      case 'ArrowLeft':
        this.personajeX -= this.velocidad;
        break;
      case ' ':
        if (!this.saltando) {
          this.saltando = true;
          this.velocidadY = this.impulsoSalto;
        }
        break;
      case 'E':
        this.empujarBloques();
        break;
      case 'S':
        this.modoSumaActivo = !this.modoSumaActivo;
        break;
      case 'Enter':
        if (this.mostrarDialogo) this.continuarDialogo();
        break;
    }
  }

  empujarBloques() {
    if (!this.bloqueSumaFusionado && this.modoSumaActivo && this.bloquesSuma[0].x + 80 >= this.bloquesSuma[1].x) {
      this.bloqueSumaFusionado = true;
    } else if (this.bloqueSumaFusionado) {
      this.bloqueResult.x += 40;
      if (this.bloqueResult.x >= this.npc.x - 50 && this.dialogoIndex === 1) {
        this.mostrarDialogo = true;
      }
    } else {
      this.bloquesSuma.forEach(b => b.x += 40);
    }

    if (this.bloqueCesped.visible && this.personajeX >= this.bloqueCesped.x - 50 && this.personajeX <= this.bloqueCesped.x + 50) {
      this.bloqueCesped.x += 40;
      if (this.bloqueCesped.x >= 650) {
        this.bloqueCesped.visible = false;
      }
    }
  }

  terminarNivel() {
    this.mostrarEvaluacion = true;
    if (this.vidas === 3 && this.monedas >= 3) this.estrellas = 3;
    else if (this.vidas >= 2) this.estrellas = 2;
    else this.estrellas = 1;
  }

  continuar() {
    this.mostrarPantallaFinal = true;
    setTimeout(() => {
      window.location.href = '/perfil';
    }, 10000);
  }

  ngOnDestroy(): void {
    clearInterval(this.scrollInterval);
  }
}
