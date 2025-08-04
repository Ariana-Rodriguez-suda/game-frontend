import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-coin-score',
  templateUrl: './coin-score.component.html',
  styleUrls: ['./coin-score.component.css'],
  standalone: true
})
export class CoinScoreComponent {
  @Input() monedas: number = 0;
}
