// avatar-selector.component.ts
import { Component, OnInit } from '@angular/core';
import { AvatarService } from './avatar.service';
import { PlayerService } from '../../player.service';
import { CommonModule, NgForOf } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-avatar-selector',
  standalone: true,
  imports: [CommonModule, NgForOf],
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css'],
})
export class AvatarSelectorComponent implements OnInit {
  avatars: any[] = [];
  avatarImages: { [key: number]: string } = {
    1: 'assets/sprites/avatar-boy-temporal.png',
    2: 'assets/sprites/avatar-girl-temporal.png',
  };

  constructor(
    private avatarService: AvatarService,
    private playerService: PlayerService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.avatarService.getAllAvatars().subscribe({
      next: (res) => {
        this.avatars = res.map(a => ({ ...a, id: Number(a.id) }));
      },
      error: () => alert('Error al obtener avatares'),
    });
  }

  activarAvatar(id: number) {
    this.playerService.setActiveAvatar(id).subscribe({
      next: () => alert('Avatar activado con éxito'),
      error: () => alert('No se pudo activar el avatar'),
    });
  }

  goBack() {
    this.location.back();
  }
}
