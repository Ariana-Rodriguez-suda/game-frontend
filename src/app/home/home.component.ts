import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.html']
})
export class HomeComponent {
  constructor(private router: Router) {}

  jugar() {
    alert("¡Iniciando el juego!");
  }

  ajustes() {
    alert("Aquí puedes configurar");
  }

  irRegister() {
    this.router.navigate(['/register']);
  }

  irLogin() {
    this.router.navigate(['/login']);
  }

  irProfile() {
    this.router.navigate(['/profile']);
  }
}
