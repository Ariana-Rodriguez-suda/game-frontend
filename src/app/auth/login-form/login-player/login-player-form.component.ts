import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-player-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-player-form.component.html',
  styleUrls: ['./login-player-form.component.css'],
})
export class LoginPlayerFormComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
this.authService.loginPlayer({ username: this.username, password: this.password }).subscribe({
  next: (res) => {
localStorage.setItem('token', res.access_token);
    localStorage.setItem('userId', res.user.id);
    this.router.navigate(['/player-profile']);
  },
  error: () => alert('Credenciales inválidas'),
});
  }

    goBack() {
    this.router.navigate(['/home-player']);
  }
}
