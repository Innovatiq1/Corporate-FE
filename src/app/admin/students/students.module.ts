import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentsRoutingModule } from './students-routing.module';
import { AboutStudentComponent } from './about-student/about-student.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { StudentAttendanceComponent } from './student-attendance/student-attendance.component';
import { DeleteDialogComponent as StdDeleteDialogComponent } from './student-attendance/dialogs/delete/delete.component';
import { FormDialogComponent as StdFormDialogComponent } from './student-attendance/dialogs/form-dialog/form-dialog.component';
import { StudentAttendanceService } from './student-attendance/attendance.service';
import { SharedModule } from '@shared';
import { ComponentsModule } from '@shared/components/components.module';
import { StudentsService } from './students.service';

@NgModule({
  declarations: [
    AboutStudentComponent,
    AddStudentComponent,
    EditStudentComponent,
    StudentAttendanceComponent,
    StdDeleteDialogComponent,
    StdFormDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StudentsRoutingModule,
    ComponentsModule,
    SharedModule,
  ],
  providers: [StudentsService, StudentAttendanceService],
})
export class StudentsModule {}
