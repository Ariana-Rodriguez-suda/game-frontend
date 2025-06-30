import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  template: `
    <button [disabled]="disabled" (click)="clicked()" class="btn">
      <ng-content></ng-content>
    </button>
  `,
  styles: [`
    .btn {
      background-color: #f3c427;
      border: none;
      padding: 12px;
      font-family: 'Press Start 2P', cursive;
      cursor: pointer;
      border-radius: 10px;
      box-shadow: 3px 3px #000;
      font-size: 12px;
      color: #000;
    }
    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `]
})
export class ButtonComponent {
  @Input() disabled = false;

  clicked() {
    // Puedes agregar lógica común si quieres, o emitir evento Output
  }
}
