import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin-service/admin.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-post-teacher',
  templateUrl: './post-teacher.component.html',
  styleUrls: ['./post-teacher.component.css']
})
export class PostTeacherComponent implements OnInit {

  confirmationValidator(control: FormControl): { [s: string]: boolean } | null {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm?.get('password')?.value) {
      return { confirm: true, error: true };
    }
    return null;
  }
  
  validateForm: FormGroup;
  isSpinning: boolean = false;

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      password: ['', Validators.required],
      checkPassword: ['', [Validators.required, this.confirmationValidator.bind(this)]],
      contactNumber: [null, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      qualification: [null, Validators.required],
      department: [null, Validators.required],
      dob: [null, Validators.required],
      address: [null, Validators.required],
      gender: [null, Validators.required]
    });
  }  

  postTeacher() {
    console.log(this.validateForm.value);
    this.adminService.postTeacher(this.validateForm.value).subscribe(
      (res) => {
        console.log(res);
        if (res.id != null) {
          this.snackBar.open("Teacher Posted", "Close", {
            duration: 5000
          })
        } else if (res.id == null) {
          this.snackBar.open("Something Went Wrong ", "Close", {
            duration: 5000
          })
        }
      }
    )
  }

}
