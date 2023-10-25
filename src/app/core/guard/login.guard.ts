
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UtilsService } from '@core/service/utils.service';

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(private utilsService: UtilsService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.utilsService.isLoggedIn()) { 
            return true;
        }
        this.router.navigate(['/authentication/signin']);
        return false;
    }
}