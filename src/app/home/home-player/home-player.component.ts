import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-player.component.html',
  styleUrls: ['./home-player.component.css']
})
export class HomePlayerComponent {
  constructor(private router: Router) {}
  backgroundUrl = 'assets/images/background_home.jpg';
  goToTeacher() {
    this.router.navigate(['/home-teacher']);
  }

  goToLogin() {
  this.router.navigate(['/login-player']); // o '/login-teacher'
}

goToRegister() {
  this.router.navigate(['/register-player']); // o '/register-teacher'
}

}
