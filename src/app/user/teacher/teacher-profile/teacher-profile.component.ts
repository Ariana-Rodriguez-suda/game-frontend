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
  this.teacherService.getTeacherDetails().subscribe({
    next: (data: TeacherUser) => {
      if (!data) {
        alert('No se pudo cargar el perfil del maestro.');
        this.router.navigate(['/login-teacher']); // o redirige a otro lado si quieres
        return;
      }

      this.user = data;
      this.editUsername = data.username;
      this.editEmail = data.email;
      this.loadClasses();
    },
    error: (err) => {
      console.error('Error al cargar perfil del maestro:', err);
      alert('Hubo un error cargando tu perfil. Intenta iniciar sesión de nuevo.');
      this.router.navigate(['/login-teacher']); // Redirige al login si hay error
    }
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

  volverHome() {
  this.router.navigate(['/home-teacher']);
}

deleteClass(classId: number) {
  if (!confirm('¿Estás seguro de que deseas eliminar esta clase?')) return;

  this.classService.deleteClass(classId).subscribe({
    next: () => {
      alert('Clase eliminada correctamente');
      this.loadClasses();
    },
    error: () => alert('Error al eliminar la clase'),
  });
}

editClass(clase: any) {
  const nuevoNombre = prompt('Nuevo nombre de clase:', clase.name);
  const nuevaMateria = prompt('Nueva materia:', clase.subject);
  const nuevaInstitucion = prompt('Nueva institución:', clase.institution);

  if (!nuevoNombre || !nuevaMateria || !nuevaInstitucion) return;

  const payload = {
    name: nuevoNombre,
    subject: nuevaMateria,
    institution: nuevaInstitucion
  };

  this.classService.updateClass(clase.id, payload).subscribe({
    next: () => {
      alert('Clase actualizada correctamente');
      this.loadClasses();
    },
    error: () => alert('Error al actualizar la clase')
  });
}

}
