import { Component, OnInit } from '@angular/core';
import { MapService } from './map.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Mapa</h2>
    <ul>
      <li *ngFor="let world of worlds" (click)="goToWorld(world.id)" class="world-item">
        {{ world.name }}
      </li>
    </ul>
  `,
  styles: [`
    .world-item {
      cursor: pointer;
      padding: 10px;
      background-color: #f3c427;
      margin-bottom: 8px;
      border-radius: 8px;
      font-family: 'Press Start 2P', cursive;
      box-shadow: 2px 2px #000;
    }
    .world-item:hover {
      background-color: #e6b622;
    }
  `]
})
export class MapComponent implements OnInit {
  worlds: any[] = [];

  constructor(private mapService: MapService, private router: Router) {}

  ngOnInit() {
    this.mapService.getAvailableWorlds().subscribe(data => {
      this.worlds = data;
    });
  }

  goToWorld(id: number) {
    this.router.navigate(['/map/world', id]);
  }
}
