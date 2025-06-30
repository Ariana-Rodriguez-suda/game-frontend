import { Component, OnInit } from '@angular/core';
import { AvatarService } from './avatar.service';
import { PlayerService } from '../../player.service';
import { CommonModule, NgForOf } from '@angular/common';

@Component({
  selector: 'app-avatar-selector',
  standalone: true,
  imports: [CommonModule, NgForOf],
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css'],
})
export class AvatarComponent implements OnInit {
  avatars: any[] = [];
  playerId: string | null = null;

  constructor(
    private avatarService: AvatarService,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    this.playerId = localStorage.getItem('userId');
    if (!this.playerId) return;

    this.avatarService.getOwnedAvatars(this.playerId).subscribe({
      next: (res) => {
        this.avatars = res;
      },
      error: () => alert('Error al obtener avatares'),
    });
  }

  activarAvatar(avatarId: number) {
    if (!this.playerId) return;

    this.playerService.setActiveAvatar(+this.playerId, avatarId).subscribe({
      next: () => alert('Avatar activado con éxito'),
      error: () => alert('No se pudo activar el avatar'),
    });
  }
}
