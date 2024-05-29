import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared';
import { ComponentsModule } from '@shared/components/components.module';
import { MatStepperModule } from '@angular/material/stepper';
import { ModalModule } from 'ngx-bootstrap/modal';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { AllUsersComponent } from './all-users/all-users.component';
import { AllStudentsComponent } from './all-students/all-students.component';
import { AllTeachersComponent } from './all-teachers/all-teachers.component';
import { CreateAllUsersComponent } from './create-all-users/create-all-users.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { AboutStudentComponent } from './about-student/about-student.component';
import { AboutTeacherComponent } from './about-teacher/about-teacher.component';
import { EditTeacherComponent } from './edit-teacher/edit-teacher.component';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { RoleDailogComponent } from './all-users/role-dailog/role-dailog.component';
import { TeachersService } from '../teachers/teachers.service';




@NgModule({
  declarations: [
    AllUsersComponent,
    AllStudentsComponent,
    AllTeachersComponent,
    CreateAllUsersComponent,
    ViewUsersComponent,
    AddStudentComponent,
    AboutStudentComponent,
    AddTeacherComponent,
    AboutTeacherComponent,
    EditTeacherComponent,
    RoleDailogComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserProfileRoutingModule,
    ComponentsModule,
    SharedModule,
    MatStepperModule,
    ModalModule.forRoot(),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    CKEditorModule,
    AngularEditorModule,
  ],
  providers: [TeachersService]
})
export class UserProfileModule {}
