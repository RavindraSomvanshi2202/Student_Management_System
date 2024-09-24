import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup | undefined;

  constructor(
    private service: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  login() {
    console.log(this.loginForm?.value);
    this.service.login(
      this.loginForm?.get('email')?.value,
      this.loginForm?.get('password')?.value
    ).subscribe(
      (response) => {
        console.log(response);
        if (StorageService.isAdminLoggedIn()) {
          this.router.navigateByUrl("admin/dashboard");
          if (response != null) {
            this.snackbar.open("Login Success", "Close", { duration: 3000 });
          }
        } else if (StorageService.isStudentLoggedIn()) {
          this.router.navigateByUrl("student/dashboard");
          if (response != null) {
            this.snackbar.open("Login Success", "Close", { duration: 3000 });
          }
        } else if (StorageService.isTeacherLoggedIn()) {
          this.router.navigateByUrl("teacher/dashboard");
          if (response != null) {
            this.snackbar.open("Login Success", "Close", { duration: 3000 });
          }
        }
      },
      (error) => {
        if (error.status === 403) {
          this.snackbar.open("Invalid username or password", "Close", { duration: 3000 });
        } else {
          this.snackbar.open("An error occurred", "Close", { duration: 5000 });
        }
      }
    );
  }

}
