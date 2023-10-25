import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { LanguageService } from '@core/service/language.service';
import { AuthService } from '@core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  authForm!: UntypedFormGroup;
  langStoreValue?: string;
  submitted = false;
  returnUrl!: string;
  error: any;
 // resetLink: boolean;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private translate: LanguageService,
    private authService:AuthService
  ) {}
  ngOnInit() {
    this.startSlideshow();
    this.authForm = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  setLanguage(event: any) {  
    console.log("=======",event)
    // this.countryName = text;
    // this.flagvalue = flag;
    this.langStoreValue = event.target.value;
    this.translate.setLanguage(event.target.value);
  }
  listLang = [
    { text: 'English', flag: 'assets/images/flags/us.svg', lang: 'en' },
    { text: 'Chinese', flag: 'assets/images/flags/spain.svg', lang: 'ch' },
    { text: 'Tamil', flag: 'assets/images/flags/germany.svg', lang: 'ts' },
  ];

  get f() {
    return this.authForm.controls;
  }
  onSubmit() {
    this.submitted = true;
   
    // stop here if form is invalid
    if (this.authForm.invalid) {

      return;
    } else {
      this.authService.forgotPassword(this.authForm.value).subscribe({next: (res) => {
        if (res) {
          Swal.fire({
            title: 'Email Send Successful',
            text: "We have sent new password to your email successfully.",
            icon: 'success',
          });
          this.router.navigate(['/authentication/signin']);
          
          
        } else {
         // this.error = 'Invalid Login';
        }
      },
      error: (error) => {
        this.error = error;
        this.submitted = false;
        //this.loading = false;
      },
    });
      
    }
  }
  images: string[] = ['/assets/images/login/Image 1- PSA.jpg', '/assets/images/login/Image 2- PSA.jpg', '/assets/images/login/Image 3.jpg',];
    currentIndex = 0;

  startSlideshow() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 4000);
  }
 
}
