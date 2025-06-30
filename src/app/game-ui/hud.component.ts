import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hud',
  standalone: true,
  template: `
    <div class="hud">
      <div>Monedas: {{ coins }}</div>
      <div>Nivel: {{ level }}</div>
    </div>
  `,
  styles: [`
    .hud {
      position: fixed;
      top: 10px;
      left: 10px;
      background-color: rgba(243, 196, 39, 0.8);
      padding: 10px 20px;
      border-radius: 8px;
      font-family: 'Press Start 2P', cursive;
      color: #000;
      box-shadow: 2px 2px #000;
      user-select: none;
      z-index: 1000;
    }
  `]
})
export class HudComponent {
  @Input() coins = 0;
  @Input() level = 1;
}
