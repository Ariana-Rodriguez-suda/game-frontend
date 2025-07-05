import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';
import { CommonModule, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { AvatarDisplayComponent } from './avatar/avatar-display.component';

@Component({
  selector: 'app-player-profile',
  standalone: true,
  imports: [CommonModule, NgIf, AvatarDisplayComponent],
  templateUrl: './player-profile.component.html',
  styleUrls: ['./player-profile.component.css'],
})
export class PlayerProfileComponent implements OnInit {
  player: any | null = null;

  constructor(private playerService: PlayerService, private router: Router) {}

  ngOnInit(): void {
    this.playerService.getProfile().subscribe({
      next: (data: any) => {
        this.player = data;
      },
      error: (err: any) => {
        console.error('Error fetching player profile', err);
        alert('Error al obtener datos del jugador');
      },
    });
  }

  irJugar(): void {
    this.router.navigate(['/map/crazy-forest/level-1']);
  }

  irTienda(): void {
    this.router.navigate(['/map/shop']);
  }

    irSeleccionarAvatar() {
    this.router.navigate(['/app-avatar-selector']);
  }

    goBack() {
    this.router.navigate(['/home-player']);
  }

  irUnirseClase() {
  this.router.navigate(['/join-class']); // Ajusta si tu ruta es distinta
}
}
