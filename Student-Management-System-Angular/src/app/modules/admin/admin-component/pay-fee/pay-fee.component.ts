import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../admin-service/admin.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pay-fee',
  templateUrl: './pay-fee.component.html',
  styleUrls: ['./pay-fee.component.css']
})
export class PayFeeComponent implements OnInit {

  studentId: number = this.activatedRoute.snapshot.params['studentId'];
  validateForm: FormGroup;
  isSpinning: boolean = false;

  MONTH: string[] = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  constructor(
    private service: AdminService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      amount: [null, Validators.required],
      month: [null, Validators.required],
      givenBy: [null, Validators.required],
      description: [null, Validators.required]
    });
  }

  payFee() {
    if (this.validateForm.invalid) {
      this.snackBar.open("Please fill in all required fields", "Close", { duration: 5000 });
      return;
    }

    this.isSpinning = true;

    this.service.payFee(this.studentId, this.validateForm.value).subscribe(
      (res) => {
        this.isSpinning = false;
        if (res.id != null) {
          this.snackBar.open("Fees Paid Successfully", "Close", { duration: 5000 });
        } else {
          this.snackBar.open("Something Went Wrong", "Close", { duration: 5000 });
        }
      },
      (err) => {
        this.isSpinning = false;
        this.snackBar.open("Error occurred: " + err.message, "Close", { duration: 5000 });
      }
    );
  }
}
