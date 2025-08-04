// nivel1.component.ts
import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextboxMensajeComponent } from "../../common/message/message.component";
import { TextboxDialogoComponent } from "../../common/dialogo/dialogo.component";
import { BotonComponent } from "../../common/button/button.component";
import { VidasComponent } from '../../game-ui/vidas/life.component';
import { CoinScoreComponent } from '../../game-ui/score-coin/coins.component';

@Component({
  selector: 'app-nivel1',
  templateUrl: './level-1.component.html',
  styleUrls: ['./level-1.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    TextboxMensajeComponent,
    TextboxDialogoComponent,
    BotonComponent,
    VidasComponent,
    CoinScoreComponent
  ]
})
export class Nivel1Component implements OnInit {
  vidas = 3;
  monedas = 0;
  mensaje = '';
  mostrarMensaje = false;
  mostrarDialogo = false;
  enDialogo = false;
  indexDialogo = 0;
  personajeX = 100;
  personajeY = 300;
  velocidad = 5;
  scrollX = 0;
  bloqueCespedPuesto = false;
  modoSuma = false;
  bloquesSumados = false;
  puenteReparado = false;
  npcDesaparecido = false;
  mostrarAmuleto = false;
  bloqueResultActivo = false;

  // física del salto
  saltando = false;
  gravedad = 3;
  velocidadSalto = 0;
  alturaSalto = 15;
  sueloY = 300;

  plataformas = [
    { x: 1200, y: 400 },
    { x: 1400, y: 350 },
    { x: 1600, y: 300 },
    { x: 1800, y: 300 },
    { x: 2000, y: 300 }
  ];

  monedasPos = [
    { x: 1250, y: 360 },
    { x: 1450, y: 310 },
    { x: 1650, y: 260 },
    { x: 1850, y: 260 },
    { x: 2050, y: 260 }
  ];

  monedasRecolectadas: boolean[] = new Array(5).fill(false);

  bloquesSuma = [
    { x: 2200, y: 300, usado: false },
    { x: 2400, y: 300, usado: false }
  ];

  npcX = 2650;
  puenteX = 2750;
  huecos = [
    { x: 700, width: 180 },
    { x: 2700, width: 200 }
  ];

  dialogosNpc = [
    'Hola, quieres cruzar el puente? Bueno la ultima tormenta lo destruyo...',
    '...pero podria arreglarlo si me consigues 8/16 madera...',
    'Toma te doy este amuleto que te deja usar el MODO SUMA activalo con la tecla S.'
  ];
  dialogoFinal = 'Bueno ahi esta, te deseo buena suerte. Tambien ten cuidado. Los soldados se encuentran mas adelante. Adios';

  nivelTerminado = false;
  mostrarEstrellas = false;
  estrellas = 0;

  ngOnInit(): void {
    this.mensaje = 'Bienvenido a Aventura Numeral, en este juego las fracciones se representan con bloques divididos en secciones, las secciones coloradas representan el numerador y todas las secciones representan el denominador, el bloque que tienes en frente tiene 4 secciones coloradas y son 6 secciones en total por lo que es una fraccion de 4/6. Puedes empujar los bloques con la tecla E, vamos empuja el bloque para seguir con el juego';
    this.mostrarMensaje = true;

    setInterval(() => this.actualizarFisica(), 50);
  }

  continuarMensaje() {
    this.mostrarMensaje = false;
  }

  continuarDialogo() {
    this.indexDialogo++;
    if (this.indexDialogo >= this.dialogosNpc.length) {
      this.mostrarDialogo = false;
      this.enDialogo = false;
    }
  }

  @HostListener('document:keydown', ['$event'])
  manejarTeclas(event: KeyboardEvent) {
    if (this.mostrarMensaje || this.mostrarDialogo) return;

    switch (event.key) {
      case 'ArrowRight':
        this.personajeX += this.velocidad;
        this.scrollX -= this.velocidad;
        break;
      case 'ArrowLeft':
        this.personajeX -= this.velocidad;
        this.scrollX += this.velocidad;
        break;
      case ' ':
        if (!this.saltando) {
          this.saltando = true;
          this.velocidadSalto = -this.alturaSalto;
        }
        break;
      case 'e':
        this.interactuar();
        break;
      case 's':
        this.modoSuma = !this.modoSuma;
        break;
    }

    this.verificarZona();
  }

  actualizarFisica() {
    if (this.saltando) {
      this.personajeY += this.velocidadSalto;
      this.velocidadSalto += this.gravedad;

      if (this.personajeY >= this.sueloY) {
        this.personajeY = this.sueloY;
        this.saltando = false;
      }
    }
  }

  interactuar() {
    if (!this.bloqueCespedPuesto && this.personajeX > 300 && this.personajeX < 360) {
      this.bloqueCespedPuesto = true;
    }

    if (!this.enDialogo && this.personajeX > this.npcX - 50 && this.personajeX < this.npcX + 50 && !this.mostrarAmuleto) {
      this.mostrarDialogo = true;
      this.enDialogo = true;
      this.indexDialogo = 0;
      this.mostrarAmuleto = true;
    }
  }

  verificarZona() {
    for (const hueco of this.huecos) {
      if (this.personajeX > hueco.x && this.personajeX < hueco.x + hueco.width) {
        if ((hueco.x === 700 && !this.bloqueCespedPuesto) || (hueco.x === 2700 && !this.puenteReparado)) {
          this.perderVida();
        }
      }
    }

    this.monedasPos.forEach((moneda, index) => {
      if (!this.monedasRecolectadas[index] && this.personajeX > moneda.x - 10 && this.personajeX < moneda.x + 10) {
        this.monedas++;
        this.monedasRecolectadas[index] = true;
      }
    });

    if (this.modoSuma && !this.bloquesSumados && this.personajeX > 2250 && this.personajeX < 2450) {
      this.bloquesSumados = true;
      this.bloqueResultActivo = true;
    }

    if (this.bloqueResultActivo && !this.puenteReparado && this.personajeX > this.npcX - 10 && this.personajeX < this.npcX + 10) {
      this.repararPuente();
    }

    if (this.puenteReparado && this.personajeX > 2900 && this.personajeX < 3000 && !this.nivelTerminado) {
      this.finalizarNivel();
    }
  }

  perderVida() {
    this.vidas--;
    this.personajeX = 100;
    this.scrollX = 0;
    if (this.vidas <= 0) {
      alert('Fin del juego');
    }
  }

  repararPuente() {
    this.npcDesaparecido = true;
    this.mostrarMensaje = true;
    this.mensaje = 'Gracias. Ya me pongo a trabajar';
    setTimeout(() => {
      setTimeout(() => {
        this.puenteReparado = true;
        this.mostrarMensaje = false;
        this.mostrarDialogo = true;
        this.dialogosNpc = [this.dialogoFinal];
        this.indexDialogo = 0;
        this.enDialogo = true;
      }, 5000);
    }, 1000);
  }

  finalizarNivel() {
    this.nivelTerminado = true;
    this.estrellas = this.vidas;
    this.mostrarEstrellas = true;
    setTimeout(() => {
      window.location.href = '/perfil';
    }, 10000);
  }
}
