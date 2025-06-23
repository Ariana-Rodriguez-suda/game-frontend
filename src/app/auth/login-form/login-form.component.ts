import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class LoginFormComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
this.authService.login(this.email, this.password).subscribe({
  next: (res) => {
    localStorage.setItem('token', res.access_token);
    localStorage.setItem('userId', res.user.id);
    this.router.navigate(['/user-profile']);
  },
  error: () => alert('Credenciales inválidas')
});
  }
}
