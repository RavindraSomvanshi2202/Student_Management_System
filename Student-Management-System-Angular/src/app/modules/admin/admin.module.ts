import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './admin-component/dashboard/dashboard.component';
import { PostStudentComponent } from './admin-component/post-student/post-student.component';
import { AllStudentComponent } from './admin-component/all-student/all-student.component';

///////////
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { UpdateStudentComponent } from './admin-component/update-student/update-student.component';
import { PayFeeComponent } from './admin-component/pay-fee/pay-fee.component';
import { AllLeavesComponent } from './admin-component/all-leaves/all-leaves.component';
import {MatMenuModule} from '@angular/material/menu';
import { PostTeacherComponent } from './admin-component/post-teacher/post-teacher.component';
import { AllTeacherComponent } from './admin-component/all-teacher/all-teacher.component';
import { UpdateTeacherComponent } from './admin-component/update-teacher/update-teacher.component';



@NgModule({
  declarations: [
    DashboardComponent,
    PostStudentComponent,
    AllStudentComponent,
    UpdateStudentComponent,
    PayFeeComponent,
    AllLeavesComponent,
    PostTeacherComponent,
    AllTeacherComponent,
    UpdateTeacherComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
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
    MatCardModule,
    MatMenuModule

  ]
})
export class AdminModule { }
