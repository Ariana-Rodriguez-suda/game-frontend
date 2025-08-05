// avatar-selector.component.ts
import { Component, OnInit } from '@angular/core';
import { AvatarService } from './avatar.service';
import { PlayerService } from '../../player.service';
import { CommonModule} from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-avatar-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css'],
})
export class AvatarSelectorComponent implements OnInit {
  avatars: any[] = [];
  indiceActual = 0;

  avatarImages: { [key: number]: string } = {
    1: '/assets/sprites/avatarBoy1.png',
    2: '/assets/sprites/avatarBoy2.png',
    3: '/assets/sprites/avatarBoy3.png',
    4: '/assets/sprites/avatarGirl1.png',
    5: '/assets/sprites/avatarGirl2.png',
    6: '/assets/sprites/avatarGirl3.png',
  };

  constructor(
    private avatarService: AvatarService,
    private playerService: PlayerService,
    private location: Location
  ) {}

 ngOnInit(): void {
  this.playerService.getAvatars().subscribe({
    next: (res) => {
      this.avatars = res.map((a) => ({ ...a, id: Number(a.id) }));
      this.indiceActual = 0;
    },
    error: () => alert('Error al obtener avatares'),
  });
}

get avatarActual() {
  return this.avatars[this.indiceActual];
}

activarAvatar() {
  if (!this.avatarActual) return;
  this.playerService.setActiveAvatar(this.avatarActual.id).subscribe({
    next: () => alert('Avatar activado con éxito'),
    error: () => alert('No se pudo activar el avatar'),
  });
}


anteriorAvatar() {
  if (this.avatars.length > 0) {
    this.indiceActual = (this.indiceActual - 1 + this.avatars.length) % this.avatars.length;
  }
}

siguienteAvatar() {
  if (this.avatars.length > 0) {
    this.indiceActual = (this.indiceActual + 1) % this.avatars.length;
  }
}


  goBack() {
    this.location.back();
  }
}
