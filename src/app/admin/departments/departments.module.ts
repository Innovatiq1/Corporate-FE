import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DepartmentsRoutingModule } from './departments-routing.module';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { EditDepartmentComponent } from './edit-department/edit-department.component';
import { SharedModule } from '@shared';
import { ComponentsModule } from '@shared/components/components.module';
import { DepartmentService } from './department.service';

@NgModule({
  declarations: [
    AddDepartmentComponent,
    EditDepartmentComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DepartmentsRoutingModule,
    ComponentsModule,
    SharedModule,
  ],
  providers: [DepartmentService],
})
export class DepartmentsModule {}
