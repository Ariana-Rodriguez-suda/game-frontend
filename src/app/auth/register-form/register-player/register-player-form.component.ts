import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-player-form',
  standalone: true,
  templateUrl: './register-player-form.component.html',
  styleUrls: ['./register-player-form.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class RegisterPlayerFormComponent {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmitPlayer() {
    if (this.registerForm.invalid) return;

    const data = {
      ...this.registerForm.value,
      role: 'player',
    };

    this.authService.registerPlayer(data).subscribe((res) => {
      localStorage.setItem('token', res.access_token);
      localStorage.setItem('userId', res.user.id);
      this.router.navigate(['/player-profile']);
    });
  }
}
