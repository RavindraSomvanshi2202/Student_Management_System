import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentService } from '../../student-service/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.css']
})
export class ApplyLeaveComponent implements OnInit {

  CLASS: string[] = [
    "Play", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th"
  ];

  isSpinning = false;
  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]], // Add this
      studentClass: [null, [Validators.required]], // Add this
      subject: [null, [Validators.required]],
      body: [null, [Validators.required]],
      date: [null, [Validators.required]]
    });
  }
  

  applyLeave() {
    this.isSpinning = true;
    console.log(this.validateForm.value);
    this.studentService.applyLeave(this.validateForm.value).subscribe(
      (res) => {
        console.log(res);
        this.isSpinning = false;
        if (res.id != null) {
          this.snackBar.open('Leave Applied', 'SUCCESS', {
            duration: 5000
          });
          this.router.navigateByUrl('student/dashboard');
        } else {
          this.snackBar.open("Something Went Wrong", 'ERROR', {
            duration: 5000
          });
        }
      },
    );
  }
}
