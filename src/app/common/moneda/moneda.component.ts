import { Component, ElementRef, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-moneda',
  templateUrl: './moneda.component.html',
  styleUrls: ['./moneda.component.scss'],
  standalone: true,
  imports: [ CommonModule ]
})
export class MonedaComponent implements OnInit, OnDestroy {
  @Input() personajeRef!: ElementRef;
  @Output() recolectada = new EventEmitter<void>();
    @Input() x: number = 0;
  @Input() y: number = 0;

  visible: boolean = true;
  checkInterval: any;

  ngOnInit() {
    this.checkInterval = setInterval(() => {
      if (this.personajeRef && this.visible) {
        const monedaRect = (this.el.nativeElement as HTMLElement).getBoundingClientRect();
        const personajeRect = this.personajeRef.nativeElement.getBoundingClientRect();

        if (this.colisiona(monedaRect, personajeRect)) {
          this.recolectar();
        }
      }
    }, 100); // Se puede ajustar a 60ms para más precisión
  }

  constructor(private el: ElementRef) {}

  colisiona(rect1: DOMRect, rect2: DOMRect): boolean {
    return (
      rect1.left < rect2.right &&
      rect1.right > rect2.left &&
      rect1.top < rect2.bottom &&
      rect1.bottom > rect2.top
    );
  }

  recolectar() {
    this.visible = false;
    const sonido = new Audio('/assets/sounds/coin.mp3');
    sonido.play();
    this.recolectada.emit();
  }

  ngOnDestroy() {
    clearInterval(this.checkInterval);
  }
}
