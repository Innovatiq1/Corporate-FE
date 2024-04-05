import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StaffRoutingModule } from './staff-routing.module';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { EditStaffComponent } from './edit-staff/edit-staff.component';
import { AboutStaffComponent } from './about-staff/about-staff.component';
import { SharedModule } from '@shared';
import { ComponentsModule } from '@shared/components/components.module';
import { StaffService } from './staff.service';
@NgModule({
  declarations: [
    AddStaffComponent,
    EditStaffComponent,
    AboutStaffComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StaffRoutingModule,
    ComponentsModule,
    SharedModule,
  ],
  providers: [StaffService],
})
export class StaffModule {}
