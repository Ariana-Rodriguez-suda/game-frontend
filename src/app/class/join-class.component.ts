import { Component } from '@angular/core';
import { PlayerService } from '../user/player/player.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-join-class',
  templateUrl: './join-class.component.html',
  styleUrls: ['./join-class.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class JoinClassComponent {
  codigo: string = '';
  errorMessage: string = '';

  constructor(private playerService: PlayerService, private router: Router) {}

  unirseClase() {
    this.playerService.joinClass(this.codigo).subscribe({
      next: () => {
        alert('Te has unido a la clase');
        this.router.navigate(['/player-profile']);
      },
      error: () => {
        this.errorMessage = 'Código inválido o error al unirse.';
      },
    });
  }
}
