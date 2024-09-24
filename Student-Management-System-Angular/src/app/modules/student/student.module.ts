import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StudentRoutingModule } from './student-routing.module';
import { DashboardComponent } from './student-component/dashboard/dashboard.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { ApplyLeaveComponent } from './student-component/apply-leave/apply-leave.component';
import { GetAllLeavesComponent } from './student-component/get-all-leaves/get-all-leaves.component';
import { UpdateStudentComponent } from './student-component/update-student/update-student.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ApplyLeaveComponent,
    GetAllLeavesComponent,
    UpdateStudentComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,

    ////////
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule

  ]
})
export class StudentModule { }
