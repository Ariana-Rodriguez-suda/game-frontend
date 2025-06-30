import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crazy-forest',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <h2>Crazy Forest</h2>
    <ul>
      <li><button (click)="goToLevel(1)">Nivel 1 - Suma de fracciones</button></li>
      <li><button (click)="goToLevel(2)">Nivel 2 - Resta, multiplicación y división</button></li>
      <li><button (click)="goToLevel(3)">Nivel 3 - Operaciones combinadas</button></li>
    </ul>
  `,
  styles: [`
    h2 {
      font-family: 'Press Start 2P', cursive;
      color: #1f75cc;
      text-align: center;
      margin-bottom: 20px;
    }
    ul {
      list-style: none;
      padding: 0;
      text-align: center;
    }
    li {
      margin: 12px 0;
    }
    button {
      background-color: #f3c427;
      border: none;
      padding: 12px 24px;
      font-family: 'Press Start 2P', cursive;
      cursor: pointer;
      border-radius: 10px;
      box-shadow: 3px 3px #000;
      font-size: 14px;
    }
  `]
})
export class CrazyForestComponent {
  constructor(private router: Router) {}

  goToLevel(levelNumber: number) {
    this.router.navigate([`/map/crazy-forest/level-${levelNumber}`]);
  }
}
