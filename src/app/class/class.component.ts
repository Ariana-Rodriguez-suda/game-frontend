import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeacherService } from '../user/teacher/teacher.service';
import { CommonModule, NgIf, NgFor } from '@angular/common';

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

  constructor(
    private route: ActivatedRoute,
    private teacherService: TeacherService
  ) {}

  ngOnInit(): void {
    this.classId = Number(this.route.snapshot.paramMap.get('id'));
    this.teacherService.getStudentsByClass(this.classId).subscribe((data) => {
      this.students = data;
    });
  }
}
