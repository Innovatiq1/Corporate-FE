import { Page404Component } from './../authentication/page404/page404.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeworkComponent } from './homework/homework.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { SettingsComponent } from './settings/settings.component';
import { CourseComponent } from './course/course.component';
import { ViewCourseComponent } from './view-course/view-course.component';
import { ProgramComponent } from './program/program.component';
import { ViewProgramComponent } from './view-program/view-program.component';
import { FeedbackComponent } from './feedback/feedback.component';


import { SucessCourseComponent } from './sucess-course/sucess-course.component';
import { FailureCourseComponent } from './failure-course/failure-course.component';
import { ExamsSheduleComponent } from './exams-shedule/exams-shedule.component';
import { ProgramSheduleComponent } from './program-shedule/program-shedule.component';
import { SuccessProgramComponent } from './success-program/success-program.component';
import { FailureProgramComponent } from './failure-program/failure-program.component';
import { QuestionComponent } from './question/question.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LogoCoutomzationComponent } from './settings/logo-coutomzation/logo-coutomzation.component';
import { SidemenuComponent } from './settings/sidemenu/sidemenu.component';
import { FormCustomizationComponent } from './settings/form-customization/form-customization.component'
import { AllUsersComponent } from './settings/all-users/all-users.component';
import { AllStudentsComponent } from './settings/all-students/all-students.component';
import { AllTeachersComponent } from './settings/all-teachers/all-teachers.component';
import { AllstaffComponent } from './settings/all-staff/all-staff.component';
import { AllDepartmentsComponent } from './settings/all-departments/all-departments.component';


const routes: Routes = [
  {
    path: 'enrollment/courses',
    component: CourseComponent,
  },
  {
    path: 'view-course/:id',
    component: ViewCourseComponent,
  },
  {
    path: 'sucess-course/:id',
    component: SucessCourseComponent,
  },
  {
    path: 'fail-course/:id',
    component: FailureCourseComponent,
  },
  {
    path: 'sucess-program/:id',
    component: SuccessProgramComponent,
  },
  {
    path: 'fail-program/:id',
    component: FailureProgramComponent,
  },

  {
    path: 'enrollment/programs',
    component: ProgramComponent,
  },
  {
    path: 'view-program/:id',
    component: ViewProgramComponent,
  },

  {
    path: 'schedule/homework',
    component: HomeworkComponent,
  },
  // {
  //   path: 'timetable/course-timetable',
  //   component: TimetableComponent,
  // },
  // {
  //   path: 'timetable/program-timetable',
  //   component: ProgramTimetableComponent,
  // },

  {
    path: 'feedback/courses/:id/:id/:id',
    component: FeedbackComponent,
  },
  {
    path: 'feedback/programs',
    component: FeedbackComponent,
  },
  {
    path: 'exams/courses',
    component: ExamsSheduleComponent
  },
  {
    path: 'exams/programs',
    component: ProgramSheduleComponent
  },
  {
    path: 'questions/:id/:id/:id',
    component: QuestionComponent,
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
  },
  {
    path: 'settings/account-settings',
    component: SettingsComponent,
  },
  {
    path: 'settings/security-settings',
    component: SettingsComponent,
  },
  {
    path: 'settings/banners',
    component: SettingsComponent,
  },
  {
    path: 'settings/users',
    component: SettingsComponent,
  },
  {
    path: 'settings/integration',
    component: SettingsComponent,
  },
  {
    path: 'settings/automation',
    component: SettingsComponent,
  },
  {
    path: 'settings/customization',
    component: SettingsComponent,
  },
  {
    path: 'settings/LMS-TAE',
    component: SettingsComponent,
  },
  {
    path: 'settings/configuration',
    component: SettingsComponent,
  },
  {
    path: 'settings/forms',
    component: SettingsComponent,
  },
  {
    path: 'settings/email-configuration',
    component: SettingsComponent,
  },
  {
    path: 'settings/customization-settings',
    component: SettingsComponent,
  },
  {
    path: 'logo-coutomization',
    component: LogoCoutomzationComponent,
  },
  {
    path: 'settings/sidemenu',
    component: SettingsComponent,
  },
  {
    path: 'settings/all-users',
    component: AllUsersComponent,
  },
  {
    path: 'settings/all-students',
    component: AllStudentsComponent,
  },
  {
    path: 'settings/all-instructors',
    component: AllTeachersComponent,
  },
  {
    path: 'settings/all-staff',
    component: AllstaffComponent
  },
  {
    path: 'settings/all-departments',
    component: AllDepartmentsComponent
  },






  {
    path: 'side-menu/:id',
    component: SidemenuComponent,
  },
  {
    path: 'form-customization',
    component: FormCustomizationComponent,
  },


  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class StudentRoutingModule {}
