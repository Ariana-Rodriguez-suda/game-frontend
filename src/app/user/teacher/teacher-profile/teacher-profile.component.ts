import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../teacher.service';
import { ClassService } from '../../../class/class.service';
import { Router } from '@angular/router';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-teacher-profile',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, FormsModule],
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.css'],
})
export class TeacherProfileComponent implements OnInit {
  user: any;
  classes: any[] = [];
  newClassCode = '';
  createdClassCode: string | null = null;

  // Para editar
  editUsername = '';
  editEmail = '';
  editPassword = '';

  constructor(
    private teacherService: TeacherService,
    private classService: ClassService,
    private router: Router
  ) {}

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.teacherService.getTeacherDetails(userId).subscribe(data => {
        this.user = data;
        this.editUsername = data.username;
        this.editEmail = data.email;
        this.loadClasses(userId);
      });
    }
  }

  loadClasses(userId: string) {
    this.teacherService.getMyClasses(userId).subscribe(classes => {
      this.classes = classes;
    });
  }

  createClass() {
    if (!this.newClassCode.trim()) return;

    this.classService.createClass({ name: this.newClassCode.trim() }).subscribe({
      next: () => {
        this.createdClassCode = this.newClassCode.trim();
        this.newClassCode = '';
        alert('Clase creada con éxito');
        this.loadClasses(this.user.id);
      },
      error: (err) => alert('Error creando clase: ' + err.message),
    });
  }

  saveProfileChanges() {
    const updatedData = {
      username: this.editUsername,
      email: this.editEmail,
      password: this.editPassword || undefined,
    };

    this.teacherService.updateTeacher(this.user.id, updatedData).subscribe({
      next: () => alert('Perfil actualizado con éxito'),
      error: () => alert('Error actualizando perfil'),
    });
  }

  goToClass(classId: number) {
    this.router.navigate(['/class', classId, 'students']);
  }
}
