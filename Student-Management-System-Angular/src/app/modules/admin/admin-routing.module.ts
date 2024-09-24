import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin-component/dashboard/dashboard.component';
import { AdminGuard } from 'src/app/guard/admin-guard/admin.guard';
import { PostStudentComponent } from './admin-component/post-student/post-student.component';
import { AllStudentComponent } from './admin-component/all-student/all-student.component';
import { UpdateStudentComponent } from './admin-component/update-student/update-student.component';
import { PayFeeComponent } from './admin-component/pay-fee/pay-fee.component';
import { AllLeavesComponent } from './admin-component/all-leaves/all-leaves.component';
import { PostTeacherComponent } from './admin-component/post-teacher/post-teacher.component';
import { AllTeacherComponent } from './admin-component/all-teacher/all-teacher.component';
import { UpdateTeacherComponent } from './admin-component/update-teacher/update-teacher.component';

const routes: Routes = [
  { path: "dashboard", component: DashboardComponent, canActivate: [AdminGuard] },
  { path: "student", component: PostStudentComponent, canActivate: [AdminGuard] },
  { path: "students", component: AllStudentComponent, canActivate: [AdminGuard] },
  { path: "student/:studentId", component: UpdateStudentComponent, canActivate: [AdminGuard] },
  { path: "fee/:studentId", component: PayFeeComponent, canActivate: [AdminGuard] },
  { path: "leaves", component: AllLeavesComponent, canActivate: [AdminGuard] },
  { path: "teacher", component: PostTeacherComponent, canActivate: [AdminGuard] },
  { path: "teachers", component: AllTeacherComponent, canActivate: [AdminGuard] },
  { path: "teacher/:teacherId", component: UpdateTeacherComponent, canActivate: [AdminGuard] }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
