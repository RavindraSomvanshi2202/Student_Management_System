import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { StorageService } from 'src/app/services/storage/storage.service';

@Injectable({
  providedIn: "root"
})
export class NoAuthGuard implements CanActivate {

  constructor(
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (StorageService.hasToken() && StorageService.isStudentLoggedIn()) {
      this.router.navigateByUrl("/student/dashboard");
      return false;
    }
    else if (StorageService.hasToken() && StorageService.isAdminLoggedIn()) {
      this.router.navigateByUrl("/admin/dashboard");
      return false;
    }
    return true;
  }
}
