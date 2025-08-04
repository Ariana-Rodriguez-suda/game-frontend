import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-teacher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-teacher.component.html',
  styleUrls: ['./home-teacher.component.css']
})
export class HomeTeacherComponent {
  constructor(private router: Router) {}
backgroundUrl = '/assets/images/home.png';

  goToPlayer() {
    this.router.navigate(['/home-player']);
  }

goToLogin() {
  this.router.navigate(['/login-teacher']); 
}

goToRegister() {
  this.router.navigate(['/register-teacher']); 
}

}
