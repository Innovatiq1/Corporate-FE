declare var google:any
import { Component, OnInit, Input, OnChanges, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthService, Role } from '@core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { AuthenService } from '@core/service/authen.service';
import { LanguageService } from '@core/service/language.service';
import { UtilsService } from '@core/service/utils.service';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '@core/service/admin.service';
import Swal from 'sweetalert2';
import { UserService } from '@core/service/user.service';
import { RegistrationService } from '@core/service/registration.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  @ViewChild('profileDialog') profileDialog!: TemplateRef<any>;

  // strength: string = '';
  authForm!: UntypedFormGroup;
  profileForm!:FormGroup;
  langStoreValue?: string;
  submitted = false;
  loading = false;
  isLoading = false;
  error = '';
  hide = true;
  isSubmitted = false;
  email: any;
  password: any;
  tmsUrl: boolean;
  lmsUrl: boolean;
  accountDetails: any;
  userTypes: any;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private authenticationService: AuthenService,
    public utils: UtilsService,
    private translate: LanguageService,
    private dialog:MatDialog,
    private adminService:AdminService,
    private userService:UserService,
    private registration: RegistrationService


  ) {
    super();
    let urlPath = this.router.url.split('/');
    this.tmsUrl = urlPath.includes('TMS');
    this.lmsUrl = urlPath.includes('LMS');

    this.authForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
          ),
        ],
      ],
      password: ['', Validators.required],
    });
  }
  listLang = [
    { text: 'English', flag: 'assets/images/flags/us.svg', lang: 'en' },
    { text: 'Chinese', flag: 'assets/images/flags/spain.svg', lang: 'ch' },
    { text: 'Tamil', flag: 'assets/images/flags/germany.svg', lang: 'ts' },
  ];

  ngOnInit() {
    this.startSlideshow();
    google.accounts.id.initialize({
      client_id:'254303785853-4av7vt4kjc2fus3rgf01e3ltnp2icad0.apps.googleusercontent.com',
      callback: (res:any) => {
        this.handleGmailLogin(res)
      }
    })
    google.accounts.id.renderButton(document.getElementById("google-btn"),{
      theme:'filled_blue',
      size:'large',
      shape:'rectangle',
      width:450
    })
  }

  handleGmailLogin(data:any){
    if(data){
      const payload = this.decodeGmailToken(data.credential)
      this.accountDetails = payload
      let body = {
        name:payload.given_name,
        avatar:payload.picture,
        last_name:payload.family_name,
        email:payload.email,
        authToken: data.credential, // Include the raw token as authToken
        id: payload.sub,
        gmail:true
      }
      this.authenticationService.socialLogin({ email:payload.email, social_type:'GOOGLE', social_id:payload.sub }).subscribe(
      (user: any) => { 

        if(user){
          setTimeout(() => {
            const role = this.authenticationService.currentUserValue.user.role;
            if (role === 'CEO')  {
              this.router.navigate(['/dashboard/ceo-dashboard']);
            } else if (role === 'CTO') {
              this.router.navigate(['/dashboard/cto-dashboard']);
            } else if (role === 'CFO') {
              this.router.navigate(['/dashboard/cfo-dashboard']);
            }
              else if (role === 'COO') {
              this.router.navigate(['/dashboard/coo-dashboard']);
            } else if (role === 'IT Manager') {
              this.router.navigate(['/dashboard/it-manager-dashboard']);
            } else if (role === 'HR Manager') {
              this.router.navigate(['/dashboard/hr-manager-dashboard']);
            } else if (role === 'Admin Manager') {
              this.router.navigate(['/dashboard/admin-dashboard']);
            } else if (role === 'Finance') {
              this.router.navigate(['/dashboard/finance-dashboard']);
            }  else if (role === 'Staff') {
              this.router.navigate(['/dashboard/staff-dashboard']);
            } 
             else {
              this.router.navigate(['/dashboard/dashboard']);
            }
            this.loading = false;
          }, 100);
          this.authenticationService.saveUserInfo(user);
  
        }
      },
      (err: any) => { 
        if(err == "user not found!"){
          this.getUserTypeList();
          this.profileForm = this.formBuilder.group({
            role: ['', Validators.required],
            email: [this.accountDetails.email,[Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)] ],
            name: [this.accountDetails.name, Validators.required],
            password: [''],
          })
      
          this.openDialog(this.profileDialog)
          
        } else {
          console.log('err',err)
        }
      }
      )

    }

  }
  openDialog(templateRef: any): void {
      const dialogRef = this.dialog.open(templateRef, {
        width: '1000px',
        data: {        account:this.accountDetails},
      });    
  }
  getUserTypeList() {
    this.adminService.getUserTypeList({ allRows: true }).subscribe(
      (response: any) => {
        this.userTypes = response;
      },
      (error) => {}
    );
  }

  create(dialogRef:any) {
  
    if (this.profileForm.valid) {
        Swal.fire({
          title: 'Are you sure?',
          text: 'Do you want to create user!',
          icon: 'warning',
          confirmButtonText: 'Yes',
          showCancelButton: true,
          cancelButtonColor: '#d33',
        }).then((result) => {
          if (result.isConfirmed) {
            this.profileForm.value.Active = true;
            this.profileForm.value.type = this.profileForm.value.role;
            this.profileForm.value.isLogin = true;   
            this.profileForm.value.avatar =   this.accountDetails.picture
            this.registration.registerUser(this.profileForm.value).subscribe(
              () => {
                Swal.fire({
                  title: 'Successful',
                  text: 'User created successfully',
                  icon: 'success',
                });
                this.profileForm.reset();
                    dialogRef.close();

              },
              (error) => {
                Swal.fire(
                  'Failed to create user',
                  error.message || error.error,
                  'error'
                );
              }
            );
                   }
        });
        
    } else {
      this.isSubmitted = true;
    }
  }

  private linkedInCredentials = {
    response_type: "code",
    clientId: "86ggwpa949d3u5", //77u10423gsm7cx
    //redirectUrl: `${DEFAULT_CONFIG.frontEndUrl}linkedInLogin`,
    redirectUrl: "http%3A%2F%2F54.254.159.3%2FlinkedInLogin",
    state: 23101992,
    scope: "r_liteprofile%20r_emailaddress%20w_member_social",
  };


  loginWithlinkedin()
  { 
    window.location.href = `https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=${
      this.linkedInCredentials.clientId
    }&redirect_uri=${this.linkedInCredentials.redirectUrl}&scope=${this.linkedInCredentials.scope}`;
  } 
  

  private decodeGmailToken(token:string){
    return JSON.parse(atob(token.split(".")[1]));
  }
  get f() {
    return this.authForm.controls;
  }



  adminSet() {
    this.authForm.get('email')?.setValue('admin1@tms.com');
    this.authForm.get('password')?.setValue('12345678');
  }
  studentSet() {
    this.authForm.get('email')?.setValue('teo.su@yahooo.com');
    this.authForm.get('password')?.setValue('12345678');
  }
  teacherSet() {
    this.authForm.get('email')?.setValue('timothy.chow@yahooo.com');
    this.authForm.get('password')?.setValue('12345678');
  }
  loginUser() {
    let formData = this.authForm.getRawValue();
    this.isLoading = true;
    this.authenticationService
      .loginUser(formData.email.trim(), formData.password.trim())
      .subscribe(
        (user) => {
          setTimeout(() => {
            const role = this.authenticationService.currentUserValue.user.role;
            if (role === 'CEO')  {
              this.router.navigate(['/dashboard/ceo-dashboard']);
            } else if (role === 'CTO') {
              this.router.navigate(['/dashboard/cto-dashboard']);
            } else if (role === 'CFO') {
              this.router.navigate(['/dashboard/cfo-dashboard']);
            }
              else if (role === 'COO') {
              this.router.navigate(['/dashboard/coo-dashboard']);
            } else if (role === 'IT Manager') {
              this.router.navigate(['/dashboard/it-manager-dashboard']);
            } else if (role === 'HR Manager') {
              this.router.navigate(['/dashboard/hr-manager-dashboard']);
            } else if (role === 'Admin Manager') {
              this.router.navigate(['/dashboard/admin-dashboard']);
            } else if (role === 'Finance') {
              this.router.navigate(['/dashboard/finance-dashboard']);
            }  else if (role === 'Staff') {
              this.router.navigate(['/dashboard/staff-dashboard']);
            } 
             else {
              this.router.navigate(['/dashboard/dashboard']);
            }

            this.loading = false;
          }, 100);
          this.authenticationService.saveUserInfo(user);
        },
        (error) => {
          this.isLoading = false;
          this.email = error;
          this.isSubmitted = true;
          setTimeout(() => {
            this.email = '';
          }, 2500);
        }
      );
  }
  setLanguage(event: any) {
    // this.countryName = text;
    // this.flagvalue = flag;
    this.langStoreValue = event.target.value;
    this.translate.setLanguage(event.target.value);
  }

  images: string[] = [
    '/assets/images/login/Learning.jpeg',
    '/assets/images/login/learning2.jpg',
    '/assets/images/login/learning4.jpg',
  ];
  currentIndex = 0;

  startSlideshow() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 4000);
  }
  goBack() {
    this.router.navigate(['/authentication/signin-role']);
  }
  // ngOnChanges() {
  //   this.updateStrengthIndicator();
  // }

  // private calculatePasswordStrength(password: string): string {
  //   let minLength = 8;
  //   let lengthCount = 1;
  //   let upperCaseCount = 1;
  //   let lowerCaseCount = 1;
  //   let numbersCount = 1;
  //   let specialCharsCount = 1;

  //   const upperCaseRegex = /[A-Z]/;
  //   const lowerCaseRegex = /[a-z]/;
  //   const numbersRegex = /[0-9]/;
  //   const specialCharsRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;

  //   for (const char of password) {
  //     lengthCount++;
  //     if (upperCaseRegex.test(char)) {
  //       upperCaseCount++;
  //     } else if (lowerCaseRegex.test(char)) {
  //       lowerCaseCount++;
  //     } else if (numbersRegex.test(char)) {
  //       numbersCount++;
  //     } else if (specialCharsRegex.test(char)) {
  //       specialCharsCount++;
  //     }
  //   }

  //   if (lengthCount < minLength) {
  //     return 'weak';
  //   }

  //   const typesCount = [upperCaseCount, lowerCaseCount, numbersCount, specialCharsCount].filter(count => count > 0).length;

  //   if (typesCount < 3) {
  //     return 'fair';
  //   }

  //   return 'strong';
  // }

  // private updateStrengthIndicator() {
  //   this.strength = this.calculatePasswordStrength(this.password);
  // }
}
