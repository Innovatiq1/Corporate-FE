import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoursesRoutingModule } from './courses-routing.module';
import { AddCourseComponent } from './add-course/add-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { AboutCourseComponent } from './about-course/about-course.component';
import { AllCourseComponent } from './all-course/all-course.component';
import { SharedModule } from '@shared';
import { ComponentsModule } from '@shared/components/components.module';
import { MatStepperModule } from '@angular/material/stepper';

import { ModalModule } from 'ngx-bootstrap/modal';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CreateClassComponent } from './create-class/create-class.component';
// import { ClassListComponent } from './class-list/class-list.component';
import { CompletionListComponent } from './completion-list/completion-list.component';

import { AngularEditorModule } from '@kolkov/angular-editor';
import { ViewClassComponent } from './class-list/view-class/view-class.component';
import { ViewCompletionComponent } from './completion-list/view-completion/view-completion.component';
import { CourseViewComponent } from './all-course/course-view/course-view.component';
import { ActiveCoursesComponent } from './active-courses/active-courses.component';
import { InActiveCoursesComponent } from './in-active-courses/in-active-courses.component';




@NgModule({
  declarations: [
    AddCourseComponent,
    EditCourseComponent,
    AboutCourseComponent,
    AllCourseComponent,
    CreateClassComponent,
    CompletionListComponent,
    ViewClassComponent,
    ViewCompletionComponent,
    CourseViewComponent,
    ActiveCoursesComponent,
    InActiveCoursesComponent,


  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoursesRoutingModule,
    ComponentsModule,
    SharedModule,
    MatStepperModule,
    ModalModule.forRoot(),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    CKEditorModule,
    AngularEditorModule
  ],
})
export class CoursesModule {}
