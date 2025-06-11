import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
  imports: [FormsModule, CommonModule],
  standalone: true,
})
export class RegisterFormComponent {
  username = '';
  password = '';
  role = 'student';
  classCode = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register({ username: this.username, password: this.password, role: this.role, classCode: this.classCode }).subscribe({
      next: () => this.router.navigate(['/login']),
      error: err => alert('Error al registrarse')
    });
  }
}
