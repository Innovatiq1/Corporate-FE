import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard  {
  constructor(private authService: AuthService, private router: Router) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.currentUserValue) {
      const userRole = this.authService.currentUserValue.role;
      if (route.data['role'] && route.data['role'].indexOf(userRole) === -1) {
        let userType = JSON.parse(localStorage.getItem('user_data')!).user.type;
        if(userType == 'admin' || userType =='Instructor'){
        this.router.navigate(['/authentication/TMS/signin']);
        } else if(userType == 'Student'){
          this.router.navigate(['/authentication/LMS/signin']);
        } else {
          this.router.navigate(['/authentication/TMS/signin']);
        }
        return false;
      }
      return true;
    }

    let userType = JSON.parse(localStorage.getItem('user_data')!).user.type;
    if(userType == 'admin' || userType =='Instructor'){
    this.router.navigate(['/authentication/TMS/signin']);
    } else if(userType == 'Student'){
      this.router.navigate(['/authentication/LMS/signin']);
    } else {
      this.router.navigate(['/authentication/TMS/signin']);
    }
return false;
  }
}
