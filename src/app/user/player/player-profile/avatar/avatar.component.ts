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
export class AvatarComponent implements OnInit {
  avatars: any[] = [];
avatarImages: { [key: number]: string } = {
    1: 'assets/sprites/avatar-boy-temporal.png',
    2: 'assets/sprites/avatar-girl-temporal.png',

  };

getAvatarImage(id: number): string {
  return this.avatarImages[id] || 'assets/avatars/default.png';
}

  constructor(
    private avatarService: AvatarService,
    private playerService: PlayerService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.avatarService.getAllAvatars().subscribe({
      next: (res) => {
        // Convertir el id a number para evitar errores en el template
        this.avatars = res.map(avatar => ({
          ...avatar,
          id: Number(avatar.id)
        }));
      },
      error: () => alert('Error al obtener avatares'),
    });
  }

  activarAvatar(avatarId: number) {
    this.playerService.setActiveAvatar(avatarId).subscribe({
      next: () => alert('Avatar activado con éxito'),
      error: () => alert('No se pudo activar el avatar'),
    });
  }

  goBack() {
  this.location.back();
}
}