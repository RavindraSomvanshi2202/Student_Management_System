import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NoAuthGuard } from './guard/noAuth-guard/no-auth.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: "login", component: LoginComponent, canActivate: [NoAuthGuard] },
  { path: "home", component: HomeComponent, canActivate: [NoAuthGuard] },
  { path: "admin", loadChildren: () => import("./modules/admin/admin.module").then(m => m.AdminModule) },
  { path: "student", loadChildren: () => import("./modules/student/student.module").then(m => m.StudentModule) },
  { path: "teacher", loadChildren: () => import("./modules/teacher/teacher.module").then(m => m.TeacherModule) },
  { path: "", redirectTo: "/login", pathMatch: "full" }  // Redirect root to login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
