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
import { StudentsService } from 'app/admin/students/all-students/students.service';
import { FeedbackComponent } from './feedback/feedback.component';
import { FullCalendarModule } from '@fullcalendar/angular';

// import { ProgramTimetableComponent } from './program-timetable/program-timetable.component';

import { ProgramTimetableComponent } from './program-timetable/program-timetable.component';
import { SucessCourseComponent } from './sucess-course/sucess-course.component';
import { FailureCourseComponent } from './failure-course/failure-course.component';


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

    ProgramTimetableComponent,
    SucessCourseComponent,
    FailureCourseComponent,

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

  ],
  providers: [    
HomeworkService, stdLeaveReqService,StudentsService],
})
export class StudentModule {}
