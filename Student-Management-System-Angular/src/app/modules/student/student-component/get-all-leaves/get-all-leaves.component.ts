import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../student-service/student.service';

@Component({
  selector: 'app-get-all-leaves',
  templateUrl: './get-all-leaves.component.html',
  styleUrls: ['./get-all-leaves.component.css']
})
export class GetAllLeavesComponent implements OnInit {

  isSpinning = false;
  leaves: any;

  constructor(
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
    this.getAllLeaves();
  }

  getAllLeaves() {
    this.isSpinning = true;
    this.studentService.getAllAppliedLeavesByStudentId().subscribe(
      (res) => {
        console.log(res);
        this.isSpinning = false;
        this.leaves = res;
      }
    )
  }

}
