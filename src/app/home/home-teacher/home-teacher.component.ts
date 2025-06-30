import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-teacher',
  standalone: true,
  templateUrl: './home-teacher.component.html',
  styleUrls: ['./home-teacher.component.css']
})
export class HomeTeacherComponent {
  constructor(private router: Router) {}

  goToPlayer() {
    this.router.navigate(['/home-player']);
  }
}
