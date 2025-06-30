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
  player: any;

  constructor(private playerService: PlayerService, private router: Router) {}

  ngOnInit(): void {
    const id = localStorage.getItem('userId');
    if (!id) return;

    this.playerService.getPlayerDetails(id).subscribe({
      next: (data) => {
        this.player = data;
      },
      error: () => {
        alert('Error al obtener datos del jugador');
      },
    });
  }

  irMapa() {
    this.router.navigate(['/map']);
  }

  irTienda() {
    this.router.navigate(['/map/shop']);
  }
}
