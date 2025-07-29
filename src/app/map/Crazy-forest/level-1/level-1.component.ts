import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nivel',
  templateUrl: './level-1.component.html',
  styleUrls: ['./level-1.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class Level1Component implements OnInit {
  avatarSrc = '/assets/sprites/avatar-boy-1.png';
  vidas = 3;
  monedas = 0;
  tiempo = 0;
  intervaloTiempo: any;

  player = { x: 50, y: 0, velocidadY: 0, enElSuelo: false };
  gravedad = -2;

  bloques = [
    { x: 150, y: 0, img: 'assets/images/bloque.png', fraccion: '4/6' },
    // otros bloques si deseas
  ];

  npc = { x: 800, y: 0 };
  puente = { x: 900, y: 0 };

  modoSuma = false;
  dialogoActivo = true;
  dialogoIndex = 0;
  dialogo = [
    'Bienvenido a Aventura Numeral.',
    'En este juego las fracciones se representan con bloques divididos en secciones.',
    'Las secciones coloradas representan el numerador y todas las secciones el denominador.',
    'El bloque que tienes al frente es 4/6.',
    'Presiona E para empujar bloques. Vamos, empuja el bloque para cubrir el agujero.'
  ];

  musica = new Audio('/assets/sonidos/musica-nivel.mp3');
  sonidoPuente = new Audio('/assets/sonidos/puente.mp3');

  ngOnInit() {
    this.musica.loop = true;
    this.musica.play();
    this.intervaloTiempo = setInterval(() => this.tiempo++, 1000);
  }

  siguienteDialogo() {
    if (this.dialogoIndex < this.dialogo.length - 1) {
      this.dialogoIndex++;
    } else {
      this.dialogoActivo = false;
    }
  }

  @HostListener('window:keydown', ['$event'])
  manejarTeclas(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') {
      this.player.x += 10;
    }
    if (event.key === 'ArrowLeft') {
      this.player.x -= 10;
    }
    if (event.key === ' ' && this.player.enElSuelo) {
      this.player.velocidadY = 20;
      this.player.enElSuelo = false;
    }
    if (event.key === 'e') {
      this.empujarBloque();
    }
    if (event.key === 's') {
      this.modoSuma = true;
      console.log('Modo suma activado');
    }
  }

  empujarBloque() {
    for (let bloque of this.bloques) {
      if (Math.abs(this.player.x - bloque.x) < 70) {
        bloque.x += 64;
      }
    }
  }
}
