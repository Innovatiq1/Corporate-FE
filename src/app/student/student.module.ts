import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgChartsModule } from 'ng2-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from '@danielmoncada/angular-datetime-picker';

import { StudentRoutingModule } from './student-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeworkComponent } from './homework/homework.component';
import { DeleteDialogComponent as leaveDeleteComonent } from './leave-request/dialogs/delete/delete.component';
import { FormDialogComponent } from './leave-request/dialogs/form-dialog/form-dialog.component';
// import { TimetableComponent } from './timetable/timetable.component';
import { HomeworkService } from './homework/homework.service';
import { LeaveRequestService as stdLeaveReqService } from './leave-request/leave-request.service';
import { SharedModule } from '@shared';
import { ComponentsModule } from '@shared/components/components.module';
import { CourseComponent } from './course/course.component';
import { ViewCourseComponent } from './view-course/view-course.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProgramComponent } from './program/program.component';
import { ViewProgramComponent } from './view-program/view-program.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { FullCalendarModule } from '@fullcalendar/angular';

// import { ProgramTimetableComponent } from './program-timetable/program-timetable.component';

import { SucessCourseComponent } from './sucess-course/sucess-course.component';
import { FailureCourseComponent } from './failure-course/failure-course.component';
import { ExamsSheduleComponent } from './exams-shedule/exams-shedule.component';
import { ProgramSheduleComponent } from './program-shedule/program-shedule.component';
import { SuccessProgramComponent } from './success-program/success-program.component';
import { FailureProgramComponent } from './failure-program/failure-program.component';
import { StudentVideoPlayerComponent } from './view-course/student-video-player/student-video-player.component';
import { TimeFormatPipe } from '../../app/core/pipes/time-format.pipe';import { QuestionComponent } from './question/question.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ChangeBgDirective } from 'app/change-bg.directive';
import { ExamScheduleService } from 'app/timetable/exam-schedule.service';
import { LogoCoutomzationComponent } from './settings/logo-coutomzation/logo-coutomzation.component';
import { SidemenuComponent } from './settings/sidemenu/sidemenu.component';
import { FormCustomizationComponent } from './settings/form-customization/form-customization.component';
import { AllUsersComponent } from './settings/all-users/all-users.component';
import { StudentsService } from 'app/admin/students/students.service';
import { AllStudentsComponent } from './settings/all-students/all-students.component';
import { AllTeachersComponent } from './settings/all-teachers/all-teachers.component';
import { TeachersService } from 'app/admin/teachers/teachers.service';
import { StaffService } from 'app/admin/staff/staff.service';
import { AllstaffComponent } from './settings/all-staff/all-staff.component';
import { AllDepartmentsComponent } from './settings/all-departments/all-departments.component';
import { DepartmentService } from 'app/admin/departments/department.service';
import { CertificateTemplateComponent } from './settings/certificate-template/certificate-template.component';
import { ListComponent } from './settings/list/list.component';
import { CreatAnnouncementComponent } from './settings/list/creat-announcement/creat-announcement.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AllQuestionsComponent } from './settings/all-questions/all-questions.component';
import { AssesmentQuestionsComponent } from './settings/assesment-questions/assesment-questions.component';
import { AddQuestionsComponent } from './settings/add-questions/add-questions.component';
import { CreateUserRoleComponent } from './settings/create-user-role/create-user-role.component';
import { UserTypeComponent } from './settings/user-type/user-type.component';
import { ViewDepartmentComponent } from './settings/all-departments/view-department/view-department.component';


@NgModule({
  declarations: [
    DashboardComponent,
    HomeworkComponent,
    leaveDeleteComonent,
    FormDialogComponent,
    // TimetableComponent,
    CourseComponent,
    ViewCourseComponent,
    ProgramComponent,
    ViewProgramComponent,
    FeedbackComponent,

    // ProgramTimetableComponent,

    SucessCourseComponent,
    FailureCourseComponent,
    ExamsSheduleComponent,
    ProgramSheduleComponent,
    SuccessProgramComponent,
    FailureProgramComponent,
    StudentVideoPlayerComponent,
    TimeFormatPipe,
    QuestionComponent,
    WelcomeComponent,
    ChangeBgDirective,
    LogoCoutomzationComponent,
    SidemenuComponent,
    FormCustomizationComponent,
    AllUsersComponent,
    AllStudentsComponent,
    AllTeachersComponent,
    AllstaffComponent,
    AllDepartmentsComponent,
    CertificateTemplateComponent,
    ListComponent,
    CreatAnnouncementComponent,
    AllQuestionsComponent,
    AssesmentQuestionsComponent,
    AddQuestionsComponent,
    UserTypeComponent,
    CreateUserRoleComponent,
    ViewDepartmentComponent


  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    NgChartsModule,
    FullCalendarModule,
   

    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    FormsModule,
    ReactiveFormsModule,
    NgScrollbarModule,
    NgApexchartsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ComponentsModule,
    SharedModule,
    ModalModule.forRoot(),
    CKEditorModule,
    AngularEditorModule,


  ],
  providers: [    
HomeworkService, stdLeaveReqService,StudentsService,ExamScheduleService,TeachersService,StaffService,DepartmentService]
})
export class StudentModule {}
