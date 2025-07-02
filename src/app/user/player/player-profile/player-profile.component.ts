import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';
import { CommonModule, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { AvatarComponent } from './avatar/avatar.component';

@Component({
  selector: 'app-player-profile',
  standalone: true,
  imports: [CommonModule, NgIf, AvatarComponent],
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
}
