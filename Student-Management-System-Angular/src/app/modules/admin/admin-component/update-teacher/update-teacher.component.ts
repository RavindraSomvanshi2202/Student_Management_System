import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin-service/admin.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-teacher',
  templateUrl: './update-teacher.component.html',
  styleUrls: ['./update-teacher.component.css']
})
export class UpdateTeacherComponent implements OnInit {

  teacherId: number = this.activatedRoute.snapshot.params['teacherId'];
  validateForm: FormGroup;
  isSpinning: boolean = false;

  constructor(
    private service: AdminService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      contactNumber: [null, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      qualification: [null, Validators.required],
      department: [null, Validators.required],
      dob: [null, Validators.required],
      address: [null, Validators.required],
      gender: [null, Validators.required]
    });
    this.getTeacherById();
  }

  getTeacherById() {
    this.isSpinning = true;
    this.service.getTeacherById(this.teacherId).subscribe({
      next: (res) => {
        this.validateForm.patchValue(res.teacherDto);
        this.isSpinning = false;
      },
      error: (err) => {
        console.error('Error fetching teacher data:', err);
        this.isSpinning = false;
      }
    });
  }

  updateTeacher() {
    if (this.validateForm.invalid) {
      return;
    }
    this.isSpinning = true;
    this.service.updateTeacher(this.teacherId, this.validateForm.value).subscribe({
      next: (res) => {
        if (res.id != null) {
          this.snackBar.open("Teacher Updated", "Close", { duration: 5000 });
        } else {
          this.snackBar.open("Something Went Wrong", "Close", { duration: 5000 });
        }
        this.isSpinning = false;
      },
      error: (err) => {
        console.error('Error updating teacher data:', err);
        this.isSpinning = false;
      }
    });
  }
}
