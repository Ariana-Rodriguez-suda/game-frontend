import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crazy-forest',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './crazy-forest.component.html',
  styleUrls: ['./crazy-forest.component.css'],
})
export class CrazyForestComponent {
  constructor(private router: Router) {}

  goToLevel(level: number) {
    this.router.navigate([`/map/crazy-forest/level-${level}`]);
  }
}
