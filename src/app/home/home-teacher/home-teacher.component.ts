import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-teacher',
  standalone: true,
  templateUrl: './home-teacher.component.html',
  styleUrls: ['./home-teacher.component.css'],
  imports: [RouterModule],
})
export class HomeTeacherComponent {
  constructor(private router: Router) {}

  irLogin() {
    this.router.navigate(['/login-teacher']);
  }

  irRegister() {
    this.router.navigate(['/register-teacher']);
  }

  cambiarARolJugador() {
    this.router.navigate(['/home-player']);
  }
}
