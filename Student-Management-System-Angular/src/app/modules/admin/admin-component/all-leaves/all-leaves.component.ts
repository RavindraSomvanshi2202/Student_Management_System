import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin-service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-all-leaves',
  templateUrl: './all-leaves.component.html',
  styleUrls: ['./all-leaves.component.css']
})
export class AllLeavesComponent implements OnInit {

  isSpinning = false;
  leaves: any;

  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getAllLeaves();
  }

  getAllLeaves() {
    this.isSpinning = true;
    this.adminService.getAllAppliedLeaves().subscribe(
      (res) => {
        console.log(res);
        this.isSpinning = false;
        this.leaves = res;
      },
      (err) => {
        this.isSpinning = false;
        this.snackBar.open("Failed to fetch leaves", "Close", { duration: 5000 });
      }
    );
  }

  changeLeaveStatus(leaveId: number, status: string) {
    this.isSpinning = true;
    this.adminService.changeLeaveStatus(leaveId, status).subscribe(
      (res) => {
        console.log(res);
        this.isSpinning = false;
        if (res.id != null) {
          const message = status === 'Approve' ? "Leave Approved" : "Leave Rejected";
          this.snackBar.open(message, "Close", { duration: 5000 });
          this.getAllLeaves();
        } else {
          this.snackBar.open("Something Went Wrong", "ERROR", { duration: 5000 });
        }
      },
      (err) => {
        this.isSpinning = false;
        this.snackBar.open("Failed to change leave status", "Close", { duration: 5000 });
      }
    );
  }

}
