import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeacherService } from '../user/teacher/teacher.service';
import { ClassService } from './class.service';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { ProgressService } from '../progress.service';

@Component({
  selector: 'app-class',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {
  classId: number = 0;
  students: any[] = [];
  classInfo: any = null; // 🔧 <-- Esta es la propiedad que necesitas

  constructor(
    private route: ActivatedRoute,
    private teacherService: TeacherService,
    private classService: ClassService,
    private progressService: ProgressService
  ) {}


  ngOnInit(): void {
    this.classId = Number(this.route.snapshot.paramMap.get('id'));

    // Obtener información de la clase
    this.classService.getClassById(this.classId).subscribe((info) => {
      this.classInfo = info;
    });

    // Cargar estudiantes
    this.teacherService.getStudentsByClass(this.classId).subscribe((data) => {
      this.students = data.map((student) => ({
        ...student,
        nivel: 0,
      }));

      // Cruzar con progreso
      this.progressService.getProgressForTeacher().subscribe((progressList) => {
        this.students.forEach((student) => {
          const progreso = progressList
            .filter((p) => p.player.id === student.id && p.completed)
            .sort((a, b) => b.level - a.level);
          if (progreso.length > 0) {
            student.nivel = progreso[0].level;
          }
        });
      });
    });
  }

  goBack() {
  history.back(); // o this.router.navigate(['/teacher-profile']);
}

}
