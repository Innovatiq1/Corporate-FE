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
    path: 'feedback/courses',
    component: FeedbackComponent,
  },
  {
    path: 'feedback/programs',
    component: FeedbackComponent,
  },


  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class StudentRoutingModule {}
