import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-teacher-form',
  standalone: true,
  templateUrl: './login-teacher.component.html',
  styleUrls: ['./login-teacher.component.css'],
  imports: [FormsModule, CommonModule],
})
export class LoginTeacherFormComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.access_token);
        localStorage.setItem('userId', res.user.id);
        this.router.navigate(['/teacher-profile']);
      },
      error: () => alert('Credenciales inválidas'),
    });
  }
}
