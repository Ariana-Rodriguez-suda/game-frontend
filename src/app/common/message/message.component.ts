import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotonComponent } from '../button/button.component';

@Component({
  selector: 'app-textbox-mensaje',
  templateUrl: './mensaje.component.html',
  styleUrls: ['./mensaje.component.css'],
  imports: [CommonModule, BotonComponent],
  standalone: true
})
export class TextboxMensajeComponent {
  @Input() mensaje: string = '';
  @Input() showButton: boolean = true;
  @Output() continue = new EventEmitter<void>();

  onContinue() {
    this.continue.emit();
  }
}
