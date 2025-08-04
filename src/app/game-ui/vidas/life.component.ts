import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-vidas',
  templateUrl: './life.component.html',
  styleUrls: ['./life.component.css'],
  standalone: true
})
export class VidasComponent {
  @Input() vidas: number = 3;

  get imagenVida(): string {
    switch (this.vidas) {
      case 0: return '/assets/hud/0vida.png';
      case 1: return '/assets/hud/1vida.png';
      case 2: return '/assets/hud/2vida.png';
      default: return '/assets/hud/fullvida.png';
    }
  }
}
