import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin-service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-all-student',
  templateUrl: './all-student.component.html',
  styleUrls: ['./all-student.component.css']
})
export class AllStudentComponent implements OnInit {

  students: any;

  constructor(private service: AdminService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getAllStudents();
  }

  getAllStudents() {
    this.service.getAllStudents().subscribe((res) => {
      console.log(res);
      this.students = res;
    })
  }

  deleteStudent(studentId: number) {
    this.service.deleteStudent(studentId).subscribe((res) => {
      console.log(res);
      this.getAllStudents();
      this.snackBar.open("Student Deleted Successfully", "Close", { duration: 5000 })
    })
  }
}
