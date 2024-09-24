import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../student-service/student.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  student: any;
  constructor(
    private service: StudentService
  ) { }

  ngOnInit(): void {
    this.getStudentById();
  }

  getStudentById() {
    this.service.getStudentById().subscribe(
      (res) => {
        console.log(res);
        this.student = res.studentDto;
      }
    )
  }

}
