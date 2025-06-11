import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  standalone: true,
})
export class UserProfileComponent implements OnInit {
  user = {
        username: 'JuanPerez',
    role: 'Estudiante'
  };

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      // Aquí podrías decodificar el JWT y mostrar datos básicos
      this.user = JSON.parse(atob(token.split('.')[1]));
    }
  }
}

