import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-player',
  standalone: true,
  templateUrl: './home-player.component.html',
  styleUrls: ['./home-player.component.css'],
  imports: [RouterModule],
})
export class HomePlayerComponent {
  constructor(private router: Router) {}

  irLogin() {
    this.router.navigate(['/login']);
  }

  irRegister() {
    this.router.navigate(['/register-player']);
  }

  cambiarARolMaestro() {
    this.router.navigate(['/home-teacher']);
  }
}
