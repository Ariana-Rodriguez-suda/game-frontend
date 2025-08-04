import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BotonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-textbox-dialogo',
  templateUrl: './dialogo.component.html',
  styleUrls: ['./dialogo.component.css'],
  imports: [CommonModule, BotonComponent],
  standalone: true
})
export class TextboxDialogoComponent {
  @Input() linea: string = '';
  @Input() showButton: boolean = true;
  @Output() continue = new EventEmitter<void>();

  onContinue() {
    this.continue.emit();
  }
}
