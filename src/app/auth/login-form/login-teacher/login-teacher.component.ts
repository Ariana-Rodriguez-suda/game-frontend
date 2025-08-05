import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BotonComponent } from '../../../common/button/button.component';

@Component({
  selector: 'app-login-teacher-form',
  standalone: true,
  templateUrl: './login-teacher.component.html',
  styleUrls: ['./login-teacher.component.css'],
  imports: [FormsModule, CommonModule, BotonComponent],
})
export class LoginTeacherFormComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

loginTeacher() {
  const credentials = {
    email: this.email.trim(),
    password: this.password.trim(),
  };
  console.log('Intentando login con:', credentials);
  this.authService.loginTeacher(credentials).subscribe({
    next: (res) => {
      localStorage.setItem('token', res.access_token);
      localStorage.setItem('userId', res.user.id);
      this.router.navigate(['/teacher-profile']);
    },
    error: () => alert('Credenciales inválidas'),
  });
}

  goBack() {
    this.router.navigate(['/home-teacher']);
  }
}
