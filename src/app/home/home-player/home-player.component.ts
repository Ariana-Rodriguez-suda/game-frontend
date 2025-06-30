import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-player',
  standalone: true,
  templateUrl: './home-player.component.html',
  styleUrls: ['./home-player.component.css']
})
export class HomePlayerComponent {
  constructor(private router: Router) {}

  goToTeacher() {
    this.router.navigate(['/home-teacher']);
  }
}
