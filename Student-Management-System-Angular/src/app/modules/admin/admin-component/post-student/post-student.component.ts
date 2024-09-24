import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../admin-service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-post-student',
  templateUrl: './post-student.component.html',
  styleUrls: ['./post-student.component.css']
})
export class PostStudentComponent implements OnInit {

  CLASS: string[] = [
    "Play", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th"
  ];

  GENDER: string[] = [
    "Male", "Female", "Not Specified"
  ];

  isSpinning: boolean = false;
  validateForm!: FormGroup;

  confirmationValidator(control: FormControl): { [s: string]: boolean } | null {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm?.get('password')?.value) {
      return { confirm: true, error: true };
    }
    return null;
  }

  constructor(
    private service: AdminService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      contactNumber: [null, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', Validators.required],
      checkPassword: ['', [Validators.required, this.confirmationValidator.bind(this)]],
      fatherName: ['', Validators.required],
      motherName: ['', Validators.required],
      studentClass: ['', Validators.required],
      dob: ['', Validators.required],
      address: ['', Validators.required],
      gender: ['', Validators.required]
    });
  }

  postStudent() {
    if (this.validateForm.invalid) {
      return;
    }
    console.log(this.validateForm.value);
    this.isSpinning = true;
    this.service.addStudent(this.validateForm.value).subscribe(
      (res) => {
        this.isSpinning = false;
        if (res.id != null) {
          this.snackBar.open("Student Posted Successfully", "Close", { duration: 5000 });
        }
      },
      (error) => {
        this.isSpinning = false;
        this.snackBar.open("Student Already Existed", "Close", { duration: 5000 });
      }
    );
  }
}
