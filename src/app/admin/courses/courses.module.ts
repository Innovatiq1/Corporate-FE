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
import { CourseKitComponent } from './course-kit/course-kit.component';
import { CategoriesComponent } from './categories/categories.component';
import { MatStepperModule } from '@angular/material/stepper';
import { CreateCategoriesComponent } from './categories/create-categories/create-categories.component';

import { VideoPlayerComponent } from './course-kit/video-player/video-player.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CreateCourseKitComponent } from './course-kit/create-course-kit/create-course-kit.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { EditCourseKitComponent } from './course-kit/edit-course-kit/edit-course-kit.component';
import { EditCategoriesComponent } from './categories/edit-categories/edit-categories.component';
import { CreateTemplateComponent } from './course-kit/create-template/create-template.component';
import { CreateClassComponent } from './create-class/create-class.component';
import { ClassListComponent } from './class-list/class-list.component';
import { CompletionListComponent } from './completion-list/completion-list.component';

import { AngularEditorModule } from '@kolkov/angular-editor';
import { ViewCategoriesComponent } from './categories/view-categories/view-categories.component';
import { ViewClassComponent } from './class-list/view-class/view-class.component';




@NgModule({
  declarations: [
    AddCourseComponent,
    EditCourseComponent,
    AboutCourseComponent,
    AllCourseComponent,
    CourseKitComponent,
    CategoriesComponent,
    CreateCategoriesComponent,

    VideoPlayerComponent,
    CreateCourseKitComponent,
    EditCourseKitComponent,
    EditCategoriesComponent,
    CreateTemplateComponent,
    ClassListComponent,
    CreateClassComponent,
    CompletionListComponent,
    ViewCategoriesComponent,
    ViewClassComponent,


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
