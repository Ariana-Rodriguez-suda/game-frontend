import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-boton',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class BotonComponent {
  @Input() texto: string = 'OK';
  @Output() click = new EventEmitter<void>();

  // Permite aplicar clases externas al componente
  @Input()
  @HostBinding('class')
  claseExtra: string = '';

  handleClick() {
    this.click.emit();
  }
}
