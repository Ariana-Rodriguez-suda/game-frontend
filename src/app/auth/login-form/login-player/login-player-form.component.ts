import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-player-form',
  standalone: true,
  templateUrl: './login-player-form.component.html',
  styleUrls: ['./login-player-form.component.css'],
  imports: [FormsModule, CommonModule],
})
export class LoginPlayerFormComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  loginPlayer() {
    const data = { username: this.username, password: this.password };

this.authService.loginPlayer(this.username, this.password).subscribe({
  next: (res) => {
    localStorage.setItem('token', res.access_token);
    localStorage.setItem('userId', res.user.id);
    this.router.navigate(['/player-profile']);
  },
  error: () => alert('Credenciales inválidas'),
});
  }
}
