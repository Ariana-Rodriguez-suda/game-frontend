import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../teacher.service';
import { ClassService } from '../../../class/class.service';
import { Router } from '@angular/router';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TeacherUser } from '../teacher.interface';

@Component({
  selector: 'app-teacher-profile',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, FormsModule],
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.css'],
})
export class TeacherProfileComponent implements OnInit {
user!: TeacherUser;
  classes: any[] = [];
  newClassName = '';
  newClassSubject = '';
  newClassInstitution = '';
  editMode = false;
  editUsername = '';
  editEmail = '';
  editPassword = '';

  constructor(
    private teacherService: TeacherService,
    private classService: ClassService,
    private router: Router
  ) {}

ngOnInit() {
  this.teacherService.getTeacherDetails().subscribe((data: TeacherUser) => {
    this.user = data;
    this.editUsername = data.username;
    this.editEmail = data.email;
    this.loadClasses();
  });
}


loadClasses() {
  this.teacherService.getMyClasses().subscribe(classes => {
    this.classes = classes;
  });
}

  createClass() {
    const payload = {
      name: this.newClassName,
      subject: this.newClassSubject,
      institution: this.newClassInstitution,
    };

    this.classService.createClass(payload).subscribe({
      next: () => {
        alert('Clase creada con éxito');
        this.newClassName = '';
        this.newClassSubject = '';
        this.newClassInstitution = '';
        this.loadClasses();
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

    this.teacherService.updateTeacher(updatedData).subscribe({
      next: () => alert('Perfil actualizado con éxito'),
      error: () => alert('Error actualizando perfil'),
    });
  }

  goToClass(classId: number) {
    this.router.navigate(['/class', classId, 'students']);
  }
}
