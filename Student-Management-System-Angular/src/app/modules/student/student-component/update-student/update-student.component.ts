import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentService } from '../../student-service/student.service';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})
export class UpdateStudentComponent implements OnInit {

  CLASS: string[] = [
    "Play", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th"
  ];

  GENDER: string[] = [
    "Male", "Female", "Not Specified"
  ];

  validateForm: FormGroup;

  constructor(
    private studentService: StudentService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      fatherName: ['', Validators.required],
      motherName: ['', Validators.required],
      studentClass: ['', Validators.required],
      dob: ['', Validators.required],
      address: ['', Validators.required],
      gender: ['', Validators.required]
    });
    this.getStudentById();
  }

  getStudentById() {
    this.studentService.getStudentById().subscribe(
      (res) => {
        console.log(res);
        const student = res.studentDto;
        this.validateForm.patchValue(student);
      }
    );
  }

  updateStudent() {
    if (this.validateForm.invalid) {
      return;
    }
    this.studentService.updateStudent(this.validateForm.value).subscribe(
      (res) => {
        console.log(res);
        if (res.id != null) {
          this.snackBar.open("Record Updated", "Close", { duration: 5000 });
          this.getStudentById();
        } else {
          this.snackBar.open("Student Not Found", "Close", { duration: 5000 });
        }
      }
    );
  }
}
