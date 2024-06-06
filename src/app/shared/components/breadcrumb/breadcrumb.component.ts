import { Component, Input } from '@angular/core';
import { AuthService, Role } from '@core';
import { AuthenService } from '@core/service/authen.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent {
  // @Input()
  // title!: string;
  @Input()
  items!: string[];
  @Input()
  active_item!: string;
  url: string = '/dashboard/dashboard';


  constructor(
    private authService: AuthService,
    private authenticationService: AuthenService,
    private _location: Location
  ) {
    this.url = this.homeURL();
  }

  homeURL():string {
    let url = '/dashboard/dashboard';
    const role = this.authenticationService.currentUserValue.user.role;
    if (role === 'CEO')  {
      url = '/dashboard/ceo-dashboard';
    } else if (role === 'CTO') {
      url = '/dashboard/cto-dashboard';
    } else if (role === 'CFO') {
      url = '/dashboard/cfo-dashboard';
    }
      else if (role === 'COO') {
      url = '/dashboard/coo-dashboard';
    } else if (role === 'IT Manager') {
      url = '/dashboard/it-manager-dashboard';
    } else if (role === 'HR Manager') {
      url = '/dashboard/hr-manager-dashboard';
    } else if (role === 'Admin Manager') {
      url = '/dashboard/admin-dashboard';
    } else if (role === 'Finance Manager') {
      url = '/dashboard/finance-manager-dashboard';
    }  else if (role === 'Staff') {
      url = '/dashboard/staff-dashboard';
    } 
     else {
      url = '/dashboard/dashboard';
    }
    return url;
  }

  backClicked() {
    this._location.back();
  }
}
