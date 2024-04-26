import { Component, ViewChild, TemplateRef} from '@angular/core';
import {
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from '@core/models/user.model';
import { AuthenService } from '@core/service/authen.service';
import { CertificateService } from '@core/service/certificate.service';
import { CourseService } from '@core/service/course.service';
import { EtmsService } from '@core/service/etms.service';

import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { LogoService } from './logo.service';
import { StudentsService } from 'app/admin/students/students.service';
import { UserService } from '@core/service/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  stdForm: UntypedFormGroup;
  stdForm1: UntypedFormGroup;
  profileForm: FormGroup;
  breadscrums = [
    {
      title: 'Settings',
      items: ['Student'],
      active: 'Settings',
    },
  ];
  editData: any;
  studentId: any;
  hide = true;
  isEmailFieldDisabled = true;
  files: any;
  fileName: any;
  avatar: any;
  uploadedImage: any;
  uploaded: any;
  cmUrl: any;
  pmUrl: any;
  hodUrl: any;
  superUrl: any;
  tcUrl: any;
  taUrl: any;
  adminUrl: any;
  roname: any;
  thumbnail: any;
  student: Student | undefined;
  isAdmin: boolean = false;
  accountUrl: any;
  securityUrl: any;
  bannersUrl: any;
  emailUrl: any;
  usersUrl: any;
  customUrl: any;
  integrateUrl: any;
  automateUrl: any;
  customsUrl: any;
  lmsUrl: any;
  configUrl: any;
  formsUrl: any;
  sidemenuUrl: any;
  allUsersUrl: any;
  customFormsUrl: any;
  courseFormsUrl: any;
  programFormsUrl: any;
  usersFormsUrl: any;
  financeFormsUrl: any;
  bannerFormsUrl: any;
  faUrl: any;
  showAccountSettings: boolean = false;
  showProfileSettings: boolean = false;
  show2FaSettings: boolean = false;
  showEmailConfig: boolean = false;
  showBanners: boolean = false;
  showIntegration: boolean = false;
  showAutomation: boolean = false;
  showUsers: boolean = false;
  showAllUsers: boolean = false;
  showCustomSettings: boolean = false;
  showCustoms:boolean = false;
  showLms: boolean = false;
  showConfig: boolean = false;
  showForms: boolean = false;
  showSidemenu: boolean = false;
  showCustomForms: boolean = false;
  showCourseForms: boolean = false;
  showProgramForms: boolean = false;
  showUsersForms: boolean = false;
  showFinanceForms: boolean = false;
  showBannerForms: boolean = false;
  isApprovers: boolean = false;
  selectedCreators: any = [];
  users: any;
  vendors: any;

  currentContent: number = 1;
  currencyCodes: string[] = ['USD', 'SGD', 'NZD', 'YEN', 'GBP', 'KWN', 'IDR', 'TWD', 'MYR', 'AUD'];
  timerValues: string[] = ['15', '30', '45', '60', '90', '120', '150'];
  retakeCodesAssessment: string[] = ['1', '2', '3', '4', '5'];
  selectedCurrency: string = "";
  selectedTimer: string = "";
  selectedAssessmentRetake: string = "";
  selectedExamAssessmentRetake: string = "";
  sidemenu: any;
  dept: any;
  ro: any;
  roName: any;
  director: any;
  directorName: any;
  trainingAdmin: any;
  trainingAdminName: any;
  roUsers: any;
  directorUsers: any;
  trainingAdminUsers: any;
  
  constructor(
    private studentService: StudentsService,
    private etmsService: EtmsService,
    private fb: UntypedFormBuilder,
    private certificateService: CertificateService,
    private router: Router,
    private authenservice: AuthenService,
    private courseService: CourseService,
    private logoService: LogoService,
    private userService: UserService,
    public dialog: MatDialog
  ) {
    let urlPath = this.router.url.split('/');
    this.cmUrl = urlPath.includes('coursemanager-settings');
    this.pmUrl = urlPath.includes('programmanager-settings');
    this.hodUrl = urlPath.includes('headofdepartment-settings');
    this.superUrl = urlPath.includes('supervisor-settings');
    this.tcUrl = urlPath.includes('trainingcoordinator-settings');
    this.taUrl = urlPath.includes('trainingadministrator-settings');
    this.adminUrl = urlPath.includes('admin-settings');
    this.accountUrl = urlPath.includes('account-settings');
    this.securityUrl = urlPath.includes('security-settings');
    this.bannersUrl = urlPath.includes('banners');
    this.usersUrl = urlPath.includes('users');
    this.integrateUrl = urlPath.includes('integration');
    this.emailUrl = urlPath.includes('email-configuration');
    this.customUrl = urlPath.includes('customization-settings');
    this.automateUrl = urlPath.includes('automation');
    this.customsUrl = urlPath.includes('customization');
    this.lmsUrl = urlPath.includes('LMS-TAE');
    this.configUrl = urlPath.includes('configuration');
    this.formsUrl = urlPath.includes('forms');
    this.sidemenuUrl = urlPath.includes('sidemenu');
    this.allUsersUrl = urlPath.includes('all-user');
    this.customFormsUrl = urlPath.includes('customization-forms');
    this.faUrl = urlPath.includes('2-factor-authentication');
    this.courseFormsUrl = urlPath.includes('course-forms');
    this.programFormsUrl = urlPath.includes('program-forms');
    this.usersFormsUrl = urlPath.includes('users-forms');
    this.financeFormsUrl = urlPath.includes('finance-forms');
    this.bannerFormsUrl = urlPath.includes('banner-forms');

    if (this.cmUrl === true) {
      this.breadscrums = [
        {
          title: 'Settings',
          items: ['Course Manager'],
          active: 'Settings',
        },
      ];
    }
    if (this.pmUrl === true) {
      this.breadscrums = [
        {
          title: 'Settings',
          items: ['Program Manager'],
          active: 'Settings',
        },
      ];
    }
    if (this.hodUrl === true) {
      this.breadscrums = [
        {
          title: 'Settings',
          items: ['Head Of Department'],
          active: 'Settings',
        },
      ];
    }
    if (this.superUrl === true) {
      this.breadscrums = [
        {
          title: 'Settings',
          items: ['Supervisor'],
          active: 'Settings',
        },
      ];
    }
    if (this.tcUrl === true) {
      this.breadscrums = [
        {
          title: 'Settings',
          items: ['Training Coordinator'],
          active: 'Settings',
        },
      ];
    }
    if (this.taUrl === true) {
      this.breadscrums = [
        {
          title: 'Settings',
          items: ['Training Administrator'],
          active: 'Settings',
        },
      ];
    }
    if (this.adminUrl === true) {
      this.breadscrums = [
        {
          title: 'Settings',
          items: ['Admin'],
          active: 'Settings',
        },
      ];
      this.isAdmin = true;
    }
    if (this.accountUrl === true) {
      this.breadscrums = [
        {
          title: 'Settings',
          items: ['Admin'],
          active: 'Settings',
        },
      ];
      this.isAdmin = true;
    }
    if (this.securityUrl === true) {
      this.breadscrums = [
        {
          title: 'Settings',
          items: ['Security'],
          active: 'Password',
        },
      ];
      this.isAdmin = true;
    }
    if (this.bannersUrl === true) {
      this.breadscrums = [
        {
          title: 'Settings',
          items: ['Customize'],
          active: 'Banners',
        },
      ];
      this.isAdmin = true;
    }
    if (this.emailUrl === true) {
      this.breadscrums = [
        {
          title: 'Settings',
          items: ['Integration'],
          active: 'SMTP',
        },
      ];
      this.isAdmin = true;
    }
    if (this.customUrl === true) {
      this.breadscrums = [
        {
          title: 'Settings',
          items: ['Admin'],
          active: 'Settings',
        },
      ];
      this.isAdmin = true;
    }
    if (this.customFormsUrl === true) {
      this.breadscrums = [
        {
          title: 'Settings',
          items: ['Customize'],
          active: 'Forms',
        },
      ];
      this.isAdmin = true;
    }
    if (this.usersUrl === true) {
      this.breadscrums = [
        {
          title: 'Settings',
          items: ['Admin'],
          active: 'Settings',
        },
      ];
      this.isAdmin = true;
    }
    if (this.integrateUrl === true) {
      this.breadscrums = [
        {
          title: 'Settings',
          items: ['Admin'],
          active: 'Settings',
        },
      ];
      this.isAdmin = true;
    }
    if (this.automateUrl === true) {
      this.breadscrums = [
        {
          title: 'Settings',
          items: ['Admin'],
          active: 'Settings',
        },
      ];
      this.isAdmin = true;
    }
    if (this.customsUrl === true) {
      this.breadscrums = [
        {
          title: 'Settings',
          items: ['Admin'],
          active: 'Settings',
        },
      ];
      this.isAdmin = true;
    }
    if (this.lmsUrl === true) {
      this.breadscrums = [
        {
          title: 'Settings',
          items: ['Admin'],
          active: 'Settings',
        },
      ];
      this.isAdmin = true;
    }
    if (this.configUrl === true) {
      this.breadscrums = [
        {
          title: 'Settings',
          items: ['Admin'],
          active: 'Settings',
        },
      ];
      this.isAdmin = true;
    }
    if (this.formsUrl === true) {
      this.breadscrums = [
        {
          title: 'Settings',
          items: ['Configuration'],
          active: 'Forms',
        },
      ];
      this.isAdmin = true;
    }
    if (this.sidemenuUrl === true) {
      this.breadscrums = [
        {
          title: 'Sidemenu',
          items: ['Customize'],
          active: 'Sidemenu',
        },
      ];
      this.isAdmin = true;
    }
    if (this.allUsersUrl === true) {
      this.breadscrums = [
        {
          title: 'Settings',
          items: ['Manage Users'],
          active: 'User Profile',
        },
      ];
      this.isAdmin = true;
    }
    if (this.faUrl === true) {
      this.breadscrums = [
        {
          title: 'Settings',
          items: ['Security'],
          active: '2FA',
        },
      ];
      this.isAdmin = true;
    }
    if (this.courseFormsUrl === true) {
      this.breadscrums = [
        {
          title: 'Settings',
          items: ['Customize'],
          active: 'Course Forms',
        },
      ];
      this.isAdmin = true;
    }
    if (this.programFormsUrl === true) {
      this.breadscrums = [
        {
          title: 'Settings',
          items: ['Customize'],
          active: 'Program Forms',
        },
      ];
      this.isAdmin = true;
    }
    if (this.usersFormsUrl === true) {
      this.breadscrums = [
        {
          title: 'Settings',
          items: ['Customize'],
          active: 'Users Forms',
        },
      ];
      this.isAdmin = true;
    }
    if (this.financeFormsUrl === true) {
      this.breadscrums = [
        {
          title: 'Settings',
          items: ['Customize'],
          active: 'Finance Forms',
        },
      ];
      this.isAdmin = true;
    }
    if (this.bannerFormsUrl === true) {
      this.breadscrums = [
        {
          title: 'Settings',
          items: ['Customize'],
          active: 'Banner Forms',
        },
      ];
      this.isAdmin = true;
    }
    this.patchValues(),
      //this.patchValues1()
      (this.stdForm = this.fb.group({
        name: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
        password: [''],
        currentpassword: [''],
      }));
    this.stdForm1 = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],

      last_name: [''],
      department: ['', Validators.required],
      approver1: ['', Validators.required],
      approver2: ['', Validators.required],
      approver3: ['', Validators.required],
      mobile: [''],
      city_name: ['', [Validators.required]],
      country_name: ['', [Validators.required]],

      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],

      address: [''],
      avatar: [''],
    });

    this.profileForm = this.fb.group({
      empName: ['', Validators.required],
      designation: ['', Validators.required],
      department: ['', Validators.required],
      roName: ['', Validators.required],
      director: ['', Validators.required],
      TA: ['', Validators.required],
    });

    //constructor
  }

  ngOnInit() {
    this.getUserProfile();
    this.getSidemenu();
    this.getAllUsers();
    let role = localStorage.getItem('user_type')
    if(role == 'admin'){
      this.isAdmin = true
    }else if (role == 'student'){
      this.isAdmin = false;
    }else if( !(role == 'admin' || role == 'Student' || role == 'Instructor')){
      this.isApprovers = true;
    }
    if(this.accountUrl){
      this.showAccountSettings = true;
    }
    if(this.securityUrl){
      this.showProfileSettings = true;
    }
    if(this.bannersUrl){
      this.showBanners = true;
    }
    if(this.usersUrl){
      this.showUsers = true;
    }
    if(this.emailUrl){
      this.showEmailConfig = true;
    }
    if(this.customUrl){
      this.showCustomSettings = true;
    }
    if(this.integrateUrl){
      this.showIntegration = true;
    }
    if(this.automateUrl){
      this.showAutomation = true;
    }
    if(this.customsUrl){
      this.showCustoms = true;
    }
    if(this.lmsUrl){
      this.showLms = true;
    }
    if(this.configUrl){
      this.showConfig = true;
    }
    if(this.formsUrl){
      this.showForms = true;
    }
    if(this.sidemenuUrl){
      this.showSidemenu = true;
    }
    if(this.allUsersUrl){
      this.showAllUsers = true;
    }
    if(this.customFormsUrl){
      this.showCustomForms = true;
    }
    if(this.faUrl){
      this.show2FaSettings = true;
    }
    if(this.courseFormsUrl){
      this.showCourseForms = true;
    }
    if(this.programFormsUrl){
      this.showProgramForms = true;
    }
    if(this.usersFormsUrl){
      this.showUsersForms = true;
    }
    if(this.financeFormsUrl){
      this.showFinanceForms = true;
    }
    if(this.bannerFormsUrl){
      this.showBannerForms = true;
    }
    this.getDepartments();
  }
  navigateToAccountSettings() {
   
    this.router.navigate(['/student/settings/account-settings']);
  }
  navigateToProfileSettings() {
    this.router.navigate(['/student/settings/security-settings']);
  }
  navigateToEmailSettings(){
    this.router.navigate(['/student/settings/email-configuration']);
   
  }
  navigateToBannerSettings(){
    this.router.navigate(['/student/settings/banners']);
    
  }
  navigateToUserSettings(){
    this.router.navigate(['/student/settings/users']);
  }
  navigateToAllUserSettings(){
    this.router.navigate(['/student/settings/all-user']);
  }
  navigateToIntegrateSettings(){
    this.router.navigate(['/student/settings/integration']);
  }
  navigateToCustomFormsSettings(){
    this.router.navigate(['/student/settings/customization-forms']);
  }
  navigateToAutomateSettings(){
    this.router.navigate(['/student/settings/automation']);
  }
  navigateToCustomsSettings(){
    this.router.navigate(['/student/settings/form-customization']);
  }
  navigateToLmsSettings(){
    this.router.navigate(['/student/LMS-TAE']);
  }
  navigateToConfigSettings(){
    this.router.navigate(['/student/configuration']);
  }
  navigateToFormSettings(){
    this.router.navigate(['/student/settings/forms']);
  }
  navigateToCustomSettings(){
    this.router.navigate(['/student/customization-settings']);
    
  }
  navigateToSidemenuSettings(){
    this.router.navigate(['/student/settings/sidemenu']);
    
  }
  navigateToCourseFormsSettings(){
    console.log("course")
    this.router.navigate(['/student/settings/course-forms']);
  }
  navigateToProgramFormsSettings(){
    this.router.navigate(['/student/settings/program-forms']);
  }
  navigateToUsersFormsSettings(){
    this.router.navigate(['/student/settings/users-forms']);
  }
  navigateToFinanceFormsSettings(){
    this.router.navigate(['/student/settings/finance-forms']);
  }
  navigateToBannerFormsSettings(){
    this.router.navigate(['/student/settings/banner-forms']);
  }
 

  showMainContent(contentId: number) {
    this.currentContent = contentId;
  }
 getSidemenu() {
    /* get all logos **/
    this.logoService.getSidemenu().subscribe((response) => {
      this.sidemenu = response?.data?.docs;
    });
  }
  getDepartments() {
    this.studentService.getAllDepartments().subscribe((response: any) => {
      this.dept = response.data.docs;
    });
  }
  onSelectionChange(event: any, field: any) {
   
    if (field == 'approver1') {
      const selectedApprover1Id = event.value;
      const selectedApprover1 = this.roUsers.find((user: { id: any; }) => user.id === selectedApprover1Id);
      if (selectedApprover1) {
        this.ro = selectedApprover1Id;
        this.roName = selectedApprover1.name
      }
    }
    if (field == 'approver2') {
      const selectedApprover2Id = event.value;
      const selectedApprover2 = this.directorUsers.find((user: { id: any; }) => user.id === selectedApprover2Id);
      if (selectedApprover2) {
        this.director = selectedApprover2Id;
        this.directorName = selectedApprover2.name
      }
    }
    if (field == 'approver3') {
      const selectedApprover3Id = event.value;
      const selectedApprover3 = this.trainingAdminUsers.find((user: { id: any; }) => user.id === selectedApprover3Id);
      if (selectedApprover3) {
        this.trainingAdmin = selectedApprover3Id;
        this.trainingAdminName = selectedApprover3.name
      }
    }
  
  }
  getAllUsers() {
    this.userService.getAllUsersByRole('RO').subscribe((response: any) => {
      this.roUsers = response?.results;
    });
    this.userService.getAllUsersByRole('Director').subscribe((response: any) => {
      this.directorUsers = response?.results;
    });
    this.userService.getAllUsersByRole('Training Administrator').subscribe((response: any) => {
      this.trainingAdminUsers = response?.results;
    });

  }
  patchValues() {
    this.studentId = localStorage.getItem('id');
    // let studentId = localStorage.getItem('id')?localStorage.getItem('id'):null
    this.studentService.getStudentById(this.studentId).subscribe((res: any) => {
      this.editData = res;
      this.avatar = this.editData.avatar;
      this.uploaded = this.avatar?.split('/');
      let image  = this.uploaded?.pop();
      this.uploaded= image?.split('\\');
      this.uploadedImage = this.uploaded?.pop();
      const currencyConfig = this.editData.configuration.find((config: any) => config.field === 'currency');
      const selectedCurrency = currencyConfig ? currencyConfig.value : null;
      const timerConfig = this.editData.configuration.find((config: any) => config.field === 'timer');
      const selectedTimer = timerConfig ? timerConfig.value : null;
      const assessmentConfig = this.editData.configuration.find((config: any) => config.field === 'assessment');
      const selectedAssessmentRetake = assessmentConfig ? assessmentConfig.value : null;
      const examassessmentConfig = this.editData.configuration.find((config: any) => config.field === 'examAssessment');
      const selectedExamAssessmentRetake = examassessmentConfig ? examassessmentConfig.value : null;

      this.stdForm.patchValue({
        name: this.editData.name,
        last_name: this.editData.last_name,
        currentpassword: this.editData.password,
      });
      this.stdForm1.patchValue({
        name: this.editData.name,
        last: this.editData.last_name,
        rollNo: this.editData.rollNo,
        gender: this.editData.gender,
        mobile: this.editData.mobile,
        department:this.editData.department,
        approver1: this.editData.ro,
        approver2: this.editData.director,
        approver3: this.editData.trainingAdmin,
        email: this.editData.email,
        country_name: this.editData.country_name,
        city_name: this.editData.city_name,

        address: this.editData.address,
        uploadedImage: this.editData.avatar,
      });
      this.selectedCurrency = selectedCurrency;
      this.selectedTimer = selectedTimer;
      this.selectedAssessmentRetake = selectedAssessmentRetake
      this.selectedExamAssessmentRetake = selectedExamAssessmentRetake

    });
  }
  onFileUpload(event: any) {
    // this.fileName = event.target.files[0].name;
    // this.files = event.target.files[0];
    const file = event.target.files[0];
  
    this.thumbnail = file
    const formData = new FormData();
    formData.append('files', this.thumbnail);
   this.courseService.uploadCourseThumbnail(formData).subscribe((data: any) =>{
    this.avatar = data.data.thumbnail;
    this.uploaded=this.avatar.split('/')
    let image  = this.uploaded.pop();
    this.uploaded= image.split('\\');
    this.uploadedImage = this.uploaded.pop();
   
      // this.onSubmit1();
 
  });
    // this.uploadedImage = event.target.files[0].name;

    // // const file = event.target.files[0];
    // const formData = new FormData();
    // // formData.append('files', file);
    // this.certificateService
    //   .uploadCourseThumbnail(formData)
    //   .subscribe((response: any) => {
    //     this.avatar = response.avatar;
    //     this.uploaded = this.avatar.split('/');
    //     this.uploadedImage = this.uploaded.pop();
    //   });
  }


  onSubmit() {
    if (this.stdForm.valid) {
      // this.instructor.uploadVideo(this.files).subscribe(
      //   (response: any) => {
      //     const inputUrl = response.inputUrl;

      const userData: Student = this.stdForm.value;
      //this.commonService.setVideoId(videoId)

      //userData.avatar = inputUrl;
      //userData.filename= this.fileName
      userData.type = 'Student';
      userData.role = 'Student';

      //this.currentVideoIds = [...this.currentVideoIds, ...videoId]
      // this.currentVideoIds.push(videoId);
      this.updateInstructor(userData);

      Swal.close();
      // },
    }
  }
  // onSubmit1() {
  //   if (!this.stdForm1.invalid) {
  //     this.studentService.uploadVideo(this.files).subscribe(
  //       (response: any) => {
  //         const inputUrl = response.inputUrl;
  //         this.authenservice.updateUserProfile(response.inputUrl);

  //         const userData: Student = this.stdForm1.value;
  //         //this.commonService.setVideoId(videoId)

  //         userData.avatar = inputUrl;
  //         userData.filename = response.filename;
  //         userData.type = 'Student';
  //         userData.role = 'Student';

  //         //this.currentVideoIds = [...this.currentVideoIds, ...videoId]
  //         // this.currentVideoIds.push(videoId);
  //         this.updateInstructor(userData);

  //         Swal.close();
  //       },
  //       (error: any) => {
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Upload Failed',
  //           text: 'An error occurred while uploading the video',
  //         });
  //         Swal.close();
  //       }
  //     );
  //   }
  // }
  onSubmit1() {
    if (!this.stdForm1.invalid) {
      // No need to call uploadVideo() here since it's not needed
        const userData: any = this.stdForm1.value;
        userData.avatar = this.avatar; // Assuming this.avatar contains the URL of the uploaded thumbnail
        userData.type = this.editData.type;
        userData.role = this.editData.role;
        userData.ro = this.ro;
        userData.roName = this.roName;
        userData.director = this.director;
        userData.directorName = this.directorName;
        userData.trainingAdmin = this.trainingAdmin;
        userData.trainingAdminName = this.trainingAdminName
        Swal.fire({
          title: 'Are you sure?',
          text: 'Do you want to update!',
          icon: 'warning',
          confirmButtonText: 'Yes',
          showCancelButton: true,
          cancelButtonColor: '#d33',
        }).then((result) => {
          if (result.isConfirmed){
            
        this.updateInstructor(userData);
        Swal.close();
      }
    });
    }
   
}

  private updateInstructor(userData: Student): void {
  //   Swal.fire({
  //   title: 'Are you sure?',
  //   text: 'Do you want to update!',
  //   icon: 'warning',
  //   confirmButtonText: 'Yes',
  //   showCancelButton: true,
  //   cancelButtonColor: '#d33',
  // }).then((result) => {
  //   if (result.isConfirmed){
      this.studentService.updateStudent(this.studentId, userData).subscribe(
        () => {
          Swal.fire({
            title: 'Successful',
            text: 'User data update successfully',
            icon: 'success',
          });
          //this.fileDropEl.nativeElement.value = "";
          //this.stdForm.reset();
          //this.toggleList()
          //this.router.navigateByUrl('/admin/teachers/all-teachers');
        },
        (error: { message: any; error: any }) => {
          Swal.fire(
            'Failed to update user data',
            error.message || error.error,
            'error'
          );
        }
      );
  //   }
  // });
   
  }

  /** Get User for profile */

  getUserProfile() {
    const userId = localStorage.getItem('id');
    this.etmsService.getUserId(userId).subscribe((response: any) => {
        this.roname = response.roName
        this.profileForm.patchValue({
        empName: response.name,
        designation: response.designation,
        department: response.department,
        roName: response.roName,
        director: response.directorName,
        TA: response.trainingAdminName,
      })
      console.log(this.profileForm.value);
    });
  }

  updateCurrency(dialogRef: any, value: any) {
    if (value === 'currency') {
      const selectedCurrency = this.selectedCurrency;
      this.courseService.createCurrency({ value: selectedCurrency }).subscribe(
        response => {
          Swal.fire({
            title: 'Successful',
            text: 'Currency Configuration Success',
            icon: 'success'
          });
          dialogRef.close(selectedCurrency);
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error,
          });
        }
      );
    } else if (value === "timer") {
      const selectedTimer = this.selectedTimer;
      this.courseService.createTimer({ value: selectedTimer }).subscribe(
        response => {
          Swal.fire({
            title: 'Successful',
            text: 'Timer Configuration Success',
            icon: 'success'
          });
          dialogRef.close(selectedTimer);
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error,
          });
        }
      );
    } else if (value === "assessment") {
      const selectedAssessmentRetake = this.selectedAssessmentRetake;
      this.courseService.createAssessment({ value: selectedAssessmentRetake }).subscribe(
        response => {
          Swal.fire({
            title: 'Successful',
            text: 'Assessment Configuration Success',
            icon: 'success'
          });
          dialogRef.close(selectedAssessmentRetake);
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error,
          });
        }
      );
    } else if (value === "examAssessment") {
      const selectedExamAssessmentRetake = this.selectedExamAssessmentRetake;
      this.courseService.createExamAssessment({ value: selectedExamAssessmentRetake }).subscribe(
        response => {
          Swal.fire({
            title: 'Successful',
            text: 'Assessment Configuration Success',
            icon: 'success'
          });
          dialogRef.close(selectedExamAssessmentRetake);
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error,
          });
        }
      );
    }
   
  }


  openDialog(templateRef: any, value:any): void {
    if (value === 'currency') {
      const dialogRef = this.dialog.open(templateRef, {
        width: '500px',
        data: { selectedCurrency: this.selectedCurrency }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.selectedCurrency = result;
        }
      });
    } else if(value === 'timer') {
      const dialogRef = this.dialog.open(templateRef, {
        width: '500px',
        data: { selectedTimer: this.selectedTimer }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.selectedTimer = result;
        }
      });
    } else if(value === 'assessment') {
      const dialogRef = this.dialog.open(templateRef, {
        width: '500px',
        data: { selectedAssessmentRetake: this.selectedAssessmentRetake }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.selectedAssessmentRetake = result;
        }
      });
    } else if(value === 'examAssessment') {
      const dialogRef = this.dialog.open(templateRef, {
        width: '500px',
        data: { selectedExamAssessmentRetake: this.selectedExamAssessmentRetake }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.selectedExamAssessmentRetake = result;
        }
      });
    }

  }
  

  onSelect(currencyCode: string, dialogRef: any) {
    dialogRef.close(currencyCode);
  }
}
