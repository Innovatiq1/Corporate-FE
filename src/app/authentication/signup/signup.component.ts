import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { LanguageService } from '@core/service/language.service';
import { RegistrationService } from '@core/service/registration.service';
import { Users } from '@core/models/user.model';
import Swal from 'sweetalert2';
import {
  SearchCountryField,
  //TooltipLabel,
  CountryISO
} from "ngx-intl-tel-input";
import { ConfirmedValidator } from '@shared/password.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  phoneNumber: any;
  SearchCountryField = SearchCountryField;
  //TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.Qatar];
  
  userData = { username: '', email: '', password: '', cpassword: '', type:'',role:''};
  message = '';
  loading = false;
  isLoading = false;
  error = '';
  isSubmitted = false;
  email: any;
  authForm!: UntypedFormGroup;
  langStoreValue?: string;
  submitted = false;
  returnUrl!: string;
  hide = true;
  chide = true;
  user: any;
  passwordMatchValidator: any;
  tmsUrl: boolean;
  lmsUrl: boolean;
  
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private translate: LanguageService,
    private registration: RegistrationService
  ) { 
    let urlPath = this.router.url.split('/')
    this.tmsUrl = urlPath.includes('TMS');
    this.lmsUrl = urlPath.includes('LMS');


    this.authForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['',[Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)] ],
      password: ['', Validators.required],
      cpassword: [''],
      gender: ['', Validators.required]
      
    },{
      validator: ConfirmedValidator('password', 'cpassword')
    
    });
  }


  listLang = [
    { text: 'English', flag: 'assets/images/flags/us.svg', lang: 'en' },
    { text: 'Chinese', flag: 'assets/images/flags/spain.svg', lang: 'ch' },
    { text: 'Tamil', flag: 'assets/images/flags/germany.svg', lang: 'ts' },
  ];
  ngOnInit() {
    this.startSlideshow()
    this.authForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      gender:['', Validators.required],
      //phone: ['', [Validators.required]],
      //phone:[Validators.required, Validators.minLength(10)],
      password: ['', Validators.required],
      cpassword: ['']
    },{ 
      validator: ConfirmedValidator('password', 'cpassword')
      // validators: this.passwordMatchValidator,
      
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  
  get f() {
    return this.authForm.controls;
  }
  onSubmit() {
    
    if (this.authForm.valid) {
      const userData: Users = this.authForm.value;
            userData.type = 'Student';
      userData.role = 'Student';
      this.registration.registerUser(userData).subscribe(
        (response: any) => {
          Swal.fire({
            title: 'Registration Successful',
            text: "We have sent an email to you, check your email,to  know the status of your acount",
            icon: 'success',
          });
          this.router.navigate(['/authentication/LMS/signin']);
        },
        (error: any) => {
          this.submitted = true;
          this.email=error
        }
      );
    }
    this.submitted = true;
    
  }
  

  setLanguage(event: any) {
    // this.countryName = text;
    // this.flagvalue = flag;
    this.langStoreValue = event.target.value;
    this.translate.setLanguage(event.target.value);
  }
  images: string[] = ['/assets/images/login/Learning.jpeg', '/assets/images/login/learning2.jpg', '/assets/images/login/learning4.jpg'];
  currentIndex = 0;
  startSlideshow() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 4000);
  }
}
