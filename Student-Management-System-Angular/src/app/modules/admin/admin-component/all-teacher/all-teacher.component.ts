import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin-service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-all-teacher',
  templateUrl: './all-teacher.component.html',
  styleUrls: ['./all-teacher.component.css']
})
export class AllTeacherComponent implements OnInit {

  teachers = [];

  constructor(
    private service: AdminService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getAllTeachers();
  }

  getAllTeachers() {
    this.service.getAllTeachers().subscribe(
      (res) => {
        console.log(res);
        this.teachers = res;
      })
  }

  deleteTeacher(teacherId: number) {
    console.log(teacherId);
    this.service.deleteTeacher(teacherId).subscribe((res) => {
      console.log(res);
      this.getAllTeachers();
      this.snackBar.open("Teacher Deleted", "Close", { duration: 5000 })
    })
  }
}
