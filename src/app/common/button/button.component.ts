import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() claseExtra: string = '';

  handleClick() {
    this.click.emit();
  }
}
