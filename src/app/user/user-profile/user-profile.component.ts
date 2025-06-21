import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ClassService } from '../../class.service';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  standalone: true,
  imports: [CommonModule, NgIf, FormsModule],
})
export class UserProfileComponent implements OnInit {
  user: any;
  teacherName: string | null = null;
  isTeacher = false;

  newClassCode = '';
  createdClassCode: string | null = null;

  constructor(private userService: UserService, private classService: ClassService) {}

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.userService.getUserDetails(userId).subscribe(data => {
        this.user = data;
        this.isTeacher = this.user.role === 'maestro';

        if (this.user.role === 'jugador' && this.user.classRoom && this.user.classRoom.teacher) {
          this.teacherName = this.user.classRoom.teacher.username;
        } else {
          this.teacherName = null;
        }
      });
    }
  }

  createClass() {
    if (!this.newClassCode.trim()) return;

    this.classService.createClass({ code: this.newClassCode.trim() }).subscribe({
      next: () => {
        this.createdClassCode = this.newClassCode.trim();
        this.newClassCode = '';
        alert('Clase creada con éxito: ' + this.createdClassCode);
      },
      error: (err) => alert('Error creando clase: ' + err.message),
    });
  }
}
