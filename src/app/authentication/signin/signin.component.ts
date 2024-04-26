import { Component, OnInit, Input,OnChanges } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthService, Role } from '@core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { AuthenService } from '@core/service/authen.service';
import { LanguageService } from '@core/service/language.service';
import { UtilsService } from '@core/service/utils.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  // strength: string = '';
  authForm!: UntypedFormGroup;
  langStoreValue?: string;
  submitted = false;
  loading = false;
  isLoading= false;
  error = '';
  hide = true;
  isSubmitted = false;
  email:any;
  password:any;
  tmsUrl: boolean;
  lmsUrl: boolean;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private authenticationService:AuthenService,
    public utils: UtilsService,
    private translate: LanguageService
  ) {
    super();
    let urlPath = this.router.url.split('/')
    this.tmsUrl = urlPath.includes('TMS');
    this.lmsUrl = urlPath.includes('LMS');


    this.authForm = this.formBuilder.group({
      email: ['',[Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)] ],
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
  loginUser(){
  let formData =this.authForm.getRawValue()
  this.isLoading = true;
  this.authenticationService.loginUser(formData.email.trim(), formData.password.trim())
        .subscribe(user => {
          setTimeout(() => {
            const role = this.authenticationService.currentUserValue.user.role;
            if ((role === Role.All && this.tmsUrl) || (role === Role.Admin && this.tmsUrl || role=="RO"  || role == "Director" || role == "Employee")) {
              this.router.navigate(['/dashboard/student-analytics']);
            } else if ((role === Role.Instructor && this.tmsUrl) || (role === 'Trainer' && this.tmsUrl) || (role ==='instructor' && this.tmsUrl)) {
              this.router.navigate(['/dashboard/instructor-dashboard']);
            } else if ((role === Role.Student && this.lmsUrl)|| (role === 'student' && this.lmsUrl)) {
              this.router.navigate(['/dashboard/student-dashboard']);
            } 
              else if (role === Role.TrainingAdministrator || role === 'Training administrator' || role === 'training administrator') {
              this.router.navigate(['/dashboard/trainingadministrator-dashboard']);
            } else if (role === Role.Supervisor || role === 'Supervisor' || role === 'supervisor') {
              this.router.navigate(['/dashboard/supervisor-dashboard']);
            } else if (role === Role.HOD || role === 'hod' || role === 'HOD' || role === 'head of department') {
              this.router.navigate(['/dashboard/hod-dashboard']);
            } else if (role === Role.TrainingCoordinator || role === 'Training Coordinator' || role === 'training coordinator') {
              this.router.navigate(['/dashboard/trainingcoordinator-dashboard']);
            } else if (role === Role.CourseManager || role === 'coursemanager'|| role === 'Course Manager') {
              this.router.navigate(['/dashboard/coursemanager-dashboard']);
            }  else if (role === Role.ProgramManager || role === 'programcoordinator'|| role === 'Program manager') {
              this.router.navigate(['/dashboard/programmanager-dashboard']);
            } else if (role === Role.Approver || role === 'approver'|| role === 'approver') {
              this.router.navigate(['/admin/courses/all-courses']);
            } else if (role === Role.TrainingCoordinatorAdministrator || role === 'Training Coordinator Administrator'|| role === 'Training Coordinator Administrator') {
              this.router.navigate(['/admin/users/all-students']);
            } 
             else {
              this.router.navigate(['/authentication/page404']);
            }

            this.loading = false;
          }, 100);            this.authenticationService.saveUserInfo(user);
        }, (error) => {
          this.isLoading = false;
          this.email = error;
            this.isSubmitted=true;
          setTimeout(()=>{
            this.email=''
          },2500)


          }

          )
  }
  setLanguage(event: any) {  
    
    // this.countryName = text;
    // this.flagvalue = flag;
    this.langStoreValue = event.target.value;
    this.translate.setLanguage(event.target.value);
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.error = '';
    if (this.authForm.invalid) {
      this.error = 'Username and Password not valid !';
      return;
    } else {
      this.subs.sink = this.authService
        .login(this.f['username'].value, this.f['password'].value)
        .subscribe({
          next: (res) => {
            if (res) {
              setTimeout(() => {
                const role = this.authService.currentUserValue.role;
                if (role === Role.All || role === Role.Admin) {
                  this.router.navigate(['/admin/dashboard/main']);
                } else if (role === Role.Instructor) {
                  this.router.navigate(['/instructor/dashboard']);
                } else if (role === Role.Student) {
                  this.router.navigate(['/student/dashboard']);
                } else {
                  this.router.navigate(['/authentication/signin']);
                }
                this.loading = false;
              }, 1000);
            } else {
              this.error = 'Invalid Login';
            }
          },
          error: (error) => {
            this.error = error;
            this.submitted = false;
            this.loading = false;
          },
        });
    }
  }
  images: string[] = ['/assets/images/login/Learning.jpeg', '/assets/images/login/learning2.jpg', '/assets/images/login/learning4.jpg'];
    currentIndex = 0;

  startSlideshow() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 4000);
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
