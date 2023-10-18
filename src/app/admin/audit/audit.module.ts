import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from "../../shared/components/components.module";
import { SharedModule } from '@shared';
import { AuditRoutingModule } from './audit-routing.module';
import { AuditListComponent } from './audit-list/audit-list.component';
import { EAttendanceComponent } from './e-attendance/e-attendance.component';




@NgModule({
    declarations: [
        AuditListComponent,
        EAttendanceComponent
    ],
    imports: [
        CommonModule, AuditRoutingModule,
        ComponentsModule,SharedModule
    ]
})
export class AuditModule { }
