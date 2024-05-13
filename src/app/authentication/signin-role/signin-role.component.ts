import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from '@core/service/utils.service';

@Component({
  selector: 'app-signin-role',
  templateUrl: './signin-role.component.html',
  styleUrls: ['./signin-role.component.scss']
})
export class SigninRoleComponent {

  selectedUser: string = '';
  constructor(
    private router: Router,
    public utils: UtilsService,
  ) {}
  images: string[] = ['/assets/images/login/Learning.jpeg', '/assets/images/login/learning2.jpg', '/assets/images/login/learning4.jpg'];
    currentIndex = 0;

  startSlideshow() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 4000);
  }
  selectUser(userType: string) {
    this.selectedUser = userType;
  }
  openUrl() {
    if (this.selectedUser === 'staff') {
    
      this.router.navigate(['/authentication/TMS/signin']);
      // window.location.href = 'http://localhost:4200/authentication/TMS/signin';
    } else if (this.selectedUser === 'student') {
    
      this.router.navigate(['/authentication/LMS/signin']);
      // window.location.href = 'http://localhost:4200/authentication/LMS/signin';
    } else {
      
      alert('Please select role first.');
    }
  }
}
